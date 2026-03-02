import React from "react";

interface ActionButtonProps {
  icon: React.ReactNode;
  text: string;
  outline?: boolean;
}

export function ActionButton({ icon, text, outline }: ActionButtonProps) {
  const baseClasses =
    "group relative inline-flex items-center gap-3 rounded-2xl border px-5 py-3 text-sm font-semibold tracking-tight transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 shadow-[0_14px_28px_rgba(2,6,23,0.22)]";
  const filledClasses =
    "bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-800/90 text-white border-white/15 hover:-translate-y-0.5 hover:shadow-[0_20px_35px_rgba(2,6,23,0.35)]";
  const outlineClasses =
    "bg-white/85 text-slate-900 border-white hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(15,23,42,0.18)] backdrop-blur";

  const iconClasses = outline
    ? "bg-slate-900/5 text-slate-900 border border-slate-900/10"
    : "bg-white/20 text-white border border-white/20";

  const accentLabelClasses = outline
    ? "text-slate-500"
    : "text-white/70";

  return (
    <button
      className={`${baseClasses} ${outline ? outlineClasses : filledClasses}`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full ${iconClasses}`}
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="text-base leading-tight">{text}</span>
        <span className={`text-[0.65rem] font-medium uppercase tracking-[0.4em] ${accentLabelClasses}`}>
          Plan
        </span>
      </div>
    </button>
  );
}
