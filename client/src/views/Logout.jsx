import React, { useEffect } from "react";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";

const Logout = () => {
  const history = useHistory();
  const cookies = new Cookies();

  useEffect(() => {
    cookies.remove("admin");
    cookies.remove("token");
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(100).then(() => {
      history.push("/productList");
      sleep(100).then(() => {
        window.location.reload();
      });
    });
  }, []);
  return <div></div>;
};

export default Logout;
