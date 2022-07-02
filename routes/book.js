const { json } = require("express");
const express = require("express");
const router = express.Router();
const jsonParser = express.json();
const books = [
  { id: 1, nome: "Sherlock Holmes" },
  { id: 2, nome: "Alice no pais das maravilhas" },
  { id: 3, nome: "Trono de vidro: o começo" },
];

router.get("/list", (req, res) => {
  res.send(JSON.stringify(books));
});
router.get("/list/:id", (req, res) => {
  let { id } = req.params;
  let state = false;
  for (let i = 0; i < books.length; i++) {
    if (i + 1 === parseInt(id)) {
      res.json(books[i]);
      state = true;
    }
  }
  if (state === false) {
    res.status(404).send("<h1>Livro não encontrado</h1>");
  }
});

router.post("/add", jsonParser, (req, res) => {
  let newInformationToAdd = { id: books.length + 1, nome: req.body.nome };
  books.push(newInformationToAdd);
  res.json({ msg: "Livro adicionado com sucesso" });
});

router.put("/update/:id", jsonParser, (req, res) => {
  let { id } = req.params;
  let information = req.body.nome;
  for (let i = 0; i < books.length; i++) {
    if (i + 1 === parseInt(id)) {
      books[i].nome = information;
    }
  }
  res.send({ msg: "Livro atualizado com sucesso" });
});

router.delete("/delete/:id", jsonParser, (req, res) => {
  let {id} = req.params;
  for (let i = 0; i < books.length; i++) {
    if (i + 1 === parseInt(id)) {
      books.splice(i, 1);
    }
  }
res.send(`Livro do id ${id} foi deletado`)
});

module.exports = router;
