#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

function usage() {
  console.error("Usage: node scripts/verify-html.js <file-or-url> [more files-or-urls]");
  console.error("Set PLAYWRIGHT_BROWSERS_PATH/installed Playwright as needed. The script requires the playwright package.");
}

function loadPlaywright() {
  try {
    return require("playwright");
  } catch (error) {
    const bundled = process.env.CODEX_PLAYWRIGHT_MODULE || "/Users/iamxoghks/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright";
    try {
      return require(bundled);
    } catch {
      console.error("Could not load playwright. Install it with `npm install -D playwright` or set CODEX_PLAYWRIGHT_MODULE.");
      throw error;
    }
  }
}

function targetToUrl(target) {
  if (/^https?:\/\//.test(target) || target.startsWith("file://")) return target;
  return pathToFileURL(path.resolve(target)).href;
}

async function inspect(page) {
  return page.evaluate(() => {
    const viewport = window.innerWidth;
    const documentOverflow = document.documentElement.scrollWidth - viewport;
    const svgs = [...document.querySelectorAll("svg")].map((svg, index) => {
      const rect = svg.getBoundingClientRect();
      const paths = [...svg.querySelectorAll("path,line,rect,circle,polyline,polygon")].map(node => node.getBoundingClientRect());
      const text = [...svg.querySelectorAll("text")].map(node => {
        const box = node.getBoundingClientRect();
        return {
          value: node.textContent.trim(),
          left: box.left,
          top: box.top,
          right: box.right,
          bottom: box.bottom,
          width: box.width,
          height: box.height,
          outside:
            box.left < rect.left - 2 ||
            box.right > rect.right + 2 ||
            box.top < rect.top - 2 ||
            box.bottom > rect.bottom + 2
        };
      });
      const visibleMarks = paths.filter(box => box.width > 0 || box.height > 0).length;
      return {
        index,
        ariaLabel: svg.getAttribute("aria-label") || "",
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        visibleMarks,
        blank: visibleMarks === 0,
        outsideText: text.filter(t => t.outside && t.value).slice(0, 8)
      };
    });
    return {
      viewport,
      scrollWidth: document.documentElement.scrollWidth,
      documentOverflow,
      svgCount: svgs.length,
      blankSvgs: svgs.filter(svg => svg.blank),
      svgsWithOutsideText: svgs.filter(svg => svg.outsideText.length)
    };
  });
}

async function main() {
  const targets = process.argv.slice(2);
  if (!targets.length) {
    usage();
    process.exit(2);
  }

  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: "desktop", width: 1280, height: 1000, isMobile: false, deviceScaleFactor: 1 },
    { name: "mobile", width: 390, height: 900, isMobile: true, deviceScaleFactor: 2 }
  ];
  const failures = [];

  for (const target of targets) {
    const url = targetToUrl(target);
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.isMobile, deviceScaleFactor: viewport.deviceScaleFactor });
      const consoleErrors = [];
      page.on("console", msg => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("pageerror", error => consoleErrors.push(error.message));
      await page.goto(url, { waitUntil: "networkidle" });
      const result = await inspect(page);
      const targetLabel = `${target} @ ${viewport.name}`;
      if (consoleErrors.length) failures.push({ target: targetLabel, issue: "console errors", details: consoleErrors.slice(0, 5) });
      if (result.documentOverflow > 1) failures.push({ target: targetLabel, issue: "document horizontal overflow", details: result.documentOverflow });
      if (result.svgCount === 0) failures.push({ target: targetLabel, issue: "no SVG charts found", details: null });
      for (const svg of result.blankSvgs) failures.push({ target: targetLabel, issue: "blank SVG", details: svg.ariaLabel || `svg ${svg.index}` });
      for (const svg of result.svgsWithOutsideText) failures.push({ target: targetLabel, issue: "SVG text outside bounds", details: { chart: svg.ariaLabel || `svg ${svg.index}`, labels: svg.outsideText.map(t => t.value) } });
      console.log(JSON.stringify({ target: targetLabel, ...result }));
      await page.close();
    }
  }

  await browser.close();
  if (failures.length) {
    console.error("\nVerification failed:");
    for (const failure of failures) console.error(JSON.stringify(failure));
    process.exit(1);
  }
  console.log("\nVerification passed.");
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
