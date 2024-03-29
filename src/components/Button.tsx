import type { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

type ButtonProps = {
  small?: boolean;
  gray?: boolean;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({
  small = false,
  gray = false,
  className = "",
  ...props
}: ButtonProps) {
  const sizeClasses = small ? "ps-2 py-1" : "px-4 py-2 font-bold";
  const colorClasses = gray
    ? "bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-300"
    : "bg-blue-500 hover:bg-blue-400 focus-visible:bg-blue-400";

  return (
    <button
      className={`durations-200 rounded-full text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses} ${colorClasses} ${className}`}
      {...props}
    ></button>
  );
}
