import React from "react";

export function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 ${className}`}
    >
      {children}
    </span>
  );
}
