const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("running normally on port 5000")
})

app.post("/chat", (req,response) => {

  let amount = req.body.queryResult.parameters.amount;
  let toC = req.body.queryResult.parameters.toCurrency;
  let fromC = req.body.queryResult.parameters.fromCurrency;

  axios.get("http://data.fixer.io/api/latest?access_key=327a9ffab4411b40e168450c40083a14&base=EUR&symbols="+ fromC + "," + toC)
  .then((res) => {
    const rate1 = res.data.rates[fromC]
    const rate2 = res.data.rates[toC]
    const total = amount * rate2 / rate1
    const msg = amount + " " + fromC + " is equal to " + total.toFixed(4) + " " + toC;
    response.json({fulfillmentText:msg})
  }).catch((err) => {
    response.status(404).json(err);
  })
});

app.listen(5000);