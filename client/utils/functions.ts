import { IMessage } from "@/interfaces";

export const injectMessage = (
  newMessage: IMessage | null | void,
  messages: IMessage[],
  filteredMessages: IMessage[],
  preFilteredMessages: IMessage[]
) => {
  const Message = messages.find(
    (msg) =>
      (msg.to === newMessage?.to && msg.from === newMessage?.from) ||
      (msg.to === newMessage?.from && msg.from === newMessage?.to)
  );
  if (Message) {
    const children = Message.children || [];
    delete Message.children;
    children.push(Message);
    const newMsg = { ...newMessage, children: children };
    for (let i in messages) {
      if (messages[i].sid === Message.sid) {
        messages[i] = newMsg;
        messages.splice(Number(i), 1);
        messages.unshift(newMsg);
        break;
      }
    }
  } else {
    if (newMessage) messages.unshift(newMessage);
  }
  for (const index in messages) {
    filteredMessages[index] = messages[index];
    preFilteredMessages[index] = messages[index];
  }
};
