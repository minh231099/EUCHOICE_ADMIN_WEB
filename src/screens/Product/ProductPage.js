import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductTable from './components/ProductTable';
import { deleteProduct, getListProducts } from './redux/action';
import ToJS from '../../hoc/ToJS';
import { connect } from 'react-redux';
import select from '../../utils/select';
import DeleteModal from './components/DeleteModal';
import { useTranslation } from 'react-i18next';
import { message, notification } from 'antd';
import CreateFlashSale from './components/CreateFlashSale';

const ProductPage = (props) => {
    const navigate = useNavigate();

    const { products, isFetching, getListProduct, pagination, deleteProduct, deleteStatus, successFS, messageFS, addUpdFSError } = props
    const [refreshing, setRefreshing] = useState(undefined);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showFlashSale, setShowFlashSale] = useState(false);
    const [selectId, setSelectId] = useState(undefined);
    const [submiting, setSubmiting] = useState(false);
    const [dataFS, setDataFS] = useState(false);
    const { t } = useTranslation();
    const onCloseFlash = () => setShowFlashSale(false);

    useMemo(() => {
        if (deleteStatus === 'success' && submiting) {
            notification.open({
                message: t('deleteProdSuccess'),
                type: 'success',
            });
            setSubmiting(false);
        } else if (deleteStatus === 'fail' && submiting) {
            notification.open({
                message: t('deleteProdFail'),
                type: 'error',
            });
            setSubmiting(false);
        }
    }, [deleteStatus]);

    useEffect(() => {
        if (successFS) {
            setRefreshing(1000);
            onCloseFlash();
            message.success(messageFS)
        }
        if (addUpdFSError) {
            message.error('Add/Update FlashSale Error!')
        }
    }, [successFS, addUpdFSError])

    const filterListProduct = (params, sort) => {
        const filter = {
            name: params.name
        };

        const options = {
            current: params.current,
            pageSize: params.pageSize,
            sortBy: sort,
        };
        getListProduct({ filter, options });
        setRefreshing(undefined);
    }

    const onClickAddNew = () => {
        navigate('/product/new');
    }

    const onClickEdit = (id) => {
        navigate(`/product/${id}`);
    }

    const onClickDelete = (id) => {
        setShowModalDelete(true);
        setSelectId(id);
    }

    const onClickFlash = (values) => {
        setShowFlashSale(true);
        setDataFS(values)
    }

    const onConfirmDelete = () => {
        deleteProduct(selectId);
        setSelectId(undefined);
        setShowModalDelete(false);
        setRefreshing(true);
        setSubmiting(true);
    }

    return (
        <>
            <ProductTable
                data={products}
                loading={isFetching}
                polling={refreshing}
                requestFunc={filterListProduct}
                pagination={pagination}
                onClickAddNew={onClickAddNew}
                onClickEdit={onClickEdit}
                onClickDelete={onClickDelete}
                onClickFlash={onClickFlash}
            />
            <DeleteModal
                visible={showModalDelete}
                onCancel={() => setShowModalDelete(false)}
                onConfirm={onConfirmDelete}
            />
            <CreateFlashSale
                visible={showFlashSale}
                onClose={onCloseFlash}
                data={dataFS}
            />
        </>
    )
}

function mapStateToProps(state) {
    return {
        products: select(state, 'productReducer', 'products'),
        error: select(state, 'productReducer', 'error'),
        isFetching: select(state, 'productReducer', 'isFetching'),
        pagination: select(state, 'productReducer', 'pagination'),
        deleteStatus: select(state, 'productReducer', 'deleteStatus'),
        successFS: select(state, 'productReducer', 'successFS'),
        addUpdFSError: select(state, 'productReducer', 'addUpdFSError'),
        messageFS: select(state, 'productReducer', 'messageFS'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getListProduct: (params) => dispatch(getListProducts(params)),
        deleteProduct: (id) => dispatch(deleteProduct(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToJS(ProductPage));