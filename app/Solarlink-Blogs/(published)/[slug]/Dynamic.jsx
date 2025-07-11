// app/blog/whatever/Dynamic.js
"use client";

import dynamic from "next/dynamic";

export const LikeButton = dynamic(() => import("./LikeButton"), { ssr: false });
export const ViewCounter = dynamic(() => import("./ViewCounter"), {
  ssr: false,
});
