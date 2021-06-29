import SideMenu from "./components/SideMenu";
import Login from "./views/Login";
import Register from "./views/Register";
import Logout from "./views/Logout";
import ProductList from "./views/ProductList";
import AddProduct from "./views/AddProduct";
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
    let admin = false;
    if (token) {
      let user = await axios.get("/api/auth", {
        headers: {
          "x-auth-token": token,
        },
      });
      if (user.data) {
        user = user.data;
        admin = user.admin;
        if (admin) {
          routes["addProduct"] = {
            name: "Adicionar",
            Component: <AddProduct />,
          };
        }
        setUser(user);
        authorized = true;
        routes["logout"] = { name: "Sair", Component: <Logout /> };
      }
    }
    if (!authorized) {
      routes["register"] = { name: "Registrar", Component: <Register /> };
      routes["login"] = { name: "Acessar", Component: <Login /> };
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
            <Route exact={true} path={`/addProduct`}>
              <AddProduct />
            </Route>
            <Route exact={true} path={`/logout`}>
              <Logout />
            </Route>
            <Route exact={true} path={`/productList`}>
              <ProductList />
            </Route>
            <Route exact={true} path={`/register`}>
              <Register />
            </Route>
            <Route exact={true} path={`/login`}>
              <Login />
            </Route>
            <Route exact={true} path="/">
              {/* <Home /> */}
            </Route>
          </Switch>
        </div>
      </SideMenu>
    </Router>
  );
}

export default App;
