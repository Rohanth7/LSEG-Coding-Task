import {
  getStockExchanges,
  getStocksfromStockExchange,
  getMessageWithStockPrice,
} from "../utils/helperFunctions";
import labels from "../constants/labels";

/**
 * Defines the sequence of the chat for the chatbot
 */
const flow = {
  start: {
    message: labels.welcomeMessage,
    nextPath: "askName",
  },

  askName: {
    message: "Hello! What's your name?",
    waitForUserInput: true,
    nextPath: "selectStockExchange",
    placeHolderForInput: labels.enterNamePlaceholder,
  },

  selectStockExchange: {
    message: (params) =>
      `Hello, ${params.askName}. ${labels.selectStockExchangeMessage}`,
    options: getStockExchanges,
    nextPath: "selectStock",
    disableChat: true,
    placeHolderForInput: labels.pickOptionPlaceholder,
  },

  selectStock: {
    message: labels.selectStockMessage,
    options: (params) =>
      getStocksfromStockExchange(params?.selectStockExchange),
    nextPath: "showStockPrice",
    disableChat: true,
    placeHolderForInput: labels.pickOptionPlaceholder,
  },

  showStockPrice: {
    message: (params) => {
      try {
        return getMessageWithStockPrice(params);
      } catch (e) {
        console.error("Error generating stock price message:", e);
        throw Error(e);
      }
    },
    options: [
      { label: labels.mainMenu, code: "mainMenu" },
      { label: labels.goback, code: "goBack" },
    ],
    nextPath: (params) => {
      if (params === "mainMenu") return "selectStockExchange";
      else if (params === "goBack") return "selectStock";
    },
    disableChat: true,
    placeHolderForInput: labels.pickOptionPlaceholder,
  },

  error: {
    message: labels.errorMessage,
  },
};

export default flow;
