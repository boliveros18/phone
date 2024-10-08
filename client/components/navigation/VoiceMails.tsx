import { FC, useContext } from "react";
import { TwilioContext } from "@/context/twilio";
import { RecordList } from "../ui/RecordList";

interface Props {}

export const VoiceMails: FC<Props> = ({}) => {
  const { voicemails } = useContext(TwilioContext);

  return (
    <RecordList
      title="VoiceMails"
      type="voicemails"
      verb="RecordVerb"
      records={voicemails}
    />
  );
};
