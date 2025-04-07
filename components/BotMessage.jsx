import React from "react";
import styled from "styled-components";

const Container = styled("div")({
  display: "flex",
  fontSize: "20px",
  marginBottom: "5px",
  animation: "bot-message-animation 0.3s ease-in backwards",
});

const MessageContainer = styled("div")(({ isNewSender }) => ({
  display: "flex",
  flexDirection: "column",
  border: "1px solid black",
  borderRadius: "5px",
  padding: "5px",
  backgroundColor: "lightblue",
  marginLeft: isNewSender ? "0rem" : "3rem",
}));

const MessageContent = styled("div")({ marginLeft: "10px" });

const OptionsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  minWidth: "20rem",
});

const BotMessage = ({
  message,
  isNewSender = true,
  handleUserInput,
  ref,
  disableOptions = false,
}) => {
  return (
    <Container ref={ref}>
      {isNewSender && (
        <span
          style={{ marginRight: "1rem", width: "2rem" }}
          className="material-symbols-outlined"
        >
          smart_toy
        </span>
      )}
      <MessageContainer isNewSender={isNewSender}>
        <MessageContent>{message.content}</MessageContent>
        <OptionsContainer>
          {Array.isArray(message.options) &&
            message.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleUserInput(option.code, option.label)}
                style={{
                  height: "30px",
                }}
                disabled={disableOptions}
              >
                {option.label}
              </button>
            ))}
        </OptionsContainer>
      </MessageContainer>
    </Container>
  );
};

export default React.memo(BotMessage);
