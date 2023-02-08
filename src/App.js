import Routes from "./routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "styled-components";
import { StyledEngineProvider } from "@mui/material";

import theme, { GlobalStyler } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyler />
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <Routes />
        </Provider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
