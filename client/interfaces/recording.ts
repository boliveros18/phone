export interface IRecording {
  accountSid: string;
  apiVersion: string;
  callSid: string;
  conferenceSid: string | null;
  dateCreated: string;
  dateUpdated: string;
  startTime: string;
  duration: string;
  sid: string;
  price: string;
  fromFormatted: string;
  toFormatted: string;
  priceUnit: string;
  status: string;
  channels: number;
  source: string;
  errorCode: number | null;
  uri: string;
  encryptionDetails: string | null;
  subresourceUris: {
    add_on_results: string;
    transcriptions: string;
  };
  mediaUrl: string;
}
