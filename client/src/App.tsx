import {ThemeProvider} from './theme';
import {GQLProvider} from './gql/client';
import {LoginProvider} from './login';
import Main from './Main';

const App = () => {
  return (
    <ThemeProvider>
    <GQLProvider>
    <LoginProvider>
      <Main />
    </LoginProvider>
    </GQLProvider>
    </ThemeProvider>
  );
};

export default App;
