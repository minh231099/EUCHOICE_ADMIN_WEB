import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';

import select from '../../utils/select';
import toJs from '../../hoc/ToJS';

import { cancelListOrders, changeOrderStatusToPacking, changeOrderStatusToShipping, getListOrder } from './redux/action';
import OrderTable from './components/OrderTable';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';
import exportListInvoicePDF from '../../utils/exportInvoice';

const CategoryScreen = (props) => {
    const {
        orders,
        isFetching,
        getListOrder,
        changeStatus,
        chageOrderStatusToShipping,
        changeOrderStatusToPacking,
        cancelStatus,
        cancelListOrders,
    } = props;
    const [refreshing, setRefreshing] = useState(undefined);
    const [listOrders, setListOrders] = useState([]);

    const { t } = useTranslation();

    useEffect(() => {
        setListOrders(JSON.parse(JSON.stringify(orders)));
    }, [JSON.stringify(orders)]);

    useEffect(() => {
        if (changeStatus === 'success') {
            setRefreshing(true);
        }
    }, [changeStatus]);

    const showNotifi = (message, type) => {
        notification.open({
            message: message,
            type: type,
        })
    }

    useMemo(() => {
        if (cancelStatus === 'success') {
            showNotifi(t('cancleOrderSuccess'), 'success');
            setRefreshing(true);
        }
        else if (cancelStatus === 'fail') {
            showNotifi('Cancel Fail', 'error');
        }
    }, [cancelStatus]);

    const filterListOrder = (params, sort) => {
        const filter = {
            name: params?.name
        };

        const options = {
            current: params.current,
            pageSize: params.pageSize,
            sortBy: sort,
        };

        getListOrder({ filter, options });
        setRefreshing(null);
    }

    const onChageOrderStatusToShipping = (id) => {
        chageOrderStatusToShipping(id);
    }

    const onChangeOrderStatusToPacking = (id) => {
        changeOrderStatusToPacking(id);
    }

    const onDeleteOrder = (listId) => {
        cancelListOrders(listId);
    }

    const printInvoice = (listRecord) => {
        const tmp = listRecord.filter(record => record.status != 'packing' && record.status != 'shipping');
        if (tmp.length === 0)
            exportListInvoicePDF(listRecord);
        return;
    }

    return (
        <div>
            <OrderTable
                data={listOrders}
                loading={isFetching}
                polling={refreshing}
                requestFunc={filterListOrder}
                chageOrderStatusToShipping={onChageOrderStatusToShipping}
                onDelete={onDeleteOrder}
                changeOrderStatusToPacking={onChangeOrderStatusToPacking}
                printInvoice={printInvoice}
            />
        </div>
    );
};

function mapStateToProps(state) {
    return {
        orders: select(state, 'orderReducer', 'orders'),
        isFetching: select(state, 'orderReducer', 'isFetching'),
        changeStatus: select(state, 'orderReducer', 'changeStatus'),
        cancelStatus: select(state, 'orderReducer', 'cancelStatus'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getListOrder: (params) => dispatch(getListOrder(params)),
        chageOrderStatusToShipping: (id) => dispatch(changeOrderStatusToShipping(id)),
        cancelListOrders: (listId) => dispatch(cancelListOrders(listId)),
        changeOrderStatusToPacking: (id) => dispatch(changeOrderStatusToPacking(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(toJs(CategoryScreen));