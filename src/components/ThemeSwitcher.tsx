"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="theme-switcher">
        <button className="placeholder" disabled>
          Light
        </button>
        <button className="placeholder" disabled>
          Dark
        </button>
        <button className="placeholder" disabled>
          System
        </button>
      </div>
    );
  }

  return (
    <div className="theme-switcher">
      <button
        className={theme === "light" ? "active" : ""}
        onClick={() => setTheme("light")}
      >
        Light
      </button>
      <button
        className={theme === "dark" ? "active" : ""}
        onClick={() => setTheme("dark")}
      >
        Dark
      </button>
      <button
        className={theme === "system" ? "active" : ""}
        onClick={() => setTheme("system")}
      >
        System
      </button>
    </div>
  );
}
