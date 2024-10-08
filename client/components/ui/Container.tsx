import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  title?: string;
  display?: boolean;
  Icon?: any;
  onClick?: any;
}

export const Container: FC<Props> = ({
  children,
  title,
  display,
  Icon,
  onClick,
}) => {
  return (
    <>
      <div className="flex my-2 py-2">
        <h2 className={`text-sm font-semibold text-gray-900 sm:pr-12 pl-4`}>
          {title}
        </h2>
        {display && (
          <button
            type="button"
            onClick={() => onClick()}
            className="text-end h-7 w-7 p-1 -mt-1 hover:text-black focus:outline-none focus:ring-2 focus:ring-white absolute right-6 rounded-lg shadow-sm hover:bg-gray-50"
          >
            <span className="absolute -inset-2.5" />
            {Icon && <Icon aria-hidden="true" className="h-5 w-5" />}
          </button>
        )}
      </div>
      {children}
    </>
  );
};
