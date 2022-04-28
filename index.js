import express from 'express';
import  * as helper from './helper.js';
const app = express()
const port = 8000

const h = new helper.helper()
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/balance', async function(req, res) {
  const {userId} = req.query

  if (!userId) {
    return res.send('Please specify a userId as a query', 400)
  }

  const {error, balance} = h.getUserBalance(userId)
  if (error) {
    return res.send(error, 400)
  }

  let btc = null
  let eth = null
  try {
    btc = (await h.getCurrentPrice('btcusd')).last;
    eth = (await h.getCurrentPrice('ethusd')).last;
  } catch (error) {
    return res.send("There was an error fetching the prices from bitstamp", 503)
  }

  if (btc !== null && eth !== null ) {
    console.log('breakdown', eth, btc, balance)
    let total = 0
    total += ((balance.ETH ? parseFloat(balance.ETH) : 0) * eth)
    total += ((balance.BTC ? parseFloat(balance.BTC) : 0) * btc)


    return res.send(`${Number((total).toFixed(2))}`)
  } else {
    return res.send("There was an error fetching the last prices from bitstamp", 503)
  }
})

export default app
