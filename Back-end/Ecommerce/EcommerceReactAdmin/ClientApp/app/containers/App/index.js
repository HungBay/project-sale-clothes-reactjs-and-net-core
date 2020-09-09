

/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import GlobalStyle from '../../global-styles';
import $ from "jquery";

import Login from 'containers/Admin/Login/Loadable';
import SizePage from 'containers/Admin/SizePage/Loadable';
import AddSize from 'containers/Admin/SizePage/Action/addSize';
import UpdateSize from 'containers/Admin/SizePage/Action/updateSize';

import LayoutSharedAdmin from './LayoutSharedAdmin';
export default function App() {
  //var token = JSON.parse(window.localStorage.getItem("login"));
  return (
    <div>
      <Helmet
        titleTemplate="%s"
        defaultTitle="Bán quần áo"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Switch>
        <Route path="/Admin/Login" component={Login} />
        <LayoutSharedAdmin path="/Admin/Size" component={SizePage} />
        <LayoutSharedAdmin path="/Admin/Size-Add" component={AddSize} />
        <LayoutSharedAdmin path="/Admin/Size-Update" component={UpdateSize} />
      </Switch>      
      <GlobalStyle />
    </div>
  );
}
