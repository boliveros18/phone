import { FC, ReactNode } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

interface Props {
  children?: ReactNode;
  list: string[];
  divider?: number;
  selectedItem: any;
}

export const DropDownMenu: FC<Props> = ({
  list,
  children,
  divider,
  selectedItem,
}) => {
  return (
    <Menu as="div" className="absolute inline-block text-left right-2">
      <div>
        <MenuButton className="inline-flex justify-center gap-x-1.5 mx-3 my-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
          {children}
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-8 w-32 top-6 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {list.map((item, index) => (
            <div key={index}>
              <MenuItem>
                <a
                  onClick={() => selectedItem(index)}
                  className={`block cursor-pointer px-4 py-2 text-sm font-normal text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900  ${
                    divider === index ? "border-b" : ""
                  }`}
                >
                  {item}
                </a>
              </MenuItem>
            </div>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};
