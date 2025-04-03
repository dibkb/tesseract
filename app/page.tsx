"use client";
import Navbar from "@/components/navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Editor } from "@monaco-editor/react";

export default function Home() {
  return (
    <main className="h-[calc(100vh-3rem)]">
      <Navbar />
      <div className="h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25}>
            <div>Hello</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <Editor
              height="100%"
              defaultLanguage="javascript"
              defaultValue="// some comment"
            />
            ;
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
