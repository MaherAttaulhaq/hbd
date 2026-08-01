"use client";

import { useEffect } from "react";
import { celebrate } from "@/lib/celebrate";

export default function Confetti() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      celebrate();
    }, 1400);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
