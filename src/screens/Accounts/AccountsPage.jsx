import toJS from '../../hoc/ToJS';
import React, { useState } from 'react';
import toJSVarible from '../../utils/toJSVarible';
import { useDispatch, useSelector } from 'react-redux';
import select from '../../utils/select';
import { changeActivation, getListAcc } from './redux/action';
import { localeDate } from '../../utils/localeDate';
import { Button, Space, Switch } from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import AddAccounts from './components/AddAccounts';
import UpdateAccounts from './components/UpdateAccounts';
import ProTable from '@ant-design/pro-table';
import DeleteAccounts from './components/DeleteAccounts';
import { useTranslation } from 'react-i18next';

export const AccountsPage = () => {
    const [refreshing, setRefreshing] = useState(undefined);
    const [visible, setVisible] = useState(false);
    const [visibleUpd, setVisibleUpd] = useState(false);
    const [visibleDlt, setVisibleDlt] = useState(false);
    const [dataRow, setDataRow] = useState(undefined);
    const openUpd = () => setVisibleUpd(true);
    const openDlt = () => setVisibleDlt(true);
    const onCloseUpd = () => setVisibleUpd(false);
    const onCloseDlt = () => setVisibleDlt(false);
    const dispatch = useDispatch();
    const onClose = () => setVisible(false);
    const { t } = useTranslation();

    const listAccounts = toJSVarible(useSelector((state) => select(state, ['accountsReducer'], 'listAccounts')))
    const pagination = toJSVarible(useSelector((state) => select(state, ['accountsReducer'], 'pagination')))
    const isFetching = toJSVarible(useSelector((state) => select(state, ['accountsReducer'], 'isFetching')))

    const filterListAcc = (params, sort) => {
        const options = {
            current: params.current,
            pageSize: params.pageSize,
            sortBy: sort,
        };
        const filter = {
            email: params?.email,
            role: params?.role,
        };
        dispatch(getListAcc({ filter, options }));
        setRefreshing(null);
    };

    const columns = [
        {
            title: t('email'),
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: t('role'),
            key: 'role',
            dataIndex: 'role',
        },
        {
            title: t('createdAt'),
            key: 'createdAt',
            hideInSearch: true,
            align: 'center',
            sorter: true,
            render: (_, record) => {
                return localeDate(record.createdAt);
            },
        },
        {
            title: t('updatedAt'),
            key: 'updatedAt',
            align: 'center',
            hideInSearch: true,
            sorter: true,
            render: (_, record) => {
                return localeDate(record.updatedAt);
            },
        },
        {
            title: t('Active/Inactive'),
            key: 'activation',
            hideInSearch: true,
            // width: 120,
            align: 'center',
            render: (_value, record) => (
                <Space>
                    <Switch defaultChecked={!record.hide} onChange={() => { dispatch(changeActivation(record._id)) }} />
                </Space>
            ),
        },
        {
            title: t('action'),
            key: 'action',
            hideInSearch: true,
            // width: 100,
            align: 'center',
            render: (_value, record) => (
                <Space>
                    <EditOutlined
                        onClick={() => {
                            openUpd();
                            setDataRow(record);
                        }}
                        style={{
                            marginLeft: 10,
                            fontSize: 20,
                            alignSelf: 'center',
                            color: '#2069b3',
                        }}
                    />
                    <DeleteOutlined
                        style={{
                            marginLeft: 10,
                            fontSize: 20,
                            alignSelf: 'center',
                            color: '#2069b3',
                        }}
                        onClick={() => {
                            openDlt();
                            setDataRow(record);
                        }}
                    />
                </Space>
            ),
        },
    ]
    return (
        <div>
            <ProTable
                loading={isFetching}
                columns={columns}
                polling={refreshing}
                dataSource={listAccounts}
                sticky={{
                    offsetHeader: 50,
                }}
                scroll={{ x: 1500 }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                }}
                search={false}
                request={async (params, sort, filter) => {
                    filterListAcc(params, sort, filter);
                }}
                pagination={{
                    ...pagination,
                    showSizeChanger: true,
                }}
                dateFormatter="string"
                rowKey={'_id'}
                toolBarRender={() => [
                    <Button
                        key="add"
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => setVisible(true)}
                    >
                        {t('addNewAccount')}
                    </Button>,
                ]}
            ></ProTable>
            <AddAccounts visible={visible} onClose={onClose} setRefreshing={setRefreshing} />
            <UpdateAccounts visible={visibleUpd} onClose={onCloseUpd} data={dataRow} />
            <DeleteAccounts visible={visibleDlt} onClose={onCloseDlt} data={dataRow} />
        </div >
    );
};

export default toJS(AccountsPage);
