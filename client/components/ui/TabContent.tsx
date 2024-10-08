import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const TabContent: FC<Props> = ({ children }) => {
  return (
    <div className="h-506 flex-auto overflow-hidden bg-white text-sm leading-6 ring-gray-900/5 ">
      {children}
    </div>
  );
};
