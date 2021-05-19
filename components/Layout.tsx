import * as React from "react";

export interface ScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  first?: boolean;
  className?: string;
}

export function Screen({ children, first, className, ...rest }: ScreenProps) {
  return (
    <div
      className={`flex flex-col w-full max-w-full ${className ?? ""}`}
      style={{ height: first ?? false ? "calc(100vh - 4rem)" : "100vh" }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Header({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLHeadElement>) {
  return (
    <header
      className="items-center sm:block top-0 h-16 w-full bg-white shadow-md"
      {...rest}
    >
      {children}
    </header>
  );
}
