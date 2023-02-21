import { setRegisterFormListener } from "./login_register/register.mjs";
import { setLoginFormListener } from "./login_register/login.mjs";

const path = location.pathname

// console.log(path);

// if (path === "/register/index.html") {
//     setRegisterFormListener()
// }

if (path === "/login/login.html") {
    setLoginFormListener()
} else if (path === "/register/index.html") {
    setRegisterFormListener()
}