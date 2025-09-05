const {
  LongShortAccountRatio,
LoanRatio,
Candles,
TakerVolume,
InstrumentsCoinList,

  SupportCoinData,AllCoinData,CurrencyData,ProjectCoin, SpotCoin,FutureCoin,SwapCoin,IndexCoin,TradeData } = require('../src');

   InstrumentsCoinList({
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