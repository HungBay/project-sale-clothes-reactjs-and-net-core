import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectNavigation } from '../../../../containers/App/selectors';

Navigation.propTypes = {
  NAVIGATION: PropTypes.array,
};

function Navigation(props) {
  const { NAVIGATION } = props;

  return (
    <div className="left-sidebar">
      <h2>Danh mục</h2>
      <div className="panel-group category-products" id="accordian">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a
                data-toggle="collapse"
                data-parent="#accordian"
                href="#sportswear"
              >
                <span className="badge pull-right">
                  <i className="fa fa-plus" />
                </span>
                Thời trang nam
              </a>
            </h4>
          </div>
          <div id="sportswear" className="panel-collapse collapse">
            <div className="panel-body">
              <ul>
                {NAVIGATION.map(nav => {
                  if (nav.slug === 'men') {
                    return nav.name.map((res, index) => (
                      <li Key={index}>
                        <Link to={`/products/${res.id}/${res.slug}`}>
                          {res.name}
                        </Link>
                      </li>
                    ));
                  }
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" data-parent="#accordian" href="#mens">
                <span className="badge pull-right">
                  <i className="fa fa-plus" />
                </span>
                Thời trang nữ
              </a>
            </h4>
          </div>
          <div id="mens" className="panel-collapse collapse">
            <div className="panel-body">
              <ul>
                {NAVIGATION.map(nav => {
                  if (nav.slug === 'women') {
                    return nav.name.map((res, index) => (
                      <li Key={index}>
                        <Link to={`/products/${res.id}/${res.slug}`}>
                          {res.name}
                        </Link>
                      </li>
                    ));
                  }
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" data-parent="#accordian" href="#womens">
                <span className="badge pull-right">
                  <i className="fa fa-plus" />
                </span>
                Quần áo trẻ em
              </a>
            </h4>
          </div>
          <div id="womens" className="panel-collapse collapse">
            <div className="panel-body">
              <ul>
                <li>
                  <a href="#">Quần áo nữ</a>
                </li>
                <li>
                  <a href="#">Guess</a>
                </li>
                <li>
                  <a href="#">Valentino</a>
                </li>
                <li>
                  <a href="#">Dior</a>
                </li>
                <li>
                  <a href="#">Versace</a>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
        {NAVIGATION.map(nav => {
          if (nav.slug !== 'men' && nav.slug !== 'women' && nav.slug !== null) {
            return nav.name.map((res, index) => (
              <div className="panel panel-default" Key={index}>
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <a href={`/products/${res.id}/${res.slug}`}>{res.name}</a>
                  </h4>
                </div>
              </div>
            ));
          }
        })}
      </div>

      {/* <div className="brands_products">
        <h2>Brands</h2>
        <div className="brands-name">
          <ul className="nav nav-pills nav-stacked">
            <li>
              <a href="#">
                {' '}
                <span className="pull-right">(50)</span>Acne
              </a>
            </li>
            <li>
              <a href="#">
                {' '}
                <span className="pull-right">(56)</span>Grüne Erde
              </a>
            </li>
            <li>
              <a href="#">
                {' '}
                <span className="pull-right">(27)</span>Albiro
              </a>
            </li>
            <li>
              <a href="#">
                {' '}
                <span className="pull-right">(32)</span>Ronhill
              </a>
            </li>
            <li>
              <a href="#">
                {' '}
                <span className="pull-right">(5)</span>Oddmolly
              </a>
            </li>
            <li>
              <a href="#">
                {' '}
                <span className="pull-right">(9)</span>Boudestijn
              </a>
            </li>
            <li>
              <a href="#">
                {' '}
                <span className="pull-right">(4)</span>Rösch creative culture
              </a>
            </li>
          </ul>
        </div>
      </div> */}

      {/* <div className="price-range">
        <h2>Price Range</h2>
        <div className="well text-center">
          <input
            type="text"
            className="span2"
            value=""
            data-slider-min="0"
            data-slider-max="600"
            data-slider-step="5"
            data-slider-value="[250,450]"
            id="sl2"
          />
          <br />
          <b className="pull-left">$ 0</b> <b className="pull-right">$ 600</b>
        </div>
      </div>

      <div className="shipping text-center">
        <img src="images/home/shipping.jpg" alt="" />
      </div> */}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  NAVIGATION: makeSelectNavigation(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(Navigation);
