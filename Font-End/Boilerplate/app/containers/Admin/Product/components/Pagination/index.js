/* https://jasonwatmore.com/post/2017/03/14/react-pagination-example-with-logic-like-google */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './styles.css';
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalRecords: '',
      pageLimit: '',
      totalPages: '',
      currentPage: '',
      initialPage: '',
      pagesToShow: '',
    };
  }

  componentDidMount() {
    this.setState({
      totalRecords: this.props.totalRecords,
      pageLimit: this.props.pageLimit || 10,
      totalPages: Math.ceil(this.props.totalRecords / this.props.pageLimit),
      pagesToShow: this.props.pagesToShow || 5,
      currentPage: this.props.initialPage || 1,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      totalRecords: nextProps.totalRecords,
      pageLimit: nextProps.pageLimit || 10,
      totalPages: Math.ceil(nextProps.totalRecords / nextProps.pageLimit),
      pagesToShow: nextProps.pagesToShow || 5,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.totalRecords !== prevState.totalRecords ||
      this.state.pageLimit !== prevState.pageLimit
    ) {
      this.setPage(this.state.currentPage);
    }
  }

  setPage(page) {
    var { totalRecords, pageLimit, totalPages } = this.state;

    if (page < 1) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }

    this.setState({
      currentPage: page,
    });

    var startIndex = (page - 1) * pageLimit;
    var endIndex = Math.min(startIndex + pageLimit - 1, totalRecords - 1);

    this.props.onChangePage({
      pageLimit,
      totalPages,
      page,
      startIndex,
      endIndex,
    });
  }

  getPager() {
    var { pagesToShow, currentPage, totalPages } = this.state;
    var pages = [],
      startFromNumber;

    if (totalPages <= pagesToShow) {
      startFromNumber = 1;
      pagesToShow = totalPages;
    } else {
      if (currentPage <= Math.ceil(pagesToShow / 2)) {
        startFromNumber = 1;
      } else if (
        currentPage + Math.floor((pagesToShow - 1) / 2) >=
        totalPages
      ) {
        startFromNumber = totalPages - (pagesToShow - 1);
      } else {
        startFromNumber = currentPage - Math.floor(pagesToShow / 2);
      }
    }

    for (let i = 1; i <= pagesToShow; i++) {
      pages.push(startFromNumber++);
    }

    return {
      currentPage,
      totalPages,
      pages,
    };
  }

  render() {
    var pager = this.getPager();
    // console.log(this.state);
    if (!this.state.totalRecords || this.state.totalPages === 1) return null;

    return (
      <ul className="pagination">
        <li>
          <button
            type="button"
            disabled={pager.currentPage === 1 ? true : false}
            onClick={() => this.setPage(1)}
            className="btn"
          >
            Đầu
          </button>
        </li>
        <li>
          <button
            type="button"
            disabled={pager.currentPage === 1 ? true : false}
            onClick={() => this.setPage(pager.currentPage - 1)}
            className="btn"
          >
            Sau
          </button>
        </li>
        {pager.pages.map((page, index) => (
          <li key={index}>
            <button
              type="button"
              className={pager.currentPage === page ? 'active btn' : 'btn'}
              onClick={() => this.setPage(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            disabled={pager.currentPage === pager.totalPages ? true : false}
            onClick={() => this.setPage(pager.currentPage + 1)}
            className="btn"
          >
            Tiếp
          </button>
        </li>
        <li>
          <button
            type="button"
            disabled={pager.currentPage === pager.totalPages ? true : false}
            onClick={() => this.setPage(pager.totalPages)}
            className="btn"
          >
            Cuối
          </button>
        </li>
      </ul>
    );
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  initialPage: PropTypes.number,
  pagesToShow: PropTypes.number,
  onChangePage: PropTypes.func,
};

export default Pagination;
