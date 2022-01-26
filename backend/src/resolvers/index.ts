import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    serialize(value: any) {
        return value;
    },
    parseValue(value: any) {
        return new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10));
        }
        return null;
    },
});

const resolvers = {
    Date: dateScalar,
    Query: {
        start: () => "olá mundo",
        getPaginatedCharactersData: async (
            _: any,
            page: any,
            { dataSources }: any
        ) => {
            const data =
                await dataSources.rickAndMortyAPI.getPaginatedCharactersData(
                    page.page
                );
            return data;
        },
        checkUserData: async (_: any, id: any, { dataSources }: any) => {
            const data = await dataSources.userController.getUser(id.id);
            return data;
        },
    },
    Mutation: {
        registerUser: async (_: any, userObject: any, { dataSources }: any) => {
            const data = await dataSources.userController.registerUser(
                userObject
            );
            return data;
        },
        updateUserImage: async (
            _: any,
            userObject: any,
            { dataSources }: any
        ) => {
            const data = await dataSources.userController.updateUserImage(
                userObject.username,
                userObject.imageUrl
            );
            return data;
        },
    },
};

export default resolvers;
