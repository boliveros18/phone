import { FC } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Props {
  open?: boolean;
  pageNumber: number;
  length: number;
  upClick: any;
  downClick: any;
  items: any;
}

export const Pagination: FC<Props> = ({
  open,
  pageNumber,
  length,
  upClick,
  downClick,
  items,
}) => {

  return (
    <div
      className={`mt-6 mr-5 flex justify-end items-center ${
        open ? "hidden" : ""
      }`}
    >
      <button
        type="button"
        className={`h-7 w-7 flex items-center justify-center rounded-lg shadow-sm ${
          pageNumber === 1
            ? "bg-gray-50 cursor-auto"
            : "bg-white hover:bg-gray-50"
        }`}
        onClick={upClick}
        disabled={pageNumber === 1}
      >
        <ChevronLeftIcon
          aria-hidden="true"
          className="h-5 w-5 text-gray-900"
          title="expand"
        />
      </button>
      <div className="h-7 w-7 flex items-center justify-center font-semibold">
        {pageNumber}
      </div>
      <button
        type="button"
        className={`h-7 w-7 flex items-center justify-center rounded-lg shadow-sm ${
          (items.length / length) <= pageNumber
            ? "bg-gray-50 cursor-auto"
            : "bg-white hover:bg-gray-50"
        }`}
        onClick={downClick}
        disabled={(items.length / length) <= pageNumber}
      >
        <ChevronRightIcon
          aria-hidden="true"
          className="h-5 w-5 text-gray-900"
          title="expand"
        />
      </button>
    </div>
  );
};
