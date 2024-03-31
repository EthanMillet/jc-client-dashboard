const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    dataPoints: [DataPoint]
  }

type DataPoint {
    _id: ID
    concept: String
    reference: [Reference]
}

type Reference {
  _id: ID
  reference: String
  scriptureLink: String
  quote: String
  conceptID: DataPoint
}

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    dataPoint(_id: ID!): DataPoint
    reference(_id: ID!): Reference
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDataPoint(concept: String): DataPoint
    addReference(reference: String!, scriptureLink: String!, quote: String!, conceptID: String!): Reference
    deleteDataPoint(id: ID!): DataPoint
    deleteReference(id: ID!): Reference
}
`

module.exports = typeDefs;