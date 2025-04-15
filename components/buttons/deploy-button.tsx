import React from "react";
import { Rocket } from "lucide-react";
const DeployButton = () => {
  return (
    <button className="dark:bg-zinc-200 hover:dark:bg-zinc-50 bg-neutral-700 hover:bg-neutral-800 text-sm font-semibold text-neutral-100 dark:text-neutral-700 px-4 py-1 rounded-md transition-all duration-300 cursor-pointer flex items-center gap-2">
      <Rocket className="w-4 h-4" />
      Deploy
    </button>
  );
};

export default DeployButton;
