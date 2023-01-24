import Routes from "./routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "styled-components";

import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
