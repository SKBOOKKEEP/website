import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variants = {
  primary:
    "bg-primary text-on-primary hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed",
  outline:
    "border border-primary text-primary hover:bg-primary hover:text-on-primary",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-xs",
  lg: "px-8 py-4 text-xs",
};

const base =
  "inline-flex items-center justify-center font-semibold tracking-widest uppercase transition-all cursor-pointer";

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (href.startsWith("http") || href.startsWith("#")) {
      return (
        <a href={href} className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
