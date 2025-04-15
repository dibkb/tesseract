import React, { useState } from "react";
import { Rocket } from "lucide-react";
import { useScriptsStore } from "@/stores/scripts-provider";
const DeployButton = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployError, setDeployError] = useState<string | null>(null);
  const [deploySuccess, setDeploySuccess] = useState<string | null>(null);
  const { html, css, js } = useScriptsStore((state) => state);

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeployError(null);

    try {
      const response = await fetch("/api/deploy", {
        method: "POST",
        body: JSON.stringify({ html, css, js }),
      });

      if (!response.ok) {
        throw new Error("Failed to deploy");
      }

      const data = await response.json();
      setDeploySuccess(data.url);
    } catch (error) {
      setDeployError(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <button
      onClick={handleDeploy}
      className="dark:bg-zinc-200 hover:dark:bg-zinc-50 bg-neutral-700 hover:bg-neutral-800 text-sm font-semibold text-neutral-100 dark:text-neutral-700 px-4 py-1 rounded-md transition-all duration-300 cursor-pointer flex items-center gap-2"
    >
      <Rocket className="w-4 h-4" />
      Deploy
    </button>
  );
};

export default DeployButton;
