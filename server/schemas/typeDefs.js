const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
  }

type DataPoint {
    _id: ID
    topic: String
    reference: String
    scriptureText: String
}

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    dataPoint(_id: ID!): DataPoint
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDataPoint(name: String!): DataPoint
    deleteDataPoint(id: ID!): DataPoint
}
`

module.exports = typeDefs;