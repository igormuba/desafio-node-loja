import React, { useEffect } from "react";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";

const Logout = () => {
  const history = useHistory();
  const cookies = new Cookies();

  useEffect(() => {
    cookies.remove("admin");
    cookies.remove("token");

    history.push("/productList");
    window.location.reload();
  }, []);
  return <div></div>;
};

export default Logout;
