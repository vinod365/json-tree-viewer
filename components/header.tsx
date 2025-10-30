"use client";

import React from "react";

interface HeaderProps {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  jsonText: string;
  setMessage: (msg: string) => void;
  handleClear: () => void;
  downloadImage: () => void;
}

export default function Header({
  dark,
  setDark,
  jsonText,
  setMessage,
  handleClear,
  downloadImage,
}: HeaderProps) {
  return (
    <header className="flex items-start flex-col sm:flex-row justify-between mb-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          JSON Tree Visualizer
        </h1>
        <p className="header-sub">
          Advance JSON visualization
        </p>
      </div>
      <div className="flex gap-2 items-center mt-4 sm:mt-0">
        <button className="btn" onClick={() => setDark((d) => !d)}>
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
        <button
          className="btn"
          onClick={() => {
            navigator.clipboard.writeText(jsonText);
            setMessage("JSON copied");
          }}
        >
          📋 Copy JSON
        </button>
        <button className="btn" onClick={handleClear}>
          🧹 Clear
        </button>
        <button className="btn" onClick={downloadImage}>
          🖼️ Download
        </button>
      </div>
    </header>
  );
}
