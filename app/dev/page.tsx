"use client";
import Html from "@/components/editor/html";
import Css from "@/components/editor/css";
import Javascript from "@/components/editor/javascript";
// import Navbar from "@/components/navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Preview from "@/components/editor/preview";
import { useQueryState } from "nuqs";
import { Tab } from "@/constants/types/tabs";
import {
  CssSelect,
  HtmlSelect,
  Imageupload,
  JavascriptSelect,
  LogsSelect,
  PreviewSelect,
} from "@/components/buttons/editor-select";
import FontChange from "@/components/editor/font-change";
import ChatComponent from "@/components/chat/chat-component";
import ImagesTab from "@/components/editor/images-tab";
import { Suspense } from "react";
import DeployButton from "@/components/buttons/deploy-button";

function HomeContent() {
  const [tab, setTab] = useQueryState<Tab>("tab", {
    defaultValue: "preview",
    parse: (value) => value as Tab,
    serialize: (value) => value as string,
  });

  return (
    <main className="h-[calc(100vh-3rem)]">
      <div className="h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={30}>
            <ChatComponent />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70} className="px-6 pt-2">
            <section className="flex items-center justify-between mb-3 flex-wrap gap-y-2">
              <main className="flex gap-3 flex-wrap">
                <HtmlSelect
                  isActive={tab === "html"}
                  onClick={() => setTab("html")}
                />
                <CssSelect
                  isActive={tab === "css"}
                  onClick={() => setTab("css")}
                />
                <JavascriptSelect
                  isActive={tab === "javascript"}
                  onClick={() => setTab("javascript")}
                />
                <LogsSelect
                  isActive={tab === "console"}
                  onClick={() => setTab("console")}
                />
                <PreviewSelect
                  isActive={tab === "preview"}
                  onClick={() => setTab("preview")}
                />
                <Imageupload
                  isActive={tab === "images"}
                  onClick={() => setTab("images")}
                />
              </main>
              <main className="flex gap-2">
                <FontChange />
                <DeployButton />
              </main>
            </section>
            <section className="h-full overflow-scroll">
              {tab === "html" && <Html />}
              {tab === "css" && <Css />}
              {tab === "javascript" && <Javascript />}
              {tab === "preview" && <Preview />}
              {tab === "console" && <Preview console={true} />}
              {tab === "images" && <ImagesTab />}
            </section>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
