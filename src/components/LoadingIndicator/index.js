import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

const LoadingIndicator = ({ style }) => (
  <Spin
    size="large"
    spinning
    tip="Loading..."
    style={{ maxHeight: '100%', textAlign: 'center', ...style }}
  />
);

LoadingIndicator.propTypes = {
  style: PropTypes.instanceOf(Object),
};

LoadingIndicator.defaultProps = {
  style: {},
};

export default LoadingIndicator;