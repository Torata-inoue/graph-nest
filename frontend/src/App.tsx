import "./App.css";
import "modern-css-reset";

import NotFound from "./components/NotFound.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GuestRoute, PrivateRoute } from "./AppRoute.tsx";
import client from "./apolloClient.ts";
import { ApolloProvider } from "@apollo/client";
import SignIn from "./components/guest/SignIn.tsx";
import SignUp from "./components/guest/SignUp.tsx";
import Main from "./components/private/Main.tsx";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route
            path="signin"
            element={
              <GuestRoute>
                <SignIn />
              </GuestRoute>
            }
          />
          <Route
            path="signup"
            element={
              <GuestRoute>
                <SignUp />
              </GuestRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
