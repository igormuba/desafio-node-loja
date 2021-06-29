import React, { useEffect, useCallback, useState } from "react";
import { withCookies, useCookies } from "react-cookie";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import "./ProductList.css";
import Cookies from "universal-cookie";
import axios from "axios";

const ProductList = () => {
  const cookies = new Cookies();
  let [products, setProducts] = useState([]);
  let admin = cookies.get("admin") || false;
  const fetchMyAPI = useCallback(async () => {
    let productsData = await axios.get("/api/products");
    if (productsData.data) {
      console.log(productsData.data);
      setProducts(productsData.data);
    }
  }, []);
  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);
  function clickItem(id) {
    console.log(id);
  }

  let card = (item) => (
    <div
      className="card card-1"
      onClick={() => {
        clickItem(item._id);
      }}
    >
      <div className="title">
        <p>
          {item.name.length > 20
            ? item.name.substring(0, 20) + "..."
            : item.name}
        </p>
      </div>
      <div className="top">
        <img src={item.image} />
      </div>
      <div className="bottom">
        <div className="desc">
          <p>
            {item.description.length > 60
              ? item.description.substring(0, 60) + "..."
              : item.description}
          </p>
        </div>
      </div>
      <div>
        <p className="card-text">R$: {parseFloat(item.price).toFixed(2)}</p>
      </div>
    </div>
  );

  return (
    <Container component="main" maxWidth="xs">
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="search"
        label="Pesquisar"
        name="Pesquisar"
        autoFocus
      />
      {products.map((item) => card(item))}
      {/* {card({
        image: "https://i.imgur.com/OTO1NV9.jpeg",
        name: "name",
        description:
          "description description description description description description description description description description description description ",
        price: "2",
      })} */}
    </Container>
  );
};

export default withCookies(ProductList);
