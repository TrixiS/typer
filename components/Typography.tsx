import { HTMLAttributes } from "react";

export interface PageHeadingProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function PageHeading({ title, children }: PageHeadingProps) {
  return (
    <div className="flex flex-col items-center gap-4 mt-4 mb-10 md:mt-8">
      <div className="h2 font-bold text-4xl leading-tight">{title}</div>
      <div className="h3 font-normal text-base leading-none">{children}</div>
    </div>
  );
}
