const { SpotCoin,FutureCoin,SwapCoin,IndexCoin } = require('../src');

   IndexCoin({
       currency: 'idr',
       quoteCurrency: 'usdt'
   })
        .then(res => {
          console.log(res
            // .length
          );
          // Do something with the response
        })
        .catch(err => {
          console.error(err);
        });