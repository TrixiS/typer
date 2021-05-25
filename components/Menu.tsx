import * as React from "react";

export interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  selectable?: boolean;
  selected?: boolean;
}

export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactElement[];
}

export function Menu({ children, ...rest }: MenuProps) {
  const [selectedItemIndex, setSelectedItemIndex] =
    React.useState<number>(null);

  return (
    <ul className="flex flex-row justify-evenly max-h-full h-full" {...rest}>
      {children.map((item, index) =>
        React.cloneElement<MenuItemProps>(item, {
          selected: selectedItemIndex === index,
          onClick: () => setSelectedItemIndex(index),
          key: index.toString(),
        })
      )}
    </ul>
  );
}

export function MenuItem({
  selected,
  selectable = true,
  className,
  ...rest
}: MenuItemProps) {
  const baseClassName =
    "font-normal text-lg cursor-pointer max-h-full items-center self-center";

  let itemClassName: string;

  if (className) itemClassName = `${baseClassName} ${className}`;
  else
    itemClassName =
      selected && selectable
        ? `font-medium text-blue-600 ${baseClassName}`
        : `text-gray-500 hover:text-gray-900 ${baseClassName}`;

  return <li className={itemClassName} {...rest} />;
}
