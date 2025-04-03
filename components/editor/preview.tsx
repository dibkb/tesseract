import React from "react";
import { useScriptsStore } from "@/stores/scripts-provider";
import { ScriptsState } from "@/stores/scripts";

const Preview = () => {
  const { html, css, js } = useScriptsStore((state) => state);

  const createDocument = ({ html, css, js }: ScriptsState) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${css}</style>
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
  return (
    <iframe
      className="w-full h-full border-none rounded-md"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
      title="Website Preview"
      referrerPolicy="no-referrer"
      srcDoc={createDocument({ html, css, js })}
    />
  );
};

export default Preview;
