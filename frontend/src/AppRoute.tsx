import React from "react";
import {useAuth} from "./hooks/useAuth.ts";
import {Navigate} from "react-router-dom";

type PrivateRouteProps = {children: React.ReactNode}
export const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
  const authInfo = useAuth();

  if (!authInfo.checked) {
    return <div>Loading...</div>
  }

  if (!authInfo.isAuthenticated) {
    return <Navigate to="/signin" />
  }

  return <>{children}</>
}

type GuestRouteProps = {children: React.ReactNode}
export const GuestRoute: React.FC<GuestRouteProps> = ({children}) => {
  const authInfo = useAuth();

  if (!authInfo.checked) {
    return <div>Loading...</div>
  }

  if (!authInfo.isAuthenticated) {
    return <>{children}</>
  }

  return <Navigate to="/" />
}
