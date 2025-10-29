// pages/Unauthorized.jsx
import React from "react";
import { Lock } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-emerald-50">
      <Lock className="w-16 h-16 text-emerald-600 mb-4" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
      <p className="text-gray-600">You’re not authorized to view this page.</p>
    </div>
  );
}
