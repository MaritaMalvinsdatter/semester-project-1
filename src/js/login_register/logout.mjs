
export function setLogoutListener() {
    
    const logOutButton = document.getElementById("log-out");

    if(!logOutButton) {
       return;
    }

    logOutButton.addEventListener("click", function() {
        localStorage.removeItem("profile");
        localStorage.removeItem("token");
        window.location.href = "/index.html";
    });
}




