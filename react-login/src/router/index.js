import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../views/Dashboard';
import About from '../views/About';
import Navbar from '../components/Navbar';
import Login from '../views/auth/Login';
import Register from '../views/auth/Register';
import Guest from '../middleware/Guest';
import Authenticated from '../middleware/Authenticated';

function Router() {
    return (
        <BrowserRouter>
            <Navbar/>
            <div className="py-4">
                <Switch>
                    <Route exact path="/">
                        <Authenticated>
                            <Dashboard/>
                        </Authenticated>
                    </Route>

                    <Route path="/login">
                        <Guest>
                            <Login/>
                        </Guest>
                    </Route>

                    <Route path="/register">
                        <Guest>
                            <Register/>
                        </Guest>
                    </Route>

                    <Authenticated>
                        <About/>
                    </Authenticated>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default Router;