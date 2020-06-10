import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import Authorization from "./pages/Authorization";
import Header from "./components/Header";
import Products from "./pages/Products";
import Product from "./pages/Product";

const App = () => {
    const [loggedUser, setLoggedUser] = useState(localStorage.getItem('loggedUser'));

    useEffect(() => {
        localStorage.setItem('loggedUser', loggedUser)
    }, [loggedUser])

    return (
        <Router>
            <Switch>
                {
                    loggedUser == null || loggedUser === ''
                        ? <Route path={'/'} component={() => <Authorization setLoggedUser={setLoggedUser} />} />
                        :
                        <>
                            <Header loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
                            <Route exact path={'/'} component={Home} />
                            <Route path={'/products/:type_id'} component={Products} />
                            <Route path={'/product/:id'} component={Product} />
                        </>
                }

            </Switch>
        </Router>
    )
}

export default App;
