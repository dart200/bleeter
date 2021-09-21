
import {ThemeProvider} from './Theme';
import {GQLProvider} from './gql/client';
import {LoginProvider} from './Login';
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
