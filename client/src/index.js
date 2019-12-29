import React from "react";
import ReactDOM from "react-dom";
import App from "./components/Sample/App";
import RefreshApp from "./components/Impure/AppRefresh";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Pure from "../src/components/pure/pure";
import TBL from "../src/components/tbl/tbl.js";
import Medium from "../src/components/Medium/medium";
import Tech from "../src/components/tech/a";
import Pointed from '../src/components/pointed/pointed';
import SampleImage1 from "../assets/sample1.jpg";
import Periodic from './components/periodic/periodic';
import YouTube from './components/youtube/youtube';
import TotalDarkTest from './components/totalDarkTest/tdt';
import Earth from './components/earth/earth';
import Combined from './components/combined/combine';
import CSSRenderer from './components/cssRenderer/css';
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
    <Route path="/css" component={CSSRenderer}/> 
    <Route path="/combined" component={Combined}/> 
    <Route path="/earth" component={Earth}/> 
      <Route path="/tdt" component={TotalDarkTest}/> 
      <Route path="/youtube" component={YouTube}/>
      <Route path ="/periodic" component={Periodic}/>
      <Route path="/point" component={()=><Pointed image={SampleImage1} />}/>
      <Route path="/tech" component={Tech} />
      <Route path="/med" component={Medium} />
      <Route path="/tbl" component={TBL} />
      <Route path="/pure" component={Pure} />
      <Route path="/impure" component={RefreshApp} />
      <Route path="/" component={CSSRenderer} />
    </Switch>
  </BrowserRouter>,

  document.querySelector("#root")
);
