import React, { useState, useEffect, useCallback } from "react";
import { withCookies, useCookies } from "react-cookie";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Cookies from "universal-cookie";
import axios from "axios";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";

import "./ProductList.css";

const EditProduct = (props) => {
  const history = useHistory();
  const params = useParams();

  // yuo can find all params from here
  const cookies = new Cookies();
  let [product, setProduct] = useState({});

  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState("");
  let [category, setCategory] = useState("");
  let [stock, setStock] = useState(0);
  let [price, setPrice] = useState(0);

  const fetchMyAPI = useCallback(async () => {
    console.log(params);
    let productData = await axios.get(`/api/products/${params.productId}`);
    if (productData.data) {
      setProduct(productData.data);
    }
  }, []);
  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);
  useEffect(() => {
    console.log("product");
    console.log(product);

    setName(product.name || "");
    setDescription(product.description || "");
    setImage(product.image || "");
    setCategory(product.category || "");
    setStock(product.stock || 0);
    setPrice(product.price || 0);
  }, [product]);

  async function editItem() {
    let token = cookies.get("token") || "";
    try {
      let answer = await axios.patch(
        `/api/products/${params.productId}`,
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
    } catch (err) {
      /*TODO: por algum motivo dá erro 401 não autorizado mas se o token estiver correto ele salva
      toda autorização é conferida no backend, essa rota aparece se o cookie admin for true
      mas se o token não bater no backend não salva, o cookie no front end é por agilidade
      */

      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      sleep(100).then(() => {
        history.push("/productList");
        sleep(100).then(() => {
          window.location.reload();
        });
      });
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
      <Button fullWidth variant="contained" color="primary" onClick={editItem}>
        Editar
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

export default EditProduct;
