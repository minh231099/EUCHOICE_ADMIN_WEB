import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import LoadingIndicator from '../../components/LoadingIndicator';

import ROUTER from '../../routes';
import actionContainer from '../../utils/actionContainer.js';
import select from '../../utils/select';
import ToJS from '../ToJS';
import cookiesTransaction from '../../helpers/cookiesTransaction';

import cookiesVariables from '../../constants/cookiesVariables';

const { getCookie } = cookiesTransaction;
const { cktoken } = cookiesVariables;

const { getUserInfoByToken } = actionContainer;

export default function withAuthentication(needAuthenticated) {
  return function withAuthenticationWrappedComponent(WrappedComponent) {
    class Authentication extends Component {
      constructor(props) {
        super(props);
        this.state = {};
      }

      static getDerivedStateFromProps(nextProps) {
        const jwToken = getCookie(cktoken);
        if (jwToken && !nextProps.isGetInfoFetching && (!nextProps.userInfo || nextProps.newLogin)) nextProps.getUserInfoByToken();

        return null;
      }

      render() {
        const { isAuthenticated, isFetching, error, isVerify } = this.props;
        const jwToken = getCookie(cktoken);

        if (!isVerify && isAuthenticated) {
          return <Navigate to={ROUTER.AUTH.CHANGE_PASSWORD} />;
        }
        if (!needAuthenticated) {
          return <WrappedComponent {...this.props} />;
        }
        if (!isFetching && !isAuthenticated && error) {
          return <Navigate to={ROUTER.LOGIN} />;
        }
        if (isAuthenticated) {
          return (
            <div>
              <WrappedComponent {...this.props} />
            </div>
          );
        }
        if (isFetching || localStorage.getItem('jwt')) {
          return (
            <div
              style={{
                height: '100vh',
                width: '100%',
                display: 'grid',
                placeContent: 'center',
              }}
            >
              <LoadingIndicator />
            </div>
          );
        }
        if (!jwToken || jwToken == '') return <Navigate to={ROUTER.LOGIN} />;
      }
    }

    function mapStateToProps(state) {
      return {
        isAuthenticated: select(state, 'authReducer', 'isAuthenticated'),
        isFetching: select(state, 'authReducer', 'isFetching'),
        error: select(state, 'authReducer', 'error'),
        isVerify: select(state, 'authReducer', 'isVerify'),
        isGetInfoFetching: select(state, 'authReducer', 'isGetInfoFetching'),
        userInfo: select(state, 'authReducer', 'userInfo'),
        newLogin: select(state, 'authReducer', 'newLogin'),
      };
    }

    function mapDispatchToProps(dispatch) {
      return {
        getUserInfoByToken: () => {
          dispatch(getUserInfoByToken());
        }
      };
    }

    Authentication.propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
    };

    return connect(mapStateToProps, mapDispatchToProps)(ToJS(Authentication));
  };
}
