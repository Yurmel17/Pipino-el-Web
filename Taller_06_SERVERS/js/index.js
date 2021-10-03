document.addEventListener("DOMContentLoaded", () => {
    const identifier = cookieStorage.getItem("registeredUser");
    console.log(identifier, "?");
    if (identifier) {
        alert(`El usuario ${identifier} ha sido registrado.`);
    }
});

const cookieStorage = {
    getItem: (item) => {
        // converts cookies string into an object-like
        const cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            // key.trim() takes care of removing posible whitespaces
            // {} as last parameter makes the return of reduce an object
            .reduce((accum, [key, value]) => ({ ...accum, [key.trim()]: value }), {});

        // at this point this should be an string or undefined in case the item is not there
        return cookies[item];
    },
    setItem: (item, value, days) => {
        if (days) {
            var date = new Date();
            date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000
            document.cookie = `${item}=${value}; expires=${date.toUTCString()};`;
            return;
        }
        document.cookie = `${item}=${value};`;
    },
    deleteItem: (item) => {
        document.cookie = `${item}=;expires= Thu, 21 Aug 2014 20:00:00 UTC`;
    }
}