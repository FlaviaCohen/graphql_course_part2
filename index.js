const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    featureSet: GroupFeatureFields
    hasCar(id: ID!): Boolean!
    cars(skip: Int!, take: Int!): [Car!]!
    name: String!
    image: Image!
    description: String!
  }

  type Image {
    id: ID!
    url: String!
  }

  type GroupFeatureSet {
    features: [GroupFeatures!]!
    applyFeaturesSeparately: Boolean!
  }

  type GroupFeatures {
    feature: GroupFeatureFields!
  }

  enum GroupFeatureFields {
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLINDER_ENGINE
    RED_PAINT
    BLACK_PAINT
  }

  type Mutation {
    groupDelete(groupId: ID!): GroupDeletePayload!
    groupPublish(groupId: ID!): GroupPublishPayload!
    groupUnpublish(groupId: ID!): GroupUnpublishPayload!
    groupAddCars(groupId: ID!, carId: ID!): GroupAddCarsPayload!
    groupRemoveCars(groupId: ID!, carId: ID!): GroupRemoveCarsPayload!
    groupCreate(groupInput: GroupInput!): GroupCreatePayload!
    groupUpdate(groupId: ID!, groupInput: GroupInput!): GroupUpdatePayload!
  }

  type GroupDeletePayload {
    userErrors: [UserErrors]!
    group: Group
  }

  type GroupPublishPayload {
    userErrors: [UserErrors]!
    group: Group
  }

  type GroupUnpublishPayload {
    userErrors: [UserErrors]!
    group: Group
  }

  type GroupAddCarsPayload {
    userErrors: [UserErrors]!
    group: Group
  }

  type GroupRemoveCarsPayload {
    userErrors: [UserErrors]!
    group: Group
  }

  type GroupCreatePayload {
    userErrors: [UserErrors]!
    group: Group
  }

  type GroupUpdatePayload {
    userErrors: [UserErrors]!
    group: Group
  }

  type UserErrors {
    message: String!
    field: [String!]!
  }

  input GroupInput {
    name: String
    image: ImageInput
    description: String
    featureSet: GroupFeatureFields
  }

  input ImageInput {
    url: String!
  }
`;
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: "blue", make: "Toyota" }],
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
