export interface IMessage {
  body?: string;
  numSegments?: string;
  unread?: boolean;
  direction?: string;
  from?: string;
  to?: string;
  deceit?: boolean;
  dateUpdated?: string;
  price?: string;
  errorMessage?: string | null;
  uri?: string;
  accountSid?: string;
  numMedia?: string;
  status?: string;
  messagingServiceSid?: string | null;
  sid?: string;
  dateSent?: string;
  dateCreated?: string;
  errorCode?: number;
  priceUnit?: string;
  apiVersion?: string;
  subresourceUris?: {
    feedback?: string;
    media?: string;
  };
  children?: IMessage[];
}
