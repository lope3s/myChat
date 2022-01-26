import { gql } from "apollo-server";

const typeDefs = gql`
    scalar Date

    type User {
        imageUrl: String
        username: String
        id: String
    }

    type Info {
        count: Int
        pages: Int
        next: String
        prev: String
    }

    type SharedFields {
        name: String
        url: String
    }

    type Results {
        id: Int
        name: String
        status: String
        species: String
        type: String
        gender: String
        origin: SharedFields
        location: SharedFields
        image: String
        episode: [String]
        url: String
        created: Date
    }

    type PaginatedRMApiResult {
        info: Info
        results: [Results]
    }

    type Query {
        start: String
        getPaginatedCharactersData(page: Int!): PaginatedRMApiResult
        checkUserData(id: String!): User
    }

    type Mutation {
        registerUser(imageUrl: String!, username: String!): User
        updateUserImage(imageUrl: String!, username: String!): User
    }
`;

export default typeDefs;
