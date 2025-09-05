
var https = require('follow-redirects').https;
var dns = require('dns');

// Custom DNS resolution
var customLookup = (hostname, options, callback) => {
  if (hostname === 'www.okx.com') {
    callback(null, '104.18.43.174', 4); // Using the provided IP address
  } else {
    dns.lookup(hostname, options, callback); // Fallback to the default DNS lookup
  };
};

function HttpCall(optionsConfig) {
  return new Promise((resolve, reject) => {

    var options = optionsConfig;

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({ status: 200, data: JSON.parse(data).data, message: 'success' });
      });
    });

    req.on('error', (e) => {
      resolve({ status: 500, message: e });
    });

    req.on('timeout', () => {
      resolve({ status: 408, message: 'timeout' });
      req.destroy();
    });

    req.end();
  });
}


function AllCoinData() {
  return new Promise((resolve, reject) => {

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/public/coins?t=${Date.now()}`,
      'lookup': customLookup,
      'headers': {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36'
      },
      'maxRedirects': 20
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function SupportCoinData() {
  return new Promise((resolve, reject) => {

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/rubik/stat/trading-data/support-coin-new?t=${Date.now()}`,
      'lookup': customLookup,
      'headers': {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36'
      },
      'maxRedirects': 20
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function CurrencyData() {
  return new Promise((resolve, reject) => {

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/v3/users/common/list/currencies?locale=en_US&entity=1&t=${Date.now()}`,
      'lookup': customLookup,
      'headers': {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36'
      },
      'maxRedirects': 20
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function ProjectCoin() {
  return new Promise((resolve, reject) => {

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/v2/support/info/announce/listProject?t=${Date.now()}`,
      'lookup': customLookup,
      'maxRedirects': 10,
      'timeout': 9000
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.list.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function SpotCoin() {
  return new Promise((resolve, reject) => {

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/public/simpleProduct?instType=SPOT&includeType=1&t=${Date.now()}`,
      'lookup': customLookup,
      'maxRedirects': 10,
      'timeout': 9000
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function FutureCoin() {
  return new Promise((resolve, reject) => {

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/public/simpleProduct?instType=FUTURES&includeType=1&t=${Date.now()}`,
      'lookup': customLookup,
      'maxRedirects': 10,
      'timeout': 9000
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function SwapCoin() {
  return new Promise((resolve, reject) => {

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/public/simpleProduct?instType=FUTURES&includeType=1&t=${Date.now()}`,
      'lookup': customLookup,
      'maxRedirects': 10,
      'timeout': 9000
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function OptionsCoin() {
  return new Promise((resolve, reject) => {

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/public/simpleProduct?instType=OPTION&includeType=1&t=${Date.now()}`,
      'lookup': customLookup,
      'maxRedirects': 10,
      'timeout': 9000
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function IndexCoin(data) {
  return new Promise((resolve, reject) => {

    const currency = data.currency || "USD";
    const quoteCurrency = data.quoteCurrency || "BTC";

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/market/index-currency?currency=${currency.toUpperCase()}&quoteCcy=${quoteCurrency.toUpperCase()}&t=${Date.now()}`,
      'lookup': customLookup,
      'maxRedirects': 10,
      'timeout': 9000
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, currency: currency.toUpperCase(), quoteCurrency: quoteCurrency.toUpperCase(), data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}


function InstrumentsCoinList(data) {
  return new Promise((resolve, reject) => {

    const currency = data.currency || "USD";
    const quoteCurrency = data.quoteCurrency || "BTC";

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/public/instruments/list?t=${Date.now()}`,
      'lookup': customLookup,
      'maxRedirects': 10,
      'timeout': 9000
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, currency: currency.toUpperCase(), quoteCurrency: quoteCurrency.toUpperCase(), data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function TradeData(data) {
  return new Promise((resolve, reject) => {

    const currency = data.currency || "USD";
    const quoteCurrency = data.quoteCurrency || "BTC";

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/market/index-currency?currency=${currency.toUpperCase()}&quoteCcy=${quoteCurrency.toUpperCase()}&t=${Date.now()}`,
      'lookup': customLookup,
      'maxRedirects': 10,
      'timeout': 9000
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, currency: currency.toUpperCase(), quoteCurrency: quoteCurrency.toUpperCase(), data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function DeliveryMapping(data) {
  return new Promise((resolve, reject) => {

    const currency = data.currency || "USD";
    const quoteCurrency = data.quoteCurrency || "BTC";

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/public/delivery-mapping?uly=BTC-USD&t=${Date.now()}`,
      'lookup': customLookup,
      'maxRedirects': 10,
      'timeout': 9000
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, currency: currency.toUpperCase(), quoteCurrency: quoteCurrency.toUpperCase(), data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function OpenInterestvolumeExpiry(data) {
  return new Promise((resolve, reject) => {

    const currency = data.currency || "USD";
    const quoteCurrency = data.quoteCurrency || "BTC";

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/rubik/stat/option/open-interest-volume-expiry?period=8H&ccy=BTC&t=${Date.now()}`,
      'lookup': customLookup,
      'maxRedirects': 10,
      'timeout': 9000
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, currency: currency.toUpperCase(), quoteCurrency: quoteCurrency.toUpperCase(), data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function LongShortAccountRatio(data) {
  return new Promise((resolve, reject) => {

    const currency = data.currency || "USD";
    const quoteCurrency = data.quoteCurrency || "BTC";

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/rubik/stat/contracts/long-short-account-ratio?period=5m&ccy=BTC&t=${Date.now()}`,
      'lookup': customLookup,
      'maxRedirects': 10,
      'timeout': 9000
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, currency: currency.toUpperCase(), quoteCurrency: quoteCurrency.toUpperCase(), data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function LoanRatio(data) {
  return new Promise((resolve, reject) => {

    const currency = data.currency || "USD";
    const quoteCurrency = data.quoteCurrency || "BTC";

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/rubik/stat/margin/loan-ratio?period=5m&ccy=BTC&t=${Date.now()}`,
      'lookup': customLookup,
      'maxRedirects': 10,
      'timeout': 9000
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, currency: currency.toUpperCase(), quoteCurrency: quoteCurrency.toUpperCase(), data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function OpenInterestVolume(data) {
  return new Promise((resolve, reject) => {

    const currency = data.currency || "USD";
    const quoteCurrency = data.quoteCurrency || "BTC";

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/rubik/stat/contracts/open-interest-volume?period=5m&ccy=BTC&t=${Date.now()}`,
      'lookup': customLookup,
      'maxRedirects': 10,
      'timeout': 9000
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, currency: currency.toUpperCase(), quoteCurrency: quoteCurrency.toUpperCase(), data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function Instruments(data) {
  return new Promise((resolve, reject) => {

    const currency = data.currency || "USD";
    const quoteCurrency = data.quoteCurrency || "BTC";

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/public/instruments?instType=FUTURES&instFamily=BTC-USD&t=${Date.now()}`,
      'lookup': customLookup,
      'maxRedirects': 10,
      'timeout': 9000
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, currency: currency.toUpperCase(), quoteCurrency: quoteCurrency.toUpperCase(), data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function IndexCandles(data) {
  return new Promise((resolve, reject) => {

    const currency = data.currency || "USD";
    const quoteCurrency = data.quoteCurrency || "BTC";

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/market/index-candles?instId=BTC-USD&bar=1m&limit=240&t=${Date.now()}`,
      'lookup': customLookup,
      'maxRedirects': 10,
      'timeout': 9000
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, currency: currency.toUpperCase(), quoteCurrency: quoteCurrency.toUpperCase(), data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function Candles(data) {
  return new Promise((resolve, reject) => {

    const currency = data.currency || "USD";
    const quoteCurrency = data.quoteCurrency || "BTC";

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/market/candles?bar=1m&limit=240&instId=BTC-USD-250829&t=${Date.now()}`,
      'lookup': customLookup,
      'maxRedirects': 10,
      'timeout': 9000
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, currency: currency.toUpperCase(), quoteCurrency: quoteCurrency.toUpperCase(), data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

function TakerVolume(data) {
  return new Promise((resolve, reject) => {

    const currency = data.currency || "USD";
    const quoteCurrency = data.quoteCurrency || "BTC";

    var options = {
      'method': 'GET',
      'hostname': 'www.okx.com',
      'path': `/priapi/v5/rubik/stat/taker-volume?instType=SPOT&period=5m&ccy=BTC&t=${Date.now()}`,
      'lookup': customLookup,
      'maxRedirects': 10,
      'timeout': 9000
    };

    HttpCall(options)
      .then(res => {
        if (res.status == 200 && res.data.length > 0) {
          let data = res.data//.map(item => item.instId);
          resolve({ status: 200, currency: currency.toUpperCase(), quoteCurrency: quoteCurrency.toUpperCase(), data: data, message: 'success' });
        } else {
          resolve({ status: 404, message: "No Coin Found" });
        }
      })
      .catch(err => {
        resolve({ status: 500, message: err });
      });
  });
}

// Export the OKXWsAggregate function
module.exports = {
  DeliveryMapping,
  OpenInterestvolumeExpiry,
LongShortAccountRatio,
LoanRatio,
OpenInterestVolume,
Instruments,
IndexCandles,
Candles,
TakerVolume,
InstrumentsCoinList,

  SupportCoinData, AllCoinData,CurrencyData, ProjectCoin, SpotCoin, FutureCoin, SwapCoin, OptionsCoin, IndexCoin ,TradeData};