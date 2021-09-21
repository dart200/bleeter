import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import {GQL_URI} from "./config";

const client = new ApolloClient({
  uri: GQL_URI,
  cache: new InMemoryCache(), 
});

const GQLProvider = ({children}) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default GQLProvider;
