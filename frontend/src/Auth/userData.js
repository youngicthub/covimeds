import axios from "axios"
import { useEffect, useState } from "react"
import { clientAccessToken } from "../Admin/utils/AccessToken"
import { baseURL } from "../Admin/utils/url"
import { getAdminToken } from "./getToken"

export const GetUser = () => {
   const [user, setUser] = useState({})
   
   useEffect(() => {

      axios.get(baseURL+ "/user", {
         headers: {
            Authorization: "Bearer " + clientAccessToken()
         }
      }).then(data => {
         console.log(data)
         setUser(data)

      }).catch(error => {
         console.log(error)

      })

   }, [])

   return user
  
}

export const GetAdmin = () => {
   const [admin, setAdmin] = useState({})

   useEffect(() => {

      axios.get(baseURL()+ "/admin", {
         headers: {
            Authorization: "Bearer " + getAdminToken()
         }
      }).then(data => {
         
         setAdmin(data.data)

      }).catch(error => {
         console.log(error)
         console.log("====>", error)
      })

   }, [])

   return {admin}
  
}