"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

type PrototypePrefs = {
  soundOn: boolean;
  animationsOn: boolean;
  setSoundOn: (value: boolean) => void;
  setAnimationsOn: (value: boolean) => void;
};

const PrototypePrefsContext = createContext<PrototypePrefs | null>(null);

export function PrototypePrefsProvider({
  soundOn,
  animationsOn,
  setSoundOn,
  setAnimationsOn,
  children,
}: PrototypePrefs & { children: ReactNode }) {
  const value = useMemo(
    () => ({ soundOn, animationsOn, setSoundOn, setAnimationsOn }),
    [soundOn, animationsOn, setSoundOn, setAnimationsOn],
  );
  return (
    <PrototypePrefsContext.Provider value={value}>
      {children}
    </PrototypePrefsContext.Provider>
  );
}

export function usePrototypePrefs(): PrototypePrefs {
  const ctx = useContext(PrototypePrefsContext);
  if (!ctx) {
    return {
      soundOn: true,
      animationsOn: true,
      setSoundOn: () => {},
      setAnimationsOn: () => {},
    };
  }
  return ctx;
}
