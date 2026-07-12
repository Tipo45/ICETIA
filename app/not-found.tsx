"use client";


import MyLottieComponent from "@/components/Lottieanimation";
import Link from "next/link";

export default function NotFound() {
  return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-xl">

          {/* Icon */}
          <div className="w-full h-full mx-auto flex items-center justify-cente mb-6">
            <MyLottieComponent />
          </div>

          <h2 className="text-2xl font-semibold text-blue-600 mb-3">
            Page Not Found
          </h2>

          <p className="text-black mb-8">
            The page you're looking for doesn’t exist or may have been moved.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-400 text-white px-6 py-3 rounded-lg transition"
            >
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="border border-blue-600 bg-gray-200 hover:bg-blue-600 text-black hover:text-white px-6 py-3 rounded-lg transition"
            >
              Go Back
            </button>
          </div>

        </div>
      </div>
  );
}