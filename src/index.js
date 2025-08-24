
var https = require('follow-redirects').https;
var dns = require('dns');

        // Custom DNS resolution
        var customLookup = (hostname, options, callback) => {
          // if (hostname === 'www.okx.com') {
          //   callback(null, '104.18.43.174', 4); // Using the provided IP address
          // } else {
          //   dns.lookup(hostname, options, callback); // Fallback to the default DNS lookup
          // }
            dns.lookup(hostname, options, callback); // Fallback to the default DNS lookup


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
                resolve({status: 200, data:JSON.parse(data).data,message:'success' });
            });
        });

        req.on('error', (e) => {
            resolve({status: 500, message:e });
        });

        req.on('timeout', () => {
            resolve({status: 408,message:'timeout'});
            req.destroy();
        });

        req.end();
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
          if(res.status==200 && res.data.length>0){
            let data = res.data//.map(item => item.instId);
            resolve({status: 200, data:data,message:'success' });
          }else{
            resolve({status: 404, message:"No Coin Found"});
          }
        })
        .catch(err => {
          resolve({status: 500, message:err });
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
          if(res.status==200 && res.data.length>0){
            let data = res.data//.map(item => item.instId);
            resolve({status: 200, data:data,message:'success' });
          }else{
            resolve({status: 404, message:"No Coin Found"});
          }
        })
        .catch(err => {
          resolve({status: 500, message:err });
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
          if(res.status==200 && res.data.length>0){
            let data = res.data//.map(item => item.instId);
            resolve({status: 200, data:data,message:'success' });
          }else{
            resolve({status: 404, message:"No Coin Found"});
          }
        })
        .catch(err => {
          resolve({status: 500, message:err });
        });
    });
}

function OptionsCoin() {
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
          if(res.status==200 && res.data.length>0){
            let data = res.data//.map(item => item.instId);
            resolve({status: 200, data:data,message:'success' });
          }else{
            resolve({status: 404, message:"No Coin Found"});
          }
        })
        .catch(err => {
          resolve({status: 500, message:err });
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
          if(res.status==200 && res.data.length>0){
            let data = res.data//.map(item => item.instId);
            resolve({status: 200, currency:currency.toUpperCase(), quoteCurrency:quoteCurrency.toUpperCase(), data:data,message:'success' });
          }else{
            resolve({status: 404, message:"No Coin Found"});
          }
        })
        .catch(err => {
          resolve({status: 500, message:err });
        });
    });
}
// Export the OKXWsAggregate function
module.exports = { SpotCoin ,FutureCoin,SwapCoin,OptionsCoin,IndexCoin};