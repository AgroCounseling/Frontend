import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const App = () => {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path={'/'}>
                    Hello World
                </Route>

            </Switch>
        </Router>
    </div>
  )
}

export default App;
