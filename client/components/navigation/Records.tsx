import { FC, useContext } from "react";
import { TwilioContext } from "@/context/twilio";
import { RecordList } from "../ui/RecordList";

interface Props {}

export const Records: FC<Props> = ({}) => {
  const { recordings } = useContext(TwilioContext);

  return (
      <RecordList title="Records" type="recordings" verb="DialVerb" records={recordings} />
  );
};
