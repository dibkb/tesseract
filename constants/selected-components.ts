import { ContextSelected } from "@/stores/scripts";

export const selectedComponentsDisplay: Record<ContextSelected, string> = {
  html: "index.html",
  css: "style.css",
  js: "script.js",
  selectedHtml: "index.html (selected)",
  selectedCss: "style.css (selected)",
  selectedJs: "script.js (selected)",
};
