import { FC, ReactNode, useContext } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { UiContext } from "@/context/ui";

interface Props {
  children?: ReactNode;
  backClick: any;
  back?: boolean;
}

export const BackContainer: FC<Props> = ({ children, back, backClick }) => {
  const { setHeight, setRows } = useContext(UiContext);

  return (
    <div className="h-full w-full">
      {back && (
        <button
          type="button"
          onClick={() => {
            backClick();
            setHeight(352);
            setRows(1);
          }}
          className="text-end p-0.5 text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-white absolute left-6 rounded-full shadow-sm hover:bg-gray-50"
        >
          <span className="absolute -inset-2.5" />
          <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
        </button>
      )}
      {children}
    </div>
  );
};
