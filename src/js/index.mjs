import { setRegisterFormListener } from "./login_register/register.mjs";
import { setLoginFormListener } from "./login_register/login.mjs";
import { getListings } from "./listings/getLists.mjs";
import * as paths from "./api/constants.mjs";

// console.log(paths.API_SELLER_URL)

const path = location.pathname

// console.log(path);

// if (path === "/register/index.html") {
//     setRegisterFormListener()
// }

if (path === "/login/login.html") {
    setLoginFormListener()
} else if (path === "/register/index.html") {
    setRegisterFormListener()
} else if (path === "/index.html") {
    getListings()
}