import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import typeDefs from "./schemas";
import resolvers from "./resolvers";
import { createConnection, Connection } from "typeorm";

import { UserController, RickAndMortyAPI } from "./dataSources";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            userController: new UserController(),
            rickAndMortyAPI: new RickAndMortyAPI(),
        };
    },
});

server.listen().then(async ({ url }) => {
    try {
        console.log(`${url}`);
        await createConnection();
        console.log("db connected!");
    } catch (error) {
        console.log("error: ", error);
    }
});
