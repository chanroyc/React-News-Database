import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } 
                    from "react-router-dom";
import News         from "./News";
import About        from "./About";

class Header extends Component {
  render() {
    return  (
        <Router>
          <header>
            <h1><a href="/news">React News</a></h1>
            <ul>
              <li><Link to="/news">Home</Link></li>
              <li><Link to="/news/about">About</Link></li>
            </ul>
          </header>
  
          <br/>
  
          {/* Our router goes here */}
          <Switch> 
          <Route exact path="/news" component={News} />
          <Route path={'/news/about'} exact component={About} />
  
          </Switch>
      </Router>
    )
  }
}
export default Header;