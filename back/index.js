const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema");

const app = express();
app.use(cors());

const users = [
  {
    id: 1,
    username: "Ajax",
    age: "4500",
    posts: {
      content: "First info",
    },
  },
];

const resolver = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id === +id);
  },
  createUser: ({ input }) => {
    id = Date.now();
    const user = {
      id,
      ...input,
    };
    users.push(user);
    return users;
  },
  deleteUser: ({ id }) => {
    users.forEach((user, i) => {
      if (user.id == id) {
        users.splice(i, 1);
        return users;
      }
      return users;
    });
  },
  updateUser: ({ input }) => {
    const { id, username, age } = input;
    users.forEach((user, i) => {
      if (user.id == id) {
        const replacedData = {
          ...user,
          username: username,
          age: age,
        };
        users.splice(i, 1, { ...replacedData });
        return users;
      }
      return users;
    });
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: resolver,
  })
);

app.listen(5000, () => console.log("server run on 5000"));
