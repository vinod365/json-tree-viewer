"use client";
import React from "react";
import SearchBar from "./searchBar";

interface Props {
  jsonText: string;
  setJsonText: (text: string) => void;
  handleVisualize: () => void;
  handleFormat: () => void;
  error: string;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  handleSearch: () => void;
  message: string;
}

export default function JsonInputPanel({
  jsonText,
  setJsonText,
  handleVisualize,
  handleFormat,
  error,
  searchTerm,
  setSearchTerm,
  handleSearch,
  message,
}: Props) {
  return (
    <section className="card col-span-2 sm:col-span-1 bg-white dark:bg-gray-800 border dark:border-gray-700">
      <label className="block text-white font-semibold mb-2">Paste JSON</label>
      <textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        rows={18}
        className="w-full p-3 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        placeholder="Paste JSON here"
      ></textarea>
      <div className="flex gap-2 mt-3">
        <button className="flex-1 btn btn-primary" onClick={handleVisualize}>
          Visualize
        </button>
        <button className="btn btn-secondary" onClick={handleFormat}>
          Format
        </button>
      </div>
      {error && <div className="mt-2 text-red-500 text-sm">Error: {error}</div>}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        message={message}
      />
    </section>
  );
}
