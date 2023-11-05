import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ROUTER from '../../routes';
import toJSHooks from '../../utils/toJSHooks';
import ToJS from '../ToJS';
import select from '../../utils/select';
import { getFilterListCategory, getFilterListWarehouse, getFilterListAccount, getFilterListProvider } from '../../screens/Auth/redux/action';

const disabledStyle = {
  pointerEvents: 'none',
  opacity: 0.4,
};

const WithAuthorizationHOC = (WrappedComponent) => {
  class Authorization extends Component {
    constructor(props) {
      super(props);
      this.state = {
        visible: true,
        disabled: false,
        redirect: false,
      };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      const {
        getFilterListCategory,
        listFilterCategory,
        isFetching,
        getFilterListWarehouse,
        listFilterWarehouse,
        getListFilterCategoryError,
        getListFilterWarehouseError,
        getFilterListAccount,
        listFilterAccount,
        getListFilterAccountError,
        listFilterProvider,
        getListFilterProviderError,
        getListFilterProvider,
      } = nextProps;

      if (!isFetching && !listFilterCategory && !getListFilterCategoryError) {
        getFilterListCategory();
      }
      if (!isFetching && !listFilterWarehouse && !getListFilterWarehouseError) {
        getFilterListWarehouse();
      }
      if (!isFetching && !listFilterAccount && !getListFilterAccountError) {
        getFilterListAccount();
      }
      if (!isFetching && !listFilterProvider && !getListFilterProviderError) {
        getListFilterProvider();
      }
      return prevState;
    }

    render() {
      const { visible, disabled, redirect } = this.state;
      if (redirect) {
        return <Navigate to={ROUTER.NOT_FOUND} />;
      }
      if (visible) {
        if (typeof WrappedComponent === 'object') {
          return (
            <div style={disabled ? disabledStyle : null}>
              {WrappedComponent}
            </div>
          );
        }
        return (
          <div style={disabled ? disabledStyle : null}>
            <WrappedComponent {...this.props} />
          </div>
        );
      }
      return null;
    }
  }

  const mapStateToProps = (state) =>
    toJSHooks({
      listFilterCategory: select(state, 'authReducer', 'listFilterCategory'),
      listFilterAccount: select(state, 'authReducer', 'listFilterAccount'),
      listFilterWarehouse: select(state, 'authReducer', 'listFilterWarehouse'),
      isFetching: select(state, 'authReducer', 'isFetching'),
      getListFilterCategoryError: select(state, 'authReducer', 'getListFilterCategoryError'),
      getListFilterWarehouseError: select(state, 'authReducer', 'getListFilterWarehouseError'),
      getListFilterAccountError: select(state, 'authReducer', 'getListFilterAccountError'),
      getListFilterProviderError: select(state, 'authReducer', 'getListFilterProviderError'),
      listFilterProvider: select(state, 'authReducer', 'listFilterProvider'),
    });

  function mapDispatchToProps(dispatch) {
    return {
      getFilterListCategory() {
        dispatch(getFilterListCategory())
      },
      getFilterListWarehouse() {
        dispatch(getFilterListWarehouse())
      },
      getFilterListAccount() {
        dispatch(getFilterListAccount())
      },
      getListFilterProvider() {
        dispatch(getFilterListProvider())
      },
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(ToJS(Authorization));
};

export default WithAuthorizationHOC;
