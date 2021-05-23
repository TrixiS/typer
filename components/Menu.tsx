import * as React from "react";

export interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  selected: boolean;
}

// TODO: make MenuItem public component
// Use MenuItemWrapper to wrap menu component
// add selectable to MenuItem
export function Menu({
  children,
  ...rest
}: React.HTMLAttributes<HTMLUListElement>) {
  const items = children as React.ReactElement[];
  const [selectedItemIndex, setSelectedItemIndex] =
    React.useState<number>(null);

  return (
    <ul className="flex flex-row justify-evenly max-h-full h-full" {...rest}>
      {items.map((item, index) => (
        <MenuItem
          selected={selectedItemIndex === index}
          onClick={() => setSelectedItemIndex(index)}
          key={index}
        >
          {item}
        </MenuItem>
      ))}
    </ul>
  );
}

export function MenuItem({ selected, children, ...rest }: MenuItemProps) {
  const baseClassName =
    "font-normal text-lg cursor-pointer max-h-full items-center self-center";
  const className = selected
    ? `font-medium text-blue-600 ${baseClassName}`
    : `text-gray-500 hover:text-gray-900 ${baseClassName}`;

  return (
    <li className={className} {...rest}>
      {children}
    </li>
  );
}
