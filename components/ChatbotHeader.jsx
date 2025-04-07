import styled from "styled-components";
import labels from "../constants/labels";

const Container = styled("div")({
  backgroundColor: "blue",
  height: "3rem",
  color: "white",
  width: "100%",
  display: "flex",
  alignItems: "center",
  padding: "0.5rem",
  fontWeight: "bold",
});

const ChatbotHeader = () => {
  return (
    <Container>
      <span
        style={{ marginRight: "1rem" }}
        className="material-symbols-outlined"
      >
        smart_toy
      </span>
      <p>{labels.headerTitle}</p>
    </Container>
  );
};
export default ChatbotHeader;
