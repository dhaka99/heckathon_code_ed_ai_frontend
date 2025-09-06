import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import theme from "./theme/theme.ts";
import { persistor, store } from "./store/index.ts";
import AlertSnackbar from "./common/molecules/Alerts/index.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CssBaseline />
          <AlertSnackbar />
          <App />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
  // </StrictMode>,
);
