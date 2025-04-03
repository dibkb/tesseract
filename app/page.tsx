"use client";
import Javascript from "@/components/editor/javascript";
import Navbar from "@/components/navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

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
            <Javascript />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
