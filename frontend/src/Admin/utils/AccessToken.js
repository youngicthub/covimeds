import { getAdminToken, getUserToken } from "../../Auth/getToken"

export const AccessToken  = () => {
   return getAdminToken()
}

export const clientAccessToken  = () => {
   return getUserToken()
}