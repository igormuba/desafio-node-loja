import React from "react";
import { withCookies, useCookies } from "react-cookie";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import "./ProductList.css";

const ProductList = () => {
  let card = (item) => (
    <div class="card card-1">
      <div class="title">
        <p>
          {item.name.length > 20
            ? item.name.substring(0, 20) + "..."
            : item.name}
        </p>
      </div>
      <div class="top">
        <img src={item.image} />
      </div>
      <div class="bottom">
        <div class="desc">
          <p>
            {item.description.length > 60
              ? item.description.substring(0, 60) + "..."
              : item.description}
          </p>
        </div>
      </div>
      <div>
        <p class="card-text">R$: {parseFloat(item.price).toFixed(2)}</p>
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
      {card({
        image: "https://i.imgur.com/OTO1NV9.jpeg",
        name: "name",
        description:
          "description description description description description description description description description description description description ",
        price: "2",
      })}
    </Container>
  );
};

export default withCookies(ProductList);
