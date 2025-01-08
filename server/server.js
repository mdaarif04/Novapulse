const express = require("express");
const axios = require("axios");
const { Connection, PublicKey } = require("@solana/web3.js");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/index.js");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB()


const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL;

// Fetch Binance prices
app.get("/api/binance-prices", async (req, res) => {
  try {
    const response = await axios.get(process.env.BINANCE_API_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Binance prices" });
  }
});

app.get("/api/solana-prices", async (req, res) => {
  try {
    const connection = new Connection(SOLANA_RPC_URL, "confirmed");
    res.json([{ token: "USDC", price: 1.01 }]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Solana prices" });
  }
});

app.get("/api/arbitrage", async (req, res) => {
  try {
    const binancePrices = await axios.get(BINANCE_API_URL);
    const solanaPrices = [{ token: "USDC", price: 1.01 }]; // Replace with actual Solana data.

    const opportunities = binancePrices.data
      .filter((b) =>
        solanaPrices.some((s) => s.token === b.symbol.replace("USDC", ""))
      )
      .map((b) => {
        const solanaToken = solanaPrices.find(
          (s) => s.token === b.symbol.replace("USDC", "")
        );
        const priceDifference = solanaToken.price - b.price;
        const fees = 0.004; 
        return priceDifference > fees
          ? { token: b.symbol, opportunity: priceDifference }
          : null;
      })
      .filter(Boolean);

    res.json(opportunities);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error calculating arbitrage opportunities" });
  }
});

// Set up server to listen on a specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
