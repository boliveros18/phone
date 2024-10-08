export interface ICall {
  sid: string | null;
  dateCreated: string | null;
  dateUpdated: string | null;
  parentCallSid: string | null;
  accountSid: string | null;
  to: string | null;
  toFormatted: string | null;
  from: string | null;
  fromFormatted: string | null;
  phoneNumberSid: string | null;
  status: string | null;
  startTime: string | null;
  endTime: string | null;
  duration: string | null;
  price: string | null;
  priceUnit: string | null;
  direction: string | null;
  answeredBy: string | null;
  apiVersion: string | null;
  forwardedFrom: string | null;
  groupSid: string | null;
  callerName: string | null;
  queueTime: string | null;
  trunkSid: string | null;
  uri: string | null;
  subresourceUris: {
    notifications: string;
    user_defined_messages: string;
    transcriptions: string;
    recordings: string;
    streams: string;
    payments: string;
    user_defined_message_subscriptions: string;
    siprec: string;
    events: string;
  };
}
