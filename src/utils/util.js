import Taro from '@tarojs/taro'

export const isNull = (obj) => {
    return (obj === null || obj === undefined ||
        obj === "" || obj === 0 || obj === false);
}

export const value = (value, defaultValue) => {
    return value ? value : defaultValue;
}

export const makeNavigate = (path) => {
    return () => {
        Taro.navigateTo({
            url: path
        });
    };
}

export const tsToDate = (timestamp) => {
    if (!timestamp) {
        timestamp = Date.now();
    }
    let date = new Date(timestamp);
    return date.toLocaleDateString().replace('/', '-').replace('/', '-');
}