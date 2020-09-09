import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Navigation from './Navigation';
import Slider from './Slider';
import './Styles/css/main.css';
import './Styles/css/price-range.css';
import './Styles/css/responsive.css';
const $ = require('jquery');
window.$ = $;
window.jQuery = $;
require('bootstrap/dist/js/bootstrap.min');

Main.propTypes = {};

function Main(props) {
  const { children } = props;
  return (
    <div>
      <Header />
      <Slider />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <Navigation />
            </div>
            {children}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Main;
