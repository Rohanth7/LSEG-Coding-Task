import { React, useCallback } from "react";
import styled from "styled-components";

const Input = styled("input")(({ disablecursor }) => ({
  width: "100vw",
  height: "3rem",
  outline: "none",
  bottom: 0,
  position: "fixed",
  opacity: 1,
  cursor: disablecursor === "true" ? "not-allowed" : "text",
}));

const ChatbotInput = ({ handleUserInput, currentBlock, flow }) => {
  const shoudlDisableInput = useCallback(() => {
    const block = flow[currentBlock];
    if (block && block.disableChat) return true;
    return false;
  }, [currentBlock, flow]);

  const getPlaceHolderfromBlock = useCallback(() => {
    const block = flow[currentBlock];
    if (block && typeof block.placeHolderForInput === "string")
      return block.placeHolderForInput;
    return "";
  }, [currentBlock, flow]);

  const disableInput = shoudlDisableInput();

  return (
    <div>
      <Input
        type="text"
        placeholder={getPlaceHolderfromBlock()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleUserInput(e.target.value, e.target.value);
            e.target.value = "";
          }
        }}
        disabled={disableInput}
        disablecursor={disableInput ? "true" : undefined}
      />
    </div>
  );
};
export default ChatbotInput;
