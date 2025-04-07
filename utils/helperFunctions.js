import data from "../data/stockdata.json";

/**
 * Fetches the list of stock exchanges from the json file.
 * Returns an array of objects with stock exchange names and codes.
 */
let cachedStockExchanges = null;
const getStockExchanges = () => {
  try {
    if (data === undefined) {
      throw new Error("Data is undefined. Please check the data source.");
    }
    if (!cachedStockExchanges) {
      cachedStockExchanges = data.map((item) => ({
        label: item.stockExchange,
        code: item.code,
      }));
    }
    return cachedStockExchanges;
  } catch (error) {
    console.error("Error fetching stock exchanges:", error);
    throw Error(error);
  }
};

/**
 * Fetches the list of stocks for a given stock exchange code.
 * Returns list of stocks with names and codes.
 */
const getStocksfromStockExchange = (stockExchangeCode) => {
  try {
    if (data === undefined) {
      throw new Error("Data is undefined. Please check the data source.");
    }
    const stockExchange = data.find((item) => item.code === stockExchangeCode);
    return (
      stockExchange.topStocks.map((stock) => ({
        label: stock.stockName,
        code: stock.code,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching stocks from stock exchange:", error);
    throw Error(error);
  }
};

/**
 * Generates a message with the stock price for the selected stock.
 * Returns Message with stock price.
 */
const getMessageWithStockPrice = (userResponseHistory) => {
  try {
    if (data === undefined) {
      throw new Error("Data is undefined. Please check the data source.");
    }
    const stockExchange = data.find(
      (item) => item.code === userResponseHistory.selectStockExchange
    );
    const stock = stockExchange.topStocks.find(
      (item) => item.code === userResponseHistory.selectStock
    );
    return `Stock Price of ${stock.stockName || "unknown"} is ${
      stock.price || "unavailable"
    }. Please select an option.`;
  } catch (error) {
    console.error("Error fetching stock price message:", error);
    throw Error(error);
  }
};

export {
  getStockExchanges,
  getStocksfromStockExchange,
  getMessageWithStockPrice,
};
