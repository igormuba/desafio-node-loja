import SideMenu from "./components/SideMenu";
import Login from "./views/Login";
import Register from "./views/Register";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const routes = {
    login: { name: "Acessar", Component: <Login /> },
    register: { name: "Registrar", Component: <Register /> },
  };

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
