import Taro from '@tarojs/taro';

const domin = 'http://ic.cildhdi.cn/api';

const apis = {
    login: domin + '/auth/login POST U',
    getUserInfo: domin + '/user/info POST A',
    updateUserInfo: domin + '/user/update POST A',

    getStoreInfo: domin + '/store/info POST A',
    updateStoreInfo: domin + '/store/update POST A',
    getStoreByBoss: domin + '/store/by-boss POST A',

    getProduct: domin + '/product/info POST A',
    updateProduct: domin + '/product/update POST A',
    enterWarehouse: domin + '/product/enter-warehouse POST A',
    enterShelf: domin + '/product/enter-shelf POST A',
    leaveShelf: domin + '/product/leave-shelf POST A'
};

export const errors = {
    Ok: 0,
    ParamError: 1,
    DatabaseError: 2,
    Unauthorized: 3
};

const makeHeader = () => {
    const token = Taro.getStorageSync('token');
    if (token && token.length !== 0) {
        return {
            'Authorization': `Bearer ${token}`
        };
    } else {
        return {};
    }
}

export const mRequest = (apiUrl, data) => {
    const [url, method, needAuth] = apiUrl.split(' ');
    let header = {};
    if (needAuth && needAuth.startsWith('A')) {
        header = makeHeader();
    }
    return new Promise((resolve, reject) => {
        Taro.request({
            url: url,
            method: method,
            header: header,
            dataType: 'json',
            data: data,
            success: (res) => {
                if (res.statusCode == 200 && res.data) {
                    resolve(res.data);
                    console.log(res.data);
                } else {
                    reject();
                }
            },
            fail: reject
        })
    });
}

export const login = async ({
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

export const getUserInfo = async ({
    id
} = {}) => {
    return await mRequest(apis.getUserInfo, {
        id
    });
}

export const updateUserInfo = async ({
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

export const getStoreInfo = async ({
    id
} = {}) => {
    return await mRequest(apis.getStoreInfo, {
        id
    });
}

export const updateStoreInfo = async ({
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

export const getStoreByBoss = async ({
    id
} = {}) => {
    return await mRequest(apis.getStoreByBoss, {
        id
    });
}

export const getProduct = async ({
    id
} = {}) => {
    return await mRequest(apis.getProduct, {
        id
    });
}

export const updateProduct = async ({
    StoreID,
    Cost,
    Price,
    Classification,
    WarehouseRest,
    WarehouseTime,
    WarehouseAddress,
    ShelfRest,
    ShelfTime,
    ShelfAddress,
    Code,
    ExpTime,
} = {}) => {
    return await mRequest(apis.updateProduct, {
        StoreID,
        Cost,
        Price,
        Classification,
        WarehouseRest,
        WarehouseTime,
        WarehouseAddress,
        ShelfRest,
        ShelfTime,
        ShelfAddress,
        Code,
        ExpTime,
    });
}

export const enterShelf = async ({
    ProductID,
    Count,
    ShelfTime,
    ShelfAddress,
} = {}) => {
    return await mRequest(apis.enterShelf, {
        ProductID,
        Count,
        ShelfTime,
        ShelfAddress,
    });
}

export const enterWarehouse = async ({
    StoreID,
    Cost,
    Price,
    Classification,
    WarehouseRest,
    WarehouseTime,
    WarehouseAddress,
    Code,
    ExpTime,
} = {}) => {
    return await mRequest(apis.enterWarehouse, {
        StoreID,
        Cost,
        Price,
        Classification,
        WarehouseRest,
        WarehouseTime,
        WarehouseAddress,
        Code,
        ExpTime,
    });
}

export const leaveShelf = async ({
    id
} = {}) => {
    return await mRequest(apis.leaveShelf, {
        id
    });
}
