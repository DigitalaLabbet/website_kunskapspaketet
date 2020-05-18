import React from "react";

/* thired part packages */

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";


/* our components */
import "./styles/css/main.css";
import "./styles/css/home.css";
import "./styles/css/navbar.css";

import Main from './views/main';
import Home from "./views/home";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/hem" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
