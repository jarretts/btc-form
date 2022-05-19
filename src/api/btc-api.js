// Free API for BTC price in CHF, limited to 50 calls/minute
const btcChfPrice = async () => {
  return fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=chf")
  .then(response => response.json())
  .then(data => data["bitcoin"]["chf"])
}

const apiExport = { btcChfPrice }
export default apiExport;