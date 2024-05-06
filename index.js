//  Desafio Dev Club:

// Crie uma aplicação que frá pedidos de hamburgueria

// Post /order: A rota receberá o pedido do cliente, o nome do cliente e o valor do pedido. Essa informações devem ser passadas dentro de um body da requisição e como essas informações o pedido será registrado da seguinte maneira: {"id": "xxxxxxx", "order":"X-Salada, 2 batatas grandes, 1 refri", "clientName":"Denis", "price":"44.50", "status":"Em preparo"}. o ID deve ser utilizado com o framework UUID v4 e assim que o pedido for criado, o status deve ser sempre "em praparação"

// Get /order: Rota que lista todos os pedidos já criados.

// Put /order/:id: Essa rota de alterar algum pedido que já foi criado anteriormente.

// Delete /order/:id: Essa rota deletará algum pedido desde que o mesmo seja digitado na requisição da rota.

// Get /order/:id: Essa rota retornará um pedido específico mediante ao id digitado nos parâmetros da requisição.

// Patch/order/:id: Essa rota receb o ID nos parâmetros e assim que ela for chamada, deve colocar o status do pedido de "Pronto"

const express = require("express");
const app = express();
app.use(express.json());
const orderList = [];
const uuid = require("uuid");

app.get("/order", (request, response) => {
  return response.json(orderList);
});

app.post("/order", (request, response) => {
  const { order, clientName, price, status } = request.body;

  const newOrders = { id: uuid.v4(), order, clientName, price, status };

  orderList.push(newOrders);

  return response.status(201).json({ newOrders });
});

app.put("/order/:id", (request, response) => {
  const { id } = request.params;
  const { order, clientName, price, status } = request.body;

  const updatedOrder = { id, order, clientName, price, status };

  const findOrderPosition = orderList.findIndex((orders) => orders.id === id);

  if (findOrderPosition < 0) {
    response.status(404).json({ message: "User not Found" });
  }

  orderList[findOrderPosition] = updatedOrder;

  return response.status(200).json(updatedOrder);
});

app.delete("/order/:id", (request, response) => {
  const { id } = request.params;

  const findOrderPosition = orderList.findIndex((orders) => orders.id === id);

  if (findOrderPosition < 0) {
    response.status(404).json({ message: "User not Found" });
  }

  orderList.splice(findOrderPosition, 1);

  return response.status(204).json(orderList);
});
app.listen(3000, () => {
  console.log("Server running in port 3000");
});
