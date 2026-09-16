"use client";

import { useEffect } from "react";

export default function ScrollSync() {
  useEffect(() => {
    const sync = () => {
      const on =
        (window.scrollY || document.documentElement.scrollTop || 0) > 80;
      document.documentElement.classList.toggle("page-scrolled", on);
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
