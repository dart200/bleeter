import express from "express";
import {ApolloServer} from 'apollo-server-express';
import {resolvers} from './gql/resolvers';
import {typeDefs} from './gql/schema';
import {PORT} from './config';

const main = async () => {
    const server = new ApolloServer({typeDefs, resolvers});
    const app = express();
    await server.start();
    server.applyMiddleware({app});

    app.get('/', (req, res) => {
        console.log("Apollo GraphQL Express server is ready");
        res.send('graphql on /graphql');
    });

    app.listen({port: PORT}, () => {
        console.log(`Server is running at http://localhost:8080${server.graphqlPath}`);
    });
};

main();
