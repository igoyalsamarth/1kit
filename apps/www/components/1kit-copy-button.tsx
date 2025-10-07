'use client';

import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

export default function OneKitCopyButton() {

  const command = 'npx create-1kit-app@latest';
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(command);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-gray-100 text-gray-800 rounded-l-lg px-4 py-3 font-mono text-sm border border-black">
        {command}
      </div>
      <button
        onClick={copyToClipboard}
        className="bg-black border border-black text-white px-4 py-3 rounded-r-lg text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        {hasCopied ? (
          <CopyCheckIcon className="h-5 w-5" />
        ) : (
          <CopyIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  )
}
