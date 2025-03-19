export function getUserToken(){
   return localStorage.getItem("user-token")
}

export function getAdminToken(){
   return localStorage.getItem("admin-token")
}