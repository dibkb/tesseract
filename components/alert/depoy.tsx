import React from "react";
import { X, Check, AlertCircle, Link } from "lucide-react";

export function AlertDialogDeploy({
  onClose,
  deploySuccess,
  deployError,
}: {
  onClose: () => void;
  deploySuccess: string | null;
  deployError: string | null;
}) {
  const isSuccess = deploySuccess !== null;
  const isError = deployError !== null;

  if (!isSuccess && !isError) return null;

  return (
    <>
      {
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>

            {isSuccess && (
              <>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <h2 className="text-lg font-semibold">
                    Deployment Successful
                  </h2>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Congratulations! Your website has been successfully deployed.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Link className="w-3 h-3 text-blue-600" />
                  <a
                    href={deploySuccess}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-bold text-blue-600 hover:underline"
                  >
                    {deploySuccess}
                  </a>
                </div>
              </>
            )}

            {isError && (
              <>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <h2 className="text-lg font-semibold">Deployment Failed</h2>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  There was a problem deploying your website.
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-red-500">
                    {deployError || "Some error occurred"}
                  </p>
                </div>
              </>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <button
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-neutral-800 text-white hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200 focus:outline-none"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
}
