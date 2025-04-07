import { useEffect, useState, useCallback, useRef } from "react";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import styled from "styled-components";
import { useMessagesContext } from "../context/MessagesContext";
import ChatbotInput from "./ChatbotInput";
import useProcessBlock from "../hooks/useProcessBlock";
import flow from "../ChatFlow/chatFlow";

const ChatContainer = styled("div")({
  backgroundColor: "transparent",
  padding: "1rem",
  overflowY: "auto",
  height: "calc(100vh - 11rem)",
});

const ChatbotBody = () => {
  const { messages, setMessages } = useMessagesContext();
  const [userResponseHistory, setUserResponseHistory] = useState({});
  const latestMessageRef = useRef(null);

  const { currentBlock, setCurrentBlock, injectErrorMessage } = useProcessBlock(
    setMessages,
    userResponseHistory
  );

  useEffect(() => {
    const handleWindowLoad = () => {
      setCurrentBlock("start");
    };

    window.addEventListener("load", handleWindowLoad);

    return () => {
      window.removeEventListener("load", handleWindowLoad);
    };
  }, [setCurrentBlock]);

  // Scroll to the latest message whenever messages change
  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [messages]);

  const handleUserInput = useCallback(
    (userInputCode, userInputLabel) => {
      try {
        const block = flow[currentBlock];
        let uuid = crypto.randomUUID();

        // Add the label to the messages for display in the UI
        setMessages((prev) => [
          ...prev,
          {
            id: uuid,
            sender: "USER",
            content: userInputLabel,
          },
        ]);

        // Store the code in userResponseHistory
        setUserResponseHistory((prev) => ({
          ...prev,
          [currentBlock]: userInputCode,
        }));

        if (block.nextPath) {
          setCurrentBlock(() =>
            typeof block.nextPath === "function"
              ? block.nextPath(userInputCode)
              : block.nextPath
          );
        }
      } catch (error) {
        console.error("Error handling user input:", error);
        injectErrorMessage();
      }
    },
    [currentBlock, setMessages, setUserResponseHistory, setCurrentBlock]
  );

  return (
    <>
      <ChatContainer>
        {messages.map((message, index) => {
          const isNewSender =
            index === 0 ||
            messages[index].sender !== messages[index - 1].sender;

          if (message.sender.toUpperCase() === "BOT") {
            return (
              <BotMessage
                key={message.id}
                message={message}
                isNewSender={isNewSender}
                handleUserInput={handleUserInput}
                ref={index === messages.length - 1 ? latestMessageRef : null}
                disableOptions={index !== messages.length - 1}
              />
            );
          }

          if (message.sender.toUpperCase() === "USER") {
            return (
              <UserMessage
                key={message.id}
                message={message}
                isNewSender={isNewSender}
              />
            );
          }
        })}
      </ChatContainer>
      <ChatbotInput
        handleUserInput={handleUserInput}
        currentBlock={currentBlock}
        flow={flow}
      />
    </>
  );
};

export default ChatbotBody;
