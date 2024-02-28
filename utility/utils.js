export function debounce(fn, wait) {
    let timer = null;
    return function () {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, wait);
    }
}

export function verifyLoginTime() {
    const loginTime = localStorage.getItem("loginTime")
    const endTime = Date.parse(new Date())
    return loginTime > endTime
}