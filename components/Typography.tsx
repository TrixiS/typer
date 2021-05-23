import { HTMLAttributes } from "react";

export interface PageHeadingProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function PageHeading({ title, children }: PageHeadingProps) {
  return (
    <div className="flex flex-col items-center gap-4 mt-4 mb-10 md:mt-8">
      <h2 className="h2 font-bold text-4xl leading-tight">{title}</h2>
      <h3 className="h3 font-normal text-base leading-none">{children}</h3>
    </div>
  );
}
