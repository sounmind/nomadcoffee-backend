import { gql } from "apollo-server-core";

export default gql`
  type coffee {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updateAt: String!
  }
  type Query {
    coffees: [coffee]
    coffee(id: Int!): coffee
  }
  type Mutation {
    createcoffee(title: String!, year: Int!, genre: String): coffee
    deletecoffee(id: Int!): coffee
    updatecoffee(id: Int!, year: Int!): coffee
  }
`;
