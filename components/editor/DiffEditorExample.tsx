"use client";
import { useState, useEffect } from "react";
import DiffEditor from "./DiffEditor";
import { Button } from "@/components/ui/button";
import { enhanceWithLLM } from "@/utils/enhanceLLM";

// Sample code snippets for different languages
const sampleCode = {
  javascript: `var greeting = 'Hello World'
function sayHello() {
  console.log(greeting)
}

var numbers = [1, 2, 3]
numbers.forEach(function(num) {
  console.log(num)
})`,
  html: `<div class="header">
  <h1>Welcome</h1>
  <img src="logo.png">
</div>
<div class="content">
  <p>This is some content</p>
</div>
<div class="footer">
  <p>Copyright 2023</p>
</div>`,
  css: `body {
  background-color: #f0f0f0;
  border-radius: 5px;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}`,
};

export default function DiffEditorExample() {
  const [language, setLanguage] = useState<"javascript" | "html" | "css">(
    "javascript"
  );
  const [original, setOriginal] = useState(sampleCode.javascript);
  const [improved, setImproved] = useState("");

  // Handle enhancing code with LLM
  const handleEnhanceClick = () => {
    const enhancedText = enhanceWithLLM(original, language);
    setImproved(enhancedText);
  };

  // Change language sample
  const changeLanguage = (newLanguage: "javascript" | "html" | "css") => {
    setLanguage(newLanguage);
    setOriginal(sampleCode[newLanguage]);
  };

  // Initialize the improved text whenever original changes
  useEffect(() => {
    setImproved(enhanceWithLLM(original, language));
  }, [original, language]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-lg font-semibold">LLM Code Enhancement</h1>
        <div className="flex gap-2">
          <div className="flex gap-2 mr-4">
            <Button
              variant={language === "javascript" ? "default" : "outline"}
              onClick={() => changeLanguage("javascript")}
            >
              JavaScript
            </Button>
            <Button
              variant={language === "html" ? "default" : "outline"}
              onClick={() => changeLanguage("html")}
            >
              HTML
            </Button>
            <Button
              variant={language === "css" ? "default" : "outline"}
              onClick={() => changeLanguage("css")}
            >
              CSS
            </Button>
          </div>
          <Button onClick={handleEnhanceClick}>Re-Enhance</Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <DiffEditor
          original={original}
          improved={improved}
          language={language}
        />
      </div>
    </div>
  );
}
