import React from 'react';
import { Switch, Route, Link, BrowserRouter, Redirect } from 'react-router-dom';
import LayoutAdmin from 'components/LayoutAdmin';
import HeaderAdmin from 'components/HeaderAdmin';
import FooterAdmin from 'components/FooterAdmin';

import '../../content/vendor/bootstrap/css/bootstrap.min.css';
import '../../content/vendor/fontawesome-free/css/all.min.css';
import '../../content/css/sb-admin.css';
import '../../content/vendor/bootstrap/js/bootstrap.bundle.min.js'
import '../../content/vendor/jquery/jquery.min.js';

import $ from "jquery";


const LayoutSharedAdmin = ({ component: Component, ...rest }) => {
  let pathName = rest.location.pathname;
  return (
    <Route {...rest} render={matchProps => (
      <div>
        <HeaderAdmin />
        <div id="wrapper">
          <LayoutAdmin />
          <div id="content-wrapper">
            <div className="container-fluid">
              <Component {...matchProps} />
            </div>
            <FooterAdmin />
          </div>
        </div>
      </div>
      )}
    />
    )
}

export default LayoutSharedAdmin;
