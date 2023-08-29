import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Payload } from "../types/payload.ts";

type AuthInfoType = {
  checked: boolean;
  isAuthenticated: boolean;
};
type UseAuthType = () => AuthInfoType;
export const useAuth: UseAuthType = () => {
  const [authInfo, setAuthInfo] = useState<AuthInfoType>({
    checked: false,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const decodedToken = jwtDecode<Payload>(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setAuthInfo({ checked: true, isAuthenticated: false });
        } else {
          setAuthInfo({ checked: true, isAuthenticated: true });
        }
      } else {
        setAuthInfo({ checked: true, isAuthenticated: false });
      }
    } catch (error) {
      setAuthInfo({ checked: true, isAuthenticated: false });
    }
  }, []);

  return authInfo;
};
