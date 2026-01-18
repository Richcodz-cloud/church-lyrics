const ADMIN = localStorage.getItem("adminPwd") || "admin123";
const MEMBER = "123";

function memberLogin(){
  if(pwd.value===MEMBER || pwd.value===ADMIN){
    localStorage.setItem("role","member");
    location.href="index.html";
  } else alert("Wrong password");
}

function adminLogin(){
  if(pwd.value===ADMIN){
    localStorage.setItem("role","admin");
    location.href="index.html";
  } else alert("Wrong password");
}
