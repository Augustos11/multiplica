import Register from "../views/register";
import Services from "../views/services";
import Product from "../views/product";
import {Navigation} from 'react-native-navigation';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
export function registerScreens(store) {
    Navigation.registerComponent(`Register`, () => (props) =>
        <Provider store={store}>
            <Register {...props} />
        </Provider>,
    () => Register);

    Navigation.registerComponent(`Services`, () => (props) =>
        <Provider store={store}>
            <Services {...props} />
        </Provider>,
    () => Services);

    Navigation.registerComponent(`Product`, () => (props) =>
        <Provider store={store}>
            <Product {...props} />
        </Provider>,
    () => Product);
}