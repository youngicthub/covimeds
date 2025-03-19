import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminToken, getUserToken } from "./getToken";

export const CheckAdminAuth = () => {
  const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(true);

  useEffect(() => {
    function checkAuth() {
      const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
          return null;
        }
      };

      const decodedJwt = parseJwt(getAdminToken());
      if (decodedJwt === null) {
        setAdminIsLoggedIn(false);
        return
      }

      if (decodedJwt.exp * 1000 < Date.now()) {
        setAdminIsLoggedIn(false);
      } else {
        setAdminIsLoggedIn(true);
      }
    }
    checkAuth();
  }, []);
  return { adminIsLoggedIn };
};




// Check auth for users

export const CheckClientAuth = () => {
  const [clientisLoggedIn, setClientIsLoggedIn] = useState(true);

  useEffect(() => {
    function checkAuth() {
      const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
          return null;
        }
      };

      const decodedJwt = parseJwt(getUserToken());
      if (decodedJwt === null) {
        setClientIsLoggedIn(false);
        return
      }

      if (decodedJwt.exp * 1000 < Date.now()) {
        setClientIsLoggedIn(false);
      } else {
        setClientIsLoggedIn(true);
      }
    }
    checkAuth();
  }, []);
  return { clientisLoggedIn };
};

