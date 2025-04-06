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

export const createDocument = ({
  html,
  css,
  js,
}: Pick<ScriptsState, "html" | "css" | "js">) => `
<!DOCTYPE html>
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
</html>
`;
