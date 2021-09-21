import express from "express";
import {ApolloServer} from 'apollo-server-express';
import {resolvers} from './gql/resolvers';
import {typeDefs} from './gql/schema';
import {PORT, GQL_URI} from './config';

const corsOptions = {
  origin: "*",
};

const main = async () => {
  const server = new ApolloServer({typeDefs, resolvers});
  await server.start();
  
  const app = express();
  server.applyMiddleware({app, path: '/', cors: corsOptions});

  app.listen({port: PORT}, () => {
    console.log(`Server is running at ${GQL_URI}`);
  });
};

main()
  .catch(err => console.log(err));
