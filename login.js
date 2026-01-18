const ADMIN_PASSWORD = "admin123";
const MEMBER_PASSWORD = "123";

function memberLogin(){
    const pwd = document.getElementById("loginPwd").value;
    if(pwd === MEMBER_PASSWORD || pwd === ADMIN_PASSWORD){
        localStorage.setItem("loginType","member");
        window.location.href="index.html";
    } else alert("Wrong password");
}


function adminLogin(){
    const pwd = document.getElementById("loginPwd").value;
    if(pwd === ADMIN_PASSWORD){
        localStorage.setItem("loginType","admin");
        window.location.href="index.html";
    } else alert("Wrong password");
}
