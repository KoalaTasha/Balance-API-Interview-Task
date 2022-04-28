import request from 'request';

const userBalances = {
    "user-1": {
      "BTC": "0.5",
      "ETH": "2"
    },
    "user-2": {
      "BTC": "0.1",
    },
    "user-3": {
      "ETH": "5",
    },
  }
export class helper {
    
    async getCurrentPrice(currencyPair) {
        return new Promise(function (resolve, reject) {
          request(`https://www.bitstamp.net/api/v2/ticker/${currencyPair}/`, {json: true}, function (error, res, body) {
            if (!error && res.statusCode == 200) {
              resolve(body);
            } else {
              reject(error);
            }
          });
        });
      }
      
    getUserBalance(userId) {
        const balance = userBalances[userId]
        if (!balance) {
            return {error: `No user with userId ${userId} found`}
        }
        return {balance}
    }
}
