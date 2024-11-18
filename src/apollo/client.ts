import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://mdfafm3f5bbnbl5mcyojrsvjwy.appsync-api.ap-northeast-1.amazonaws.com/graphql', // AppSyncのエンドポイント
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-api-key': 'YOUR_API_KEY', // 認証方式に応じて変更（例: API_KEY）
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
