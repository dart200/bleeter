import {ThemeProvider} from './theme';
import {GQLProvider} from './gql/client';
import {LoginProvider} from './login';
import {BrowserRouter as Router} from 'react-router-dom';
import Main from './Main';

const App = () => {
  return (
    <ThemeProvider>
    <GQLProvider>
    <LoginProvider>
    <Router>
      <Main />
    </Router>
    </LoginProvider>
    </GQLProvider>
    </ThemeProvider>
  );
};

export default App;
