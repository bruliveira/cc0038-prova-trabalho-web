### Disciplina: Desenvolvimento WEB

### Atividade proposta
Esta atividade tem como propósito o desenvolvimento de habilidades na criação
de APIs RESTful, manipulação de dados em um banco de dados NoSQL e prática
com o framework Express. A atividade consiste na definição de uma API para
gerenciar informações sobre alimentos em um sistema de estoque. A API deve
incluir as seguintes rotas:


<details>
  <summary><b>Campos da Aplicação<b></summary>
  
  | Campo         | Descrição                |
  |---------------|--------------------------|
  | id            | ID único do alimento     |
  | name          | Nome do alimento         |
  | category      | Categoria do alimento    |
  | quantity      | Quantidade disponível    |
  | expirationDate| Data de validade         |
  | price         | Preço do alimento        |
</details>

### Rotas da aplicação
```javascript
router.GET("/")
router.GET("/api/foods")
router.GET("/api/foods/:id")
router.POST("/api/foods")
router.PUT("/api/foods/:id")
router.DELETE("/api/foods/:id")
```

### Detalhes sobre as rotas

| Função | Rota  | Metodo | Descrição |
|--------|--------|--------|--------|
| Listar todos os alimentos | /api/foods | GET | Retorna uma lista de todos os alimentos no banco de dados
| Buscar um alimento específico | /api/foods/:id | GET | Retorna os detalhes de um alimento com base no ID fornecido |
| Criar um novo alimento  | /api/foods | POST | Cria um novo alimento com base nos dados fornecidos |
| Atualizar um alimento existente| /api/foods/:id  | PUT |Atualiza os dados de um alimento existente com base no ID fornecido|
| Excluir um alimento |/api/foods/:id|DELETE|Remove um alimento com base no ID fornecido|


### Rodar o projeto

```javascript
npm i
```

```javascript
npm start
```