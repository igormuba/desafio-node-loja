import React, { useState } from "react";
import { withCookies, useCookies } from "react-cookie";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Cookies from "universal-cookie";
import axios from "axios";
import { useHistory } from "react-router";

import "./ProductList.css";

const AddProduct = () => {
  const history = useHistory();

  const cookies = new Cookies();

  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState("");
  let [category, setCategory] = useState("");
  let [stock, setStock] = useState(0);
  let [price, setPrice] = useState(0);

  async function addItem() {
    let token = cookies.get("token") || "";
    try {
      let answer = await axios.post(
        "/api/products",
        {
          name,
          description,
          image,
          category,
          stock,
          price,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      history.push("/productList");
      window.location.reload();
    } catch (err) {
      /*TODO: por algum motivo dá erro 401 não autorizado mas se o token estiver correto ele salva
      toda autorização é conferida no backend, essa rota aparece se o cookie admin for true
      mas se o token não bater no backend não salva, o cookie no front end é por agilidade
      */
      console.log(err);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Nome"
        name="Nome"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="description"
        label="Descrição"
        name="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="image"
        label="Imagem"
        name="Imagem"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="category"
        label="Categoria"
        name="Categoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="stock"
        label="Estoque"
        name="Estoque"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="price"
        label="Preço"
        name="Preço"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Button fullWidth variant="contained" color="primary" onClick={addItem}>
        Adicionar
      </Button>
      <div className="card card-1">
        <div className="title">
          <p>{name > 20 ? name.substring(0, 20) + "..." : name}</p>
        </div>
        <div className="top">
          <img src={image} />
        </div>
        <div className="bottom">
          <div className="desc">
            <p>
              {description.length > 60
                ? description.substring(0, 60) + "..."
                : description}
            </p>
          </div>
        </div>
        <div>
          <p className="card-text">R$: {parseFloat(price).toFixed(2)}</p>
        </div>
      </div>
    </Container>
  );
};

export default AddProduct;
