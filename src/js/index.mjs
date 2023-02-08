import { setRegisterFormListener } from "./login_register/register.mjs";

const path = location.pathname

// console.log(path);

if (path === "/register/index.html") {
    setRegisterFormListener()
}