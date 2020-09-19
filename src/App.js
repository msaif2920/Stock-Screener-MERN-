import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Filter from "./components/filter.component";
import ReturnedComapnies from "./components/returnedComapnies.component";
import detailedComponent from "./components/detailed.component";

function App() {
  return (
    <Router>
      <Switch>
        <div className="container">
          <Navbar />
          <Route path="/" exact component={Filter} />
          <Route path="/returnedCompanies" component={ReturnedComapnies} />
          <Route path="/companyDetails" component={detailedComponent} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
