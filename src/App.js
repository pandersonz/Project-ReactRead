import React from "react";
import { Route, Switch } from "react-router-dom";
import FinderBook from "./FinderBooks";
import Shelf from './Shelf';
import "./App.css";

const App = () => (
  <Switch>
        <Route
            path="/search"
            component={FinderBook}
        />
        
        <Route
            path="/"
            component={Shelf}
        />
    </Switch>
)

export default App;
