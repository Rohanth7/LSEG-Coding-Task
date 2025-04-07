import React from "react";
import styled from "styled-components";

const Container = styled("div")({
  display: "flex",
  justifyContent: "right",
  fontSize: "20px",
  border: "1px solid black",
  borderRadius: "5px",
  padding: "5px",
  backgroundColor: "lightgray",
  width: "fit-content",
  marginBottom: "5px",
  marginLeft: "auto",
});

const MessageContent = styled("div")({ marginLeft: "10px" });

const UserMessage = ({ message }) => {
  return (
    <Container>
      <MessageContent>{message.content}</MessageContent>
    </Container>
  );
};
export default React.memo(UserMessage);
