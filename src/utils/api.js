let tokenLoader = () => {
    const Taro = require('@tarojs/taro');
    return Taro.getStorageSync && Taro.getStorageSync('token');
}

let request = (opts) => {
    const Taro = require('@tarojs/taro');
    return Taro.request && Taro.request(opts);
}

const setTokenLoader = (tl) => {
    tl && (tokenLoader = tl);
}

const setRequest = (req) => {
    req && (request = req);
}

const domin = 'https://ic.dzytql.cn/api';

const apis = {
    login: domin + '/auth/login POST U',
    getUserInfo: domin + '/user/info POST A',
    updateUserInfo: domin + '/user/update POST A',

    getStoreInfo: domin + '/store/info POST A',
    updateStoreInfo: domin + '/store/update POST A',
    getStoreByBoss: domin + '/store/by-boss POST A',

    getProduct: domin + '/product/info POST A',
    updateProduct: domin + '/product/update POST A',
    transferProduct: domin + '/product/transfer POST A',
    filterProduct: domin + '/product/filter POST A',

    getWarehouses: domin + '/warehouse/all POST A',
    createWarehouse: domin + '/warehouse/new POST A',
    getWarehouseLogs: domin + '/warehouse/log POST A',
    printWarehouseLogs: domin + '/warehouse/print POST A',

    updateVip: domin + '/vip/update POST A',
    getVip: domin + '/vip/info POST A',

    createTicket: domin + '/ticket/create POST A',
    getTickets: domin + '/ticket/all POST A',

    getAdminMsg: domin + '/admin-msg/all POST A'
};

const errors = {
    Ok: 0,
    ParamError: 1,
    DatabaseError: 2,
    Unauthorized: 3
};

const makeHeader = () => {
    const token = tokenLoader();
    if (token && token.length !== 0) {
        return {
            'Authorization': `Bearer ${token}`
        };
    } else {
        return {};
    }
}

const mRequest = (apiUrl, data) => {
    const [url, method, needAuth] = apiUrl.split(' ');
    let header = {};
    if (needAuth && needAuth.startsWith('A')) {
        header = makeHeader();
    }
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: method,
            header: header,
            dataType: 'json',
            data: data,
            success: (res) => {
                if (res.statusCode == 200 && res.data) {
                    console.log(res.data);
                    resolve(res.data);
                } else {
                    reject();
                }
            },
            fail: reject
        })
    });
}

const login = async ({
    code //*
} = {}) => {
    const data = await mRequest(apis.login, {
        code: code
    });
    if (data.token) {
        return data.token;
    } else {
        throw Error('login failed');
    }
}

const getUserInfo = async ({
    id
} = {}) => {
    return await mRequest(apis.getUserInfo, {
        id
    });
}

const updateUserInfo = async ({
    id,
    Name,
    Sex,
    Nation,
    Politic,
    Phone,
    StoreID,
    Job,
} = {}) => {
    return await mRequest(apis.updateUserInfo, {
        id,
        Name,
        Sex,
        Nation,
        Politic,
        Phone,
        StoreID,
        Job,
    });
}

const getStoreInfo = async ({
    id
} = {}) => {
    return await mRequest(apis.getStoreInfo, {
        id
    });
}

const updateStoreInfo = async ({
    id,
    Name,
    FullName,
    Type,
    Address,
    Cert,
    RegTime,
    BossID
} = {}) => {
    return await mRequest(apis.updateStoreInfo, {
        id,
        Name,
        FullName,
        Type,
        Address,
        Cert,
        RegTime,
        BossID
    });
}

const getStoreByBoss = async ({
    id
} = {}) => {
    return await mRequest(apis.getStoreByBoss, {
        id
    });
}

const getProduct = async ({
    id,
    OwnerID,
    InShelf,
} = {}) => {
    return await mRequest(apis.getProduct, {
        id,
        OwnerID,
        InShelf,
    });
}

const updateProduct = async ({
    id,
    Name,
    Cost,
    Price,
    Classification,
    Rest,
    Time,
    Address,
    Code,
    ExpTime
} = {}) => {
    return await mRequest(apis.updateProduct, {
        id,
        Name,
        Cost,
        Price,
        Classification,
        Rest,
        Time,
        Address,
        Code,
        ExpTime
    });
}

const filterProduct = async ({
    OwnerID,
    InShelf,
    Rest,
    Time,
    Cost,
    Price,
    Address
} = {}) => {
    return await mRequest(apis.filterProduct, {
        OwnerID,
        InShelf,
        Rest,
        Time,
        Cost,
        Price,
        Address
    })
}

const getWarehouses = async ({
    StoreID
} = {}) => {
    return await mRequest(apis.getWarehouses, {
        StoreID
    });
}

const createWarehouse = async ({
    StoreID
} = {}) => {
    return await mRequest(apis.createWarehouse, {
        StoreID
    });
}

const getWarehouseLogs = async ({
    StoreID
} = {}) => {
    return await mRequest(apis.getWarehouseLogs, {
        id: StoreID
    });
}

const printWarehouseLogs = async ({
    ids
} = {}) => {
    return mRequest(apis.printWarehouseLogs, {
        ids
    });
}

const tranferProduct = async ({
    Action,
    OwnerFrom,
    OwnerTo,
    Products,
    NewProducts,
} = {}) => {
    return await mRequest(apis.transferProduct, {
        Action,
        OwnerFrom,
        OwnerTo,
        Products,
        NewProducts,
    });
}

const getVip = async ({
    ID,
    StoreID
}) => {
    return await mRequest(apis.getVip, {
        ID,
        StoreID
    });
}

const createTicket = async ({
    StoreID,
    Name,
    Begin,
    End,
    Products,
    Type,
    Percent,
    Original,
    Reduce,
    GetType,
    Count,
    Key,
    Level
} = {}) => {
    return await mRequest(apis.createTicket, {
        StoreID,
        Name,
        Begin,
        End,
        Products,
        Type,
        Percent,
        Original,
        Reduce,
        GetType,
        Count,
        Key,
        Level
    });
}

const getTickets = async ({
    StoreID
} = {}) => {
    return await mRequest(apis.getTickets, {
        StoreID
    });
}

const getAdminMsg = async ({
    StoreID,
    Type
} = {}) => {
    return mRequest(apis.getAdminMsg, {
        StoreID,
        Type
    });
}

module.exports = {
    setTokenLoader,
    setRequest,

    errors,
    login,
    getUserInfo,
    updateUserInfo,
    getStoreInfo,
    updateStoreInfo,
    getStoreByBoss,
    getProduct,
    updateProduct,
    tranferProduct,
    filterProduct,
    getWarehouses,
    createWarehouse,
    getWarehouseLogs,
    printWarehouseLogs,
    getVip,
    createTicket,
    getTickets,
    getAdminMsg
}