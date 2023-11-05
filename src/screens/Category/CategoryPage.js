import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';

import select from '../../utils/select';
import toJs from '../../hoc/ToJS';

import { addNewCategory, deleteListCategories, getListCategory, updateCategory } from './redux/action';

import CategoryTable from './components/CategoryTable';
import AddNewCategoryModal from './components/AddNewCategoryModal';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';

const convertMessageToTranslatorKey = (val) => {
    const kym = {
        'Name is exist!': 'nameisexist',
    }

    return kym[val];
}

const CategoryScreen = (props) => {
    const { categories, pagination, isFetching, getListCategory, addNewCategory, addNewStatus, errorMessage, updateCategory, updateStatus, deleteListCategories, deleteStatus } = props
    const [refreshing, setRefreshing] = useState(undefined);
    const [addNewModalVisible, setAddNewModalVisible] = useState(false);

    const { t } = useTranslation();

    const showNotifi = (message, type) => {
        notification.open({
            message: message,
            type: type,
        })
    }

    useMemo(() => {
        if (addNewStatus === 'success') {
            showNotifi(t('addnewcategorysuccess'), 'success');
            setAddNewModalVisible(false);
            setRefreshing(true);
        }
        else if (addNewStatus === 'fail') {
            showNotifi(t(convertMessageToTranslatorKey(errorMessage)), 'error');
        }
    }, [addNewStatus]);

    useMemo(() => {
        if (updateStatus === 'success') {
            showNotifi(t('updatenewcategorysuccess'), 'success');
            setRefreshing(true);
        }
        else if (updateStatus === 'fail') {
            showNotifi(t(convertMessageToTranslatorKey(errorMessage)), 'error');
        }
    }, [updateStatus]);

    useMemo(() => {
        if (deleteStatus === 'success') {
            showNotifi(t('deletesucess'), 'success');
            setRefreshing(true);
        }
        else if (deleteStatus === 'fail') {
            showNotifi(t(convertMessageToTranslatorKey(errorMessage)), 'error');
        }
    }, [deleteStatus]);

    const filterListCategory = (params, sort) => {
        const filter = {
            name: params?.name
        };

        const options = {
            current: params.current,
            pageSize: params.pageSize,
            sortBy: sort,
        };

        getListCategory({ filter, options });
        setRefreshing(null);
    }

    const onClickAddNewCategory = () => {
        setAddNewModalVisible(true);
    }

    const onSubmitAddNew = (newCategory) => {
        addNewCategory(newCategory);
    }

    const onCancelAddNew = () => {
        setAddNewModalVisible(false);
    }

    const onDeleteCategory = (listId) => {
        deleteListCategories(listId);
    }

    const onUpdateCategory = (id, payload) => {
        updateCategory(id, payload);
    }

    return (
        <div>
            <CategoryTable
                data={categories}
                loading={isFetching}
                polling={refreshing}
                pagination={pagination}
                requestFunc={filterListCategory}
                onClickAddNew={onClickAddNewCategory}
                onDelete={onDeleteCategory}
                onUpdate={onUpdateCategory}
            />
            <AddNewCategoryModal
                visible={addNewModalVisible}
                onOk={onSubmitAddNew}
                onCancel={onCancelAddNew}
            />
        </div>
    );
};

function mapStateToProps(state) {
    return {
        categories: select(state, 'categoryReducer', 'categories'),
        error: select(state, 'categoryReducer', 'error'),
        isFetching: select(state, 'categoryReducer', 'isFetching'),
        pagination: select(state, 'categoryReducer', 'pagination'),
        errorAddNew: select(state, 'categoryReducer', 'isFetching'),
        errorMessage: select(state, 'categoryReducer', 'errorMessage'),
        addNewStatus: select(state, 'categoryReducer', 'addNewStatus'),
        updateStatus: select(state, 'categoryReducer', 'updateStatus'),
        deleteStatus: select(state, 'categoryReducer', 'deleteStatus'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getListCategory: (paramrs) => dispatch(getListCategory(paramrs)),
        addNewCategory: (payload) => dispatch(addNewCategory(payload)),
        updateCategory: (id, payload) => dispatch(updateCategory(id, payload)),
        deleteListCategories: (payload) => dispatch(deleteListCategories(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(toJs(CategoryScreen));