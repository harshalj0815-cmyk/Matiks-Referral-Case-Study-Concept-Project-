"use client";

import { useEffect } from "react";

function lockMediaNode(node: Element) {
  if (!(node instanceof HTMLImageElement || node instanceof HTMLCanvasElement)) {
    return;
  }
  node.setAttribute("draggable", "false");
  node.draggable = false;
}

function lockAllMedia(root: ParentNode = document) {
  root.querySelectorAll("img, canvas").forEach((node) => lockMediaNode(node));
}

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

    // Block image drag / select even when assets mount later (prototype, carousels).
    lockAllMedia();
    const blockDrag = (e: DragEvent) => {
      const t = e.target;
      if (
        t instanceof HTMLImageElement ||
        t instanceof HTMLCanvasElement ||
        (t instanceof Element && t.closest("img, picture, svg, canvas, video"))
      ) {
        e.preventDefault();
      }
    };
    const blockSelect = (e: Event) => {
      const t = e.target;
      if (
        t instanceof HTMLImageElement ||
        (t instanceof Element && t.closest("img, picture, svg, canvas, video"))
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("dragstart", blockDrag, true);
    document.addEventListener("selectstart", blockSelect, true);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          lockMediaNode(node);
          lockAllMedia(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", sync);
      document.removeEventListener("scroll", sync, true);
      window.clearInterval(id);
      document.removeEventListener("dragstart", blockDrag, true);
      document.removeEventListener("selectstart", blockSelect, true);
      mo.disconnect();
      document.documentElement.classList.remove("page-scrolled");
    };
  }, []);

  return null;
}
