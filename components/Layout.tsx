import * as React from "react";

export interface ScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  first?: boolean;
  center?: boolean;
}

export function Screen({ first, center, className, ...rest }: ScreenProps) {
  return (
    <div
      className={`flex flex-col w-full max-w-full ${
        center ? "items-center justify-items-center" : ""
      } ${className ?? ""}`.trim()}
      style={{ height: first ? "calc(100vh - 4rem)" : "100vh" }}
      {...rest}
    />
  );
}

export function Header({
  className,
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <header
      className="items-center sm:block top-0 h-16 w-full bg-white shadow-md"
      {...rest}
    />
  );
}
