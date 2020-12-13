import React from "react";
import Camps from "./camps/camps";
import Spaces from "./spaces/spaces";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";

const App = () => (
	<Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/camps">Camps</Link>
            </li>
            <li>
              <Link to="/spaces">Spaces</Link>
            </li>
            {/*<li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>*/}
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/camps">
            <Camps />
          </Route>
          <Route path="/spaces">
            <Spaces />
          </Route>
          {/*<Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
		</Route>*/}
        </Switch>
      </div>
    </Router>
);

export default App;
