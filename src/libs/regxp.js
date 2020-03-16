const PHONE_REGXP = /^1[3456789]\d{9}$/

export const regxpPhone = (val) => {
    return val ? PHONE_REGXP.test(val) : false
}