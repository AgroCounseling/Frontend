import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

const App = () => {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path={'/'}>
                        Agrariev
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
