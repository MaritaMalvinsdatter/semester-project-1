import { load } from "/js/api/tokenStorage.mjs"

export function headers() {
    const token = load("token");

    // returns the correct and updated header

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
}

//getting and exporting tokens for re-use in posts
export async function tokenFetch(url, options = {}) {
    return fetch(url, {
        //spread operator - includes options from body/postData
        ...options,
        headers: headers()
    })
}