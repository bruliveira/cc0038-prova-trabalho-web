const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const Food = require("./model/Food");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Conectado");
  })
  .catch((err) => {
    console.error("Erro de conexão:", err.message);
  });

function validarFoodId(foodId, res) {
  if (!mongoose.Types.ObjectId.isValid(foodId)) {
    res.status(400).json({ message: "Id de alimento inválido." });
    return false;
  }
  return true;
}
function serverError(err, res) {
  console.error("Erro:", err.message);
  res.status(500).json({ message: "Ocorreu um erro no servidor." });
}

app.get("/", (req, res) => {
  res.send("Foods!!");
});

// Listar todos os alimentos
app.get("/api/foods", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    serverError(err, res);
  }
});

// Buscar um alimento específico
app.get("/api/foods/:id", async (req, res) => {
  try {
    const foodId = req.params.id;
    const food = await Food.findById(foodId);
    if (!validarFoodId(foodId, res)) {
      return;
    }
    if (!food) {
      return res.status(404).json({ message: "Alimento não encontrado." });
    }
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar um novo alimento
app.post("/api/foods", async (req, res) => {
  try {
    const { name, category, quantity, expirationDate, price } = req.body;
    if (!name || !category || !quantity || !expirationDate || !price) {
      return res
        .status(400)
        .json({ message: "Por favor, preencha todos os campos obrigatórios." });
    }
    const newFood = new Food({
      name,
      category,
      quantity,
      expirationDate,
      price,
    });
    const savedFood = await newFood.save();
    //res.status(201).json(savedFood);
    res.json({ message: "Alimento foi criado com sucesso." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Atualizar um alimento existente
app.put("/api/foods/:id", async (req, res) => {
  try {
    const foodId = req.params.id;
    const { name, category, quantity, expirationDate, price } = req.body;
    let food = await Food.findById(foodId);
    if (!validarFoodId(foodId, res)) {
      return;
    }
    if (!food) {
      return res.status(404).json({ message: "Alimento não encontrado." });
    }
    if (name) food.name = name;
    if (category) food.category = category;
    if (quantity) food.quantity = quantity;
    if (expirationDate) food.expirationDate = expirationDate;
    if (price) food.price = price;

    const updatedFood = await food.save();
    // res.json(updatedFood);
    res.json({ message: "Alimento foi atualizado com sucesso." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Excluir um alimento
app.delete("/api/foods/:id", async (req, res) => {
  try {
    const foodId = req.params.id;

    if (!validarFoodId(foodId, res)) {
      return;
    }
    const removedFood = await Food.findByIdAndDelete(foodId);
    if (!removedFood) {
      return res.status(404).json({ message: "Alimento não encontrado." });
    }
    // res.json(removedFood);
    res.json({ message: "Alimento foi excluído com sucesso." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
