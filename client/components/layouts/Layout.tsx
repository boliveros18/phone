import { FC, ReactNode, useContext } from "react";
import { UiContext } from "@/context/ui";

interface Props {
  children?: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  const { minimize } = useContext(UiContext);

  return (
    <div
      className={`absolute left-1/2 z-10 mt-1 max-w-sm -translate-x-1/2 w-96 ${
        minimize ? "" : "h-672"
      } flex-auto overflow-hidden rounded-xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5`}
    >
      {children}
    </div>
  );
};
