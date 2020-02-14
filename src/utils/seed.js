const api = require('./api');
const fetch = require('node-fetch');

const randomText = (len) => {
    len = len || 10;
    var chars = 'ABCDEFGHIJKMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
    var str = '';
    for (i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
}

const randomInt = (min, max) => {
    min = min || 1;
    max = max || 100
    return min + Math.floor(Math.random() * (max - min));
}

const main = async () => {
    let [, , jwt] = process.argv;
    if (!jwt) {
        // test user jwt token
        jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODQxNjU5NzcsImlkIjoxLCJvcmlnX2lhdCI6MTU4MTU3Mzk3N30.xgiJDLa6gajXuAt2dMtrwcX2tiuOKO1hvngUI_Ibks8';
    }

    api.setTokenLoader(() => jwt);

    api.setRequest(async (opts) => {
        try {
            let response = await fetch(opts.url, {
                ...opts,
                headers: opts.header,
                body: JSON.stringify(opts.data),
            });
            if (response.ok) {
                let resp = {
                    statusCode: response.status,
                    data: await response.json()
                };
                opts.success(resp);
            } else {
                opts.fail();
            }
        } catch (error) {
            console.log(error);
            opts.fail();
        }
    })

    let stores = [];
    let response = await api.getStoreByBoss();
    console.log(response);
    stores = response.data;
    for (let j = 0; j < stores.length; j++) {
        for (let i = 0; i < 10; i++) {
            let params = {
                StoreID: stores[j].ID,
                Cost: randomInt(),
                Price: randomInt(),
                Classification: randomText(),
                WarehouseRest: randomInt(),
                WarehouseTime: randomInt(),
                WarehouseAddress: randomInt(),
                ShelfRest: randomInt(),
                ShelfTime: randomInt(),
                ShelfAddress: randomInt(),
                Code: randomText(),
                ExpTime: randomInt(),
            };
            console.log(params);
            console.log(await api.updateProduct(params));
        }
    }
}

main();