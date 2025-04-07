import { useContext, createContext, useState } from "react";

const MessagesContext = createContext({
  messages: [],
  setMessages: () => null,
});
const useMessagesContext = () => useContext(MessagesContext);

const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};

export { useMessagesContext, MessagesProvider };
