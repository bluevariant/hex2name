#!/usr/bin/env node
const { GetColorName } = require("hex-color-to-color-name");
const MUIColors = require("@mui/material/colors");
const TailwindColors = require("tailwindcss/colors");
const colorParser = require("parse-color");

console.warn = () => {};

function fixColor(color) {
  const result = colorParser(color).hex;

  if (typeof result === "undefined") {
    return colorParser("#" + color).hex;
  }

  return result;
}

const color = fixColor(process.argv[2] || "#000000");
const name = GetColorName(color).split("/").join(" ");
const parts = name.split(" ");
const key = parts
  .map((v, i) => {
    if (i === 0) {
      return v.toLowerCase();
    }
    return v;
  })
  .join("");

console.log("\x1b[32m%s\x1b[0m", "--- Tailwind ---");
let isOk = false;
for (const key of Object.keys(TailwindColors)) {
  const o0 = TailwindColors[key];
  if (typeof o0 === "object") {
    for (const key1 of Object.keys(o0)) {
      if (fixColor(o0[key1]) === color) {
        console.log('import colors from "tailwindcss/colors"');
        console.log(`colors.${key}["${key1}"]`);
        isOk = true;
        break;
      }
    }
  } else if (typeof o0 === "string") {
    if (fixColor(o0) === color) {
      console.log('import colors from "tailwindcss/colors"');
      console.log(`colors.${key}`);
      isOk = true;
    }
  }
  if (isOk) break;
}

if (!isOk) {
  console.log(`"${key}": "${color}"`);
  console.log("\x1b[2m%s\x1b[0m", "---");
  console.log(`${key}`);
}

// MUI colors
console.log("\x1b[32m%s\x1b[0m", "--- React Material UI ---");
let isOk1 = false;
for (const key of Object.keys(MUIColors)) {
  const o0 = MUIColors[key];
  for (const key1 of Object.keys(o0)) {
    if (fixColor(o0[key1]) === color) {
      console.log(`import { ${key} } from "@mui/material/colors";`);
      console.log(`${key}["${key1}"]`);
      isOk1 = true;
      break;
    }
  }
  if (isOk1) break;
}
if (!isOk1) {
  console.log(
    `
declare module "@mui/material/styles" {
  interface Palette {
    ${key}: Palette["primary"];
  }
  interface PaletteOptions {
    ${key}: PaletteOptions["primary"];
  }
}
`.trim()
  );
  console.log("\x1b[2m%s\x1b[0m", "---");
  console.log(
    `"${key}": ${JSON.stringify(
      {
        main: color,
      },
      null,
      2
    )}`
  );
  console.log("\x1b[2m%s\x1b[0m", "---");
  console.log(`${key}.main`);
}
