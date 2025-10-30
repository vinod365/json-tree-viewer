"use client";
import React from "react";

interface Props {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  handleSearch: () => void;
  message: string;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  handleSearch,
  message,
}: Props) {
  return (
    <div className="mt-5">
      <div className="flex gap-2">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 min-w-0 rounded border dark:bg-gray-700 dark:text-white"
          placeholder="e.g. user.address"
        />
        <button className="btn btn-secondary" onClick={handleSearch}>
          Search
        </button>
      </div>
      {message && (
        <div className="mt-2 text-sm italic text-indigo-600 dark:text-indigo-400">
          {message}
        </div>
      )}
    </div>
  );
}
