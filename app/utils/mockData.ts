export const marketCap = 1234567890; // $1,234,567,890

export const holdings = [
  { asset: "ETH", amount: 1000, value: 2000000 },
  { asset: "BTC", amount: 100, value: 3000000 },
  { asset: "USDC", amount: 5000000, value: 5000000 },
  { asset: "AAVE", amount: 10000, value: 1000000 },
];

export const recentTrades = [
  { date: "2023-05-01", action: "BUY", asset: "ETH", amount: 50, price: 1800 },
  { date: "2023-05-02", action: "SELL", asset: "BTC", amount: 2, price: 28000 },
  { date: "2023-05-03", action: "BUY", asset: "AAVE", amount: 1000, price: 80 },
  {
    date: "2023-05-04",
    action: "SELL",
    asset: "USDC",
    amount: 100000,
    price: 1,
  },
];

export const marketCapHistory = [
  { date: "2023-04-01", value: 1000000000 },
  { date: "2023-04-08", value: 1050000000 },
  { date: "2023-04-15", value: 1150000000 },
  { date: "2023-04-22", value: 1100000000 },
  { date: "2023-04-29", value: 1200000000 },
  { date: "2023-05-06", value: 1234567890 },
];

export const portfolioPerformance = [
  { date: "2023-04-01", value: 10000000 },
  { date: "2023-04-08", value: 10500000 },
  { date: "2023-04-15", value: 11000000 },
  { date: "2023-04-22", value: 10800000 },
  { date: "2023-04-29", value: 11500000 },
  { date: "2023-05-06", value: 11000000 },
];

export const experimentsInProgress = [
  {
    name: "DeFi Yield Optimizer",
    description: "Automated yield farming strategy",
    progress: 75,
  },
  {
    name: "NFT Marketplace",
    description: "Decentralized NFT trading platform",
    progress: 40,
  },
  {
    name: "Cross-chain Bridge",
    description: "Interoperability solution for multiple blockchains",
    progress: 60,
  },
];

export const experimentTokens = [
  { name: "Yield Token", symbol: "YLD", link: "https://example.com/yld" },
  { name: "NFT Token", symbol: "NFT", link: "https://example.com/nft" },
  { name: "Bridge Token", symbol: "BRG", link: "https://example.com/brg" },
];
