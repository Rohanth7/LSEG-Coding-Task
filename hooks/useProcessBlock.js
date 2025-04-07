import { useState, useEffect } from "react";
import labels from "../constants/labels";
import flow from "../ChatFlow/chatFlow";

const useProcessBlock = (setMessages, userResponseHistory) => {
  const [currentBlock, setCurrentBlock] = useState("");

  const injectErrorMessage = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        sender: "BOT",
        content: labels.errorMessage,
      },
    ]);
  };

  const processBlock = (blockKey) => {
    try {
      let uuid = crypto.randomUUID();
      const block = flow[blockKey];
      if (!block) {
        console.error(`Block ${blockKey} is not found in the ChatFlow`);
        injectErrorMessage();
        return;
      }

      // Retrieve the message content from the block
      let messageContent;
      if (block.message) {
        try {
          messageContent =
            typeof block.message === "function"
              ? block.message(userResponseHistory)
              : block.message;
        } catch (error) {
          console.error("Error generating message content:", error);
          injectErrorMessage();
          return;
        }
      }

      // Retrieve options from the block
      const optionsContent =
        typeof block.options === "function"
          ? block.options(userResponseHistory)
          : block.options;

      setMessages((prev) => [
        ...prev,
        {
          id: uuid,
          sender: "BOT",
          content: messageContent,
          options: optionsContent || "",
        },
      ]);

      if (!block.options && block.nextPath) {
        if (!block.waitForUserInput) setCurrentBlock(block.nextPath);
      }
    } catch (error) {
      console.error("Error processing Block:", error);
      injectErrorMessage();
    }
  };

  useEffect(() => {
    if (currentBlock) processBlock(currentBlock);
  }, [currentBlock]);

  return { currentBlock, setCurrentBlock, processBlock, injectErrorMessage };
};

export default useProcessBlock;
