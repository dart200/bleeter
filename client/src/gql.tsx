import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import {SERVER_URL} from "./config";

const client = new ApolloClient({
  uri: SERVER_URL,
  cache: new InMemoryCache()
});

const GQLProvider = ({children}) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default GQLProvider;
