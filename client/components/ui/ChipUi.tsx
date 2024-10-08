import { FC } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  showError?: boolean;
  error?: any;
}

export const ChipUi: FC<Props> = ({ error, showError }) => {
  return (
    <div className="text-base text-center font-semibold leading-7 my-4">
   <span
      className={`inline-flex ${
        showError ? "flex" : "hidden"
      } items-center rounded-md bg-pink-50 px-2 py-2 text-sm font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10`}
    >
      <ExclamationCircleIcon
        aria-hidden="true"
        className="h-5 w-5 text-pink-700 mr-1"
      />
      {error}
    </span>
    </div>
  );
};
