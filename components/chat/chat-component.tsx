import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const ChatComponent = () => {
  return (
    <div className=" h-full relative p-2">
      <main className="h-full">
        <div className="absolute bottom-0 left-0 w-full h-44 p-2">
          <form className="w-full h-full flex flex-col gap-2 items-center justify-center rounded-lg">
            <Textarea
              className="w-full h-full outline-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
              placeholder="Plan search and build anything..."
            ></Textarea>
            <Button
              type="submit"
              className="w-full m-1 rounded-md dark:bg-white/80 hover:dark:bg-white transition-all duration-300 dark:text-black cursor-pointer bg-neutral-800 hover:bg-neutral-900 border"
            >
              Send
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChatComponent;
