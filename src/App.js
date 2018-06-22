import React from "react";
import { Route, Switch } from "react-router-dom";
import FinderBook from "./FinderBook";
import MyShelf from './Shelf';
import "./App.css";

const App = () => (
  <Switch>
        <Route
            path="/finder"
            component={FinderBook}
        />
        
        <Route
            path="/"
            component={MyShelf}
        />
    </Switch>
)

export default App;
