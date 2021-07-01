import React, { useEffect, useCallback, useState } from "react";
import { withCookies, useCookies } from "react-cookie";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import "./ProductList.css";
import Cookies from "universal-cookie";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router";

const ProductList = () => {
  const cookies = new Cookies();
  const history = useHistory();

  let [products, setProducts] = useState([]);
  let [filterCriteria, setFilterCriteria] = useState([]);

  let [selectedItem, setSelectedItem] = useState({});

  let admin = cookies.get("admin") || false;
  const fetchMyAPI = useCallback(async () => {
    let productsData = await axios.get("/api/products");
    if (productsData.data) {
      setProducts(productsData.data);
    }
  }, []);
  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);
  function clickItem(item) {
    setSelectedItem(item);
    history.push(`/productList/${item._id}`);
  }

  let card = (item) => (
    <div
      className="card card-1"
      onClick={() => {
        clickItem(item);
      }}
    >
      <div className="title">
        <p>
          {cookies.get("admin") ? <EditIcon /> : ""}
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
    <>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="search"
        label="Pesquisar"
        name="Pesquisar"
        autoFocus
        value={filterCriteria}
        onChange={(e) => {
          setFilterCriteria(e.target.value);
        }}
      />
      {products
        .filter((item) => {
          return [item.name, item.description, item.category].some((element) =>
            element.includes(filterCriteria)
          );
        })
        .map((item) => card(item))}
      {/* {card({
        image: "https://i.imgur.com/OTO1NV9.jpeg",
        name: "name",
        description:
          "description description description description description description description description description description description description ",
        price: "2",
      })} */}
    </>
  );
};

export default withCookies(ProductList);
