'use server'

export const uselocalStorage = () => {

    const setLocalStorage = (name: string, data: unknown) => {
        window.localStorage.setItem(name, JSON.stringify(data))
    }

    const getlocalStorage = (name: string) => {
        const data = window.localStorage.getItem(name);
        if (data)
            return JSON.parse(data);
    }

    const deletefromlocalStorage = (name: string) => {
        window.localStorage.removeItem(name);
    }

    return { setLocalStorage, getlocalStorage, deletefromlocalStorage };
}

