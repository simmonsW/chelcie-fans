const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Category {
    _id: ID
    name: String
  }

  type Print {
    _id: ID
    size: String
    price: Float
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    print: Print
    category: [Category]
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Customer {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
  }

  type Query {
    categories: [Category]
    prints: [Print]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    orders: [Order]
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addCustomer(firstName: String!, lastName: String!, email: String!): Customer
    addOrder(products: [ID]!): Order
    updateProduct(_id: ID!, quantity: Int!): Product
  }
`;

module.exports = typeDefs;