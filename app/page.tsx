"use client";
import Html from "@/components/editor/html";
import Css from "@/components/editor/css";
import Javascript from "@/components/editor/javascript";
import Navbar from "@/components/navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Preview from "@/components/editor/preview";
import { useQueryState } from "nuqs";
import { Tab } from "@/constants/types/tabs";
import { HtmlSelect } from "@/components/buttons/editor-select";
export default function Home() {
  const [tab, setTab] = useQueryState<Tab>("tab", {
    defaultValue: "preview",
    parse: (value) => value as Tab,
    serialize: (value) => value as string,
  });
  return (
    <main className="h-[calc(100vh-3rem)]">
      <Navbar />
      <div className="h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25}>
            <div>Hello</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75} className="px-6 pt-2">
            <main className="flex gap-3 mb-4">
              <HtmlSelect
                isActive={tab === "html"}
                onClick={() => setTab("html")}
              />
            </main>
            <section className="h-full">
              {tab === "html" && <Html />}
              {tab === "css" && <Css />}
              {tab === "javascript" && <Javascript />}
              {tab === "preview" && <Preview />}
            </section>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
