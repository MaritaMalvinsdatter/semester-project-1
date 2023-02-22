
export function logOutEvent() {
    
    const logOutFeature = document.getElementById("log-out");

    logOutFeature.addEventListener("click", function() {
        localStorage.removeItem("profile");
        localStorage.removeItem("token");
        window.location.href = "/index.html";
    });
}




