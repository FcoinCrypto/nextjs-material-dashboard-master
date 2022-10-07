export function conversionUsdt(fcoin){
    return fcoin * 10;
}

export function conversion(fcoin, unite){
    switch (unite.toUpperCase()) {
        case 'USDT':
            return fcoin * 10;
        break;
        case 'ARIARY':
            return fcoin * 40500;
        break;
        default:
        break;
    }
}

export function FcoinToUsdT(fcoin, lastUsdt){
            return fcoin * lastUsdt;
}

export function UsdtToFcoin(fcoin, lastUsdt){
    return lastUsdt / fcoin;
}