import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { ItemsProvider } from "./components/ItemsContext";
import { PageProvider } from "./components/PageContext";

ReactDOM.render(
  <React.StrictMode>
    <ItemsProvider>
      <PageProvider>
        <App />
      </PageProvider>
    </ItemsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
