import ChatbotBody from "./ChatbotBody";
import ChatbotHeader from "./ChatbotHeader";
import { MessagesProvider } from "../context/MessagesContext";

export const Chatbot = () => {
  return (
    <>
      <MessagesProvider>
        <ChatbotHeader />
        <ChatbotBody />
      </MessagesProvider>
    </>
  );
};
