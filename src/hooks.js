import { useCallback, useEffect, useState } from "react";
import { kits } from "./data";

const KIT_KEY = "sid-kit";
const KIT_IDS = kits.map((k) => k.id);

function readKit() {
  try {
    const saved = localStorage.getItem(KIT_KEY);
    if (KIT_IDS.includes(saved)) return saved;
  } catch { /* storage blocked */ }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "away" : "home";
}

/** Home / Away / Third kit. Returns [kitId, setKit, cycle(dir)]. */
export function useKit() {
  const [kit, setKit] = useState(readKit);
  useEffect(() => {
    document.documentElement.dataset.kit = kit;
    try { localStorage.setItem(KIT_KEY, kit); } catch { /* ignore */ }
  }, [kit]);
  const cycle = useCallback((dir = 1) => {
    setKit((k) => KIT_IDS[(KIT_IDS.indexOf(k) + dir + KIT_IDS.length) % KIT_IDS.length]);
  }, []);
  return [kit, setKit, cycle];
}

/** Tiny hash router: "#/finals" → "finals", "" or "#/" → null (main menu). */
export function useScreen(validIds) {
  const parse = useCallback(() => {
    const id = window.location.hash.replace(/^#\/?/, "");
    return validIds.includes(id) ? id : null;
  }, [validIds]);
  const [screen, setScreen] = useState(parse);
  useEffect(() => {
    const onHash = () => setScreen(parse());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [parse]);
  const go = useCallback((id) => {
    window.location.hash = id ? `/${id}` : "/";
  }, []);
  return [screen, go];
}
