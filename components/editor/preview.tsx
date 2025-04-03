import React from "react";

const Preview = () => {
  return (
    <iframe
      src="https://www.lipsum.com/"
      className="w-full h-full border-none"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
      title="Website Preview"
      referrerPolicy="no-referrer"
    />
  );
};

export default Preview;
