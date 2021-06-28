import SideMenu from "./components/SideMenu";
import Login from "./views/Login";
import Register from "./views/Register";
import ProductList from "./views/ProductList";
import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

function App() {
  let [routes, setroutes] = useState({
    productList: { name: "Produtos", Component: <ProductList /> },
  });
  const cookies = new Cookies();
  let [user, setUser] = useState({
    productList: { name: "Produtos", Component: <ProductList /> },
  });

  const fetchMyAPI = useCallback(async () => {
    let token = cookies.get("token") || "";
    let authorized = false;
    if (token) {
      let user = await axios.get("/api/auth", {
        headers: {
          "x-auth-token": token,
        },
      });
      if (user.data) {
        user = user.data;
        setUser(user);
        authorized = true;
      }
    }
    if (!authorized) {
      routes["register"] = { name: "Registrar", Component: <Register /> };
      routes["login"] = { name: "Acessar", Component: <Login /> };
    } else {
      //TODO:
      //rota de logout
    }
  }, []);

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  const Routes = () => {
    let routesList = [];
    for (let [key, value] of Object.entries(routes)) {
      routesList.push(
        <Route exact={true} path={`/${key}`}>
          {value.Component}
        </Route>
      );
    }
    return routesList;
  };

  return (
    <Router>
      <SideMenu Menu={routes}>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            {Routes()}
            <Route path="/">{/* <Home /> */}</Route>
          </Switch>
        </div>
      </SideMenu>
    </Router>
  );
}

export default App;
