const ADMIN = "admin123";
const MEMBER = "member123";

function memberLogin(){
  if(pwd.value === MEMBER || pwd.value === ADMIN){
    localStorage.setItem("role","member");
    location.href="index.html";
  } else alert("Wrong Password");
}

function adminLogin(){
  if(pwd.value === ADMIN){
    localStorage.setItem("role","admin");
    location.href="index.html";
  } else alert("Wrong Password");
}
