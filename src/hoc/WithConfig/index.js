import React, { Component } from 'react';
import { connect } from 'react-redux';
import actionContainer from '../../utils/actionContainer';

const { setPage } = actionContainer;

const WithConfigHOC = (pageName, title) => (WrappedComponent) => {
  class Page extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      this.props.setPage({ pageName, title: title || pageName });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = () => ({});

  const mapDispatchToProps = (dispatch) => ({
    setPage: (currentPage) => dispatch(setPage(currentPage)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Page);
};

export default WithConfigHOC;