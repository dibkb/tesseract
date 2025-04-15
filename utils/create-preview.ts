import { ScriptsState } from "@/stores/scripts";
import { resetCss } from "./reset-css";

const consoleCaptureScript = `
<script>
  // Override console methods
  const consoleMethods = ['log', 'error', 'warn', 'info', 'debug'];
  consoleMethods.forEach((method) => {
    const original = console[method];
    console[method] = (...args) => {
      // Send messages to parent
      window.parent.postMessage({
        type: 'CONSOLE',
        level: method,
        data: args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : arg
        )
      }, '*');
      original.apply(console, args);
    };
  });
</script>
`;

export const isFullHtmlDocument = (html: string): boolean => {
  // Remove comments and normalize whitespace
  const normalizedHtml = html
    .replace(/<!--[\s\S]*?-->/g, "") // Remove HTML comments
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove CSS comments
    .replace(/\/\/.*$/gm, "") // Remove JS comments
    .trim();

  return (
    normalizedHtml.toLowerCase().startsWith("<!doctype html") ||
    normalizedHtml.toLowerCase().startsWith("<html")
  );
};

export const createDocument = ({
  html,
  css,
  js,
}: Pick<ScriptsState, "html" | "css" | "js">): string => {
  // Check if the HTML is a full document
  if (isFullHtmlDocument(html)) {
    // If it's a full HTML document, inject our console capture script and CSS
    const headEndIndex = html.indexOf("</head>");
    if (headEndIndex !== -1) {
      // Insert our styles and console capture script before the closing head tag
      const beforeHeadEnd = html.slice(0, headEndIndex);
      const afterHeadEnd = html.slice(headEndIndex);
      return `${beforeHeadEnd}
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200..800&display=swap');
          * {
            font-family: 'Inter', sans-serif;
          }
          ${resetCss}
          ${css}
        </style>
        ${consoleCaptureScript}
        ${afterHeadEnd}
        <script>
          try {
            ${js}
          } catch (error) {
            console.error(error);
          }
        </script>`;
    }
  }

  // If not a full HTML document, use the original template
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200..800&display=swap');
    * {
      font-family: 'Inter', sans-serif;
    }
    ${resetCss}
    ${css}
    </style>
    ${consoleCaptureScript}
  </head>
  <body>
    ${html}
    <script>
      try {
        ${js}
      } catch (error) {
        console.error(error);
      }
    </script>
  </body>
</html>`;
};
export const createFullHtml = ({
  html,
}: Pick<ScriptsState, "html">): string => {
  // Check if the HTML is a full document
  if (isFullHtmlDocument(html)) {
    // If it's a full HTML document, inject our console capture script and CSS
    const headEndIndex = html.indexOf("</head>");
    if (headEndIndex !== -1) {
      // Insert our styles and console capture script before the closing head tag
      const beforeHeadEnd = html.slice(0, headEndIndex);
      const afterHeadEnd = html.slice(headEndIndex);
      const newHtml = `${beforeHeadEnd}
        <link rel="stylesheet" href="reset.css" />
        <link rel="stylesheet" href="style.css" />
        <script src="script.js" defer></script>
        ${afterHeadEnd}`;
      const bodyEndIndex = newHtml.indexOf("</body>");
      if (bodyEndIndex !== -1) {
        const beforeBodyEnd = newHtml.slice(0, bodyEndIndex);
        const afterBodyEnd = newHtml.slice(bodyEndIndex);
        return `${beforeBodyEnd}
      <section class="tesseract--footer">
        <a class="tesseract--footer__link" target="_blank" href="https://tesseract.borborah.xyz/">Powered by Tesseract</a>
        </section>
        ${afterBodyEnd}`;
      }
      return newHtml;
    }
  }
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <link rel="stylesheet" href="reset.css" />
      <link rel="stylesheet" href="style.css" />
      <script src="script.js" defer></script>
    </head>
    <body>
      ${html}
      </script>
    </body>
  </html>`;
};

export const addFooterCSS = (css: string) => {
  return (
    css +
    `\n` +
    `.tesseract--footer {
  position: absolute;
  bottom: 1vh;
  right: 1vw;
  font-size: 0.75rem;
  background-color: rgba(50, 50, 50, 0.8);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  padding: 4px 8px;
}
.tesseract--footer__link{
  color: #ffffff;
  text-decoration: none;
}
.tesseract--footer__link:hover{
  text-decoration: underline;
}`
  );
};
