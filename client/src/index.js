import React from "react";
import ReactDOM from "react-dom";
import App from "./components/Sample/App";
import RefreshApp from "./components/Impure/AppRefresh";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Pure from "../src/components/pure/pure";
import TBL from "../src/components/tbl/tbl.js";
import Medium from "../src/components/Medium/medium";
import Tech from "../src/components/tech/a";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/tech" component={Tech} />
      <Route path="/med" component={Medium} />
      <Route path="/tbl" component={TBL} />
      <Route path="/pure" component={Pure} />
      <Route path="/impure" component={RefreshApp} />
      <Route path="/" component={TBL} />
    </Switch>
  </BrowserRouter>,

  document.querySelector("#root")
);
