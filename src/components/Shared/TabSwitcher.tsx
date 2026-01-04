"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/styles/Shared/TabSwitcher.scss";

interface TabSwitcherProps<T extends string> {
  optionOne: T;
  optionTwo: T;
  activeTab?: T;
  onTabChange?: (tab: T) => void;
}

export default function TabSwitcher<T extends string>({
  optionOne,
  optionTwo,
  activeTab,
  onTabChange,
}: TabSwitcherProps<T>) {
  const pathname = usePathname();

  const isFirstActive = onTabChange
    ? activeTab === optionOne
    : pathname === `/${optionOne.toLowerCase()}`;

  const isSecondActive = onTabChange
    ? activeTab === optionTwo
    : pathname === `/${optionTwo.toLowerCase()}`;

  const renderTab = (label: T, isActive: boolean) => {
    if (onTabChange) {
      return (
        <button
          type="button"
          className={`tab-link ${isActive ? "active" : ""}`}
          onClick={() => onTabChange(label)}
        >
          {label}
        </button>
      );
    }
    return (
      <Link
        href={`/${label.toLowerCase()}`}
        className={`tab-link ${isActive ? "active" : ""}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="tab-switcher-container">
      <div className="tab-group">
        {renderTab(optionOne, isFirstActive)}
        {renderTab(optionTwo, isSecondActive)}

        <div
          className={`tab-slider ${isFirstActive ? "pos-left" : "pos-right"}`}
        />
      </div>
    </nav>
  );
}
