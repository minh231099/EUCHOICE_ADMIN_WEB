import React, { Component, Fragment } from 'react';
import LoadingIndicator from '../../components/LoadingIndicator';

const WithLoadingHOC = (WrappedComponent) =>
  class LoadingHOC extends Component {
    render() {
      const { isFetching } = this.props;
      return (
        <Fragment>
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              padding: '10px 0',
              display: isFetching ? null : 'none',
            }}
          >
            <LoadingIndicator />
          </div>
          <div>
            {/* <div style={{ display: isFetching ? 'none' : null }}> */}
            <WrappedComponent {...this.props} />
          </div>
        </Fragment>
      );
    }
  };
export default WithLoadingHOC;