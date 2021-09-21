import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import {GQL_URI} from "../config";

const client = new ApolloClient({
  uri: GQL_URI,
  cache: new InMemoryCache(), 
});

export const GQLProvider = ({children}) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);
