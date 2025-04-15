/* eslint-disable @next/next/no-img-element */
import React, { JSX, useState } from "react";
import { Rocket } from "lucide-react";
import { useScriptsStore } from "@/stores/scripts-provider";
import { cn } from "@/lib/utils";
import { AlertDialogDeploy } from "../alert/depoy";
const DeployButton = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployError, setDeployError] = useState<string | null>(null);
  const [deploySuccess, setDeploySuccess] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { html, css, js } = useScriptsStore((state) => state);

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeployError(null);
    setDeploySuccess(null);

    try {
      const response = await fetch("/api/deploy", {
        method: "POST",
        body: JSON.stringify({ html, css, js }),
      });

      if (!response.ok) {
        throw new Error("Failed to deploy");
      }

      const data = await response.json();
      if (data.deployUrl && data.success) {
        setDeploySuccess(data.deployUrl);
        setIsOpen(true);
      } else {
        throw new Error("Failed to deploy");
      }
    } catch (error) {
      setDeployError(
        error instanceof Error ? error.message : "An error occurred"
      );
      setIsOpen(true);
    } finally {
      setIsDeploying(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  let text: JSX.Element = (
    <>
      {" "}
      <Rocket className="w-4 h-4" /> Deploy{" "}
    </>
  );
  if (isDeploying) {
    text = (
      <>
        <img
          src={
            "https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
          }
          alt=""
          className="w-4 h-4"
        />
        <span>Deploying</span>
      </>
    );
  }
  return (
    <>
      {isOpen && (
        <AlertDialogDeploy
          onClose={closeModal}
          deploySuccess={deploySuccess}
          deployError={deployError}
        />
      )}
      <button
        disabled={isDeploying}
        onClick={handleDeploy}
        className={cn(
          "dark:bg-zinc-200 hover:dark:bg-zinc-50 bg-neutral-700 hover:bg-neutral-800 text-sm font-semibold text-neutral-100 dark:text-neutral-700 px-4 py-1 rounded-md transition-all duration-300 cursor-pointer flex items-center gap-2",
          isDeploying && "opacity-50 cursor-not-allowed"
        )}
      >
        {text}
      </button>
    </>
  );
};

export default DeployButton;
