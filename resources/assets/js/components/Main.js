import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./Home";
import Orders from "./Orders";
import Order from "./Order";

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/list' component={Orders} />
            <Route exact path='/order' component={Order} />
            <Route path='/order/:id' component={Order} />
        </Switch>
    </main>
);

export default Main;