import { FC } from "react";

interface Props {
  background?: string;
  onClick: any;
  Icon: any;
  transform?: string;
}

export const IconButton: FC<Props> = ({ background, onClick, Icon, transform }) => {
  return (
    <button
    type="button"
    className={`flex items-center justify-center w-16 h-16 font-normal text-3xl rounded-full ${background}`}
    onClick={onClick}
  >
    <Icon className={`text-white h-7 w-7 ${transform}`} />
  </button>
  );
};
