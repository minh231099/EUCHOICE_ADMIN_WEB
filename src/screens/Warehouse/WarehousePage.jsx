import { Button, Space, Switch } from 'antd';
import toJS from '../../hoc/ToJS';
import React, { useState } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ProTable from '@ant-design/pro-table';
import { changeWHActivation, getListWH } from './redux/action';
import select from '../../utils/select';
import toJSVarible from '../../utils/toJSVarible';
import { localeDate } from '../../utils/localeDate';
import AddWarehouses from './components/AddWarehouses';
import UpdateWarehouse from './components/UpdateWarehouse';
import DeleteWarehouse from './components/DeleteWarehouse';

export const WarehousePage = () => {
    const [refreshing, setRefreshing] = useState(undefined);
    const [visible, setVisible] = useState(false);
    const [visibleUpd, setVisibleUpd] = useState(false);
    const [visibleDlt, setVisibleDlt] = useState(false);
    const [dataRow, setDataRow] = useState(undefined);
    const openUpd = () => setVisibleUpd(true);
    const openDlt = () => setVisibleDlt(true);
    const onCloseUpd = () => setVisibleUpd(false);
    const onCloseDlt = () => setVisibleDlt(false);
    const onClose = () => setVisible(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const listWarehouse = toJSVarible(useSelector((state) => select(state, ['warehouseReducer'], 'listWarehouse')))
    const pagination = toJSVarible(useSelector((state) => select(state, ['warehouseReducer'], 'pagination')))
    const isFetching = toJSVarible(useSelector((state) => select(state, ['warehouseReducer'], 'isFetching')))

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
        dispatch(getListWH({ filter, options }));
        setRefreshing(null);
    };

    const columns = [
        {
            title: t('warehouseName'),
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: t('address'),
            key: 'address',
            dataIndex: 'address',
        },
        {
            title: t('city'),
            key: 'city',
            dataIndex: 'city',
        },
        {
            title: t('country'),
            key: 'country',
            dataIndex: 'country',
        },
        {
            title: t('manager'),
            key: 'manager',
            dataIndex: 'manager',
            render: (value) => {
                return value.email
            }
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
                    <Switch defaultChecked={!record.hide} onChange={() => { dispatch(changeWHActivation(record._id)) }} />
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
                            const temp = {
                                ...record,
                                manager: record?.manager?._id,
                            }
                            setDataRow(temp);
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
                dataSource={listWarehouse}
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
                        {t('addNewWarehouse')}
                    </Button>,
                ]}
            ></ProTable>
            <AddWarehouses visible={visible} onClose={onClose} setRefreshing={setRefreshing} />
            <UpdateWarehouse visible={visibleUpd} onClose={onCloseUpd} data={dataRow} />
            <DeleteWarehouse visible={visibleDlt} onClose={onCloseDlt} data={dataRow} />
        </div>
    )
};

export default toJS(WarehousePage);
