"use client";

import { useEffect } from "react";

export default function ScrollSync() {
  useEffect(() => {
    let lastY = window.scrollY || document.documentElement.scrollTop || 0;
    const topShow = 24;
    const delta = 6;

    const sync = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      if (y <= topShow) {
        document.documentElement.classList.remove("page-scrolled");
      } else if (y > lastY + delta) {
        document.documentElement.classList.add("page-scrolled");
      } else if (y < lastY - delta) {
        document.documentElement.classList.remove("page-scrolled");
      }
      lastY = y;
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    document.addEventListener("scroll", sync, { passive: true, capture: true });
    const id = window.setInterval(sync, 80);
    return () => {
      window.removeEventListener("scroll", sync);
      document.removeEventListener("scroll", sync, true);
      window.clearInterval(id);
      document.documentElement.classList.remove("page-scrolled");
    };
  }, []);

  return null;
}
