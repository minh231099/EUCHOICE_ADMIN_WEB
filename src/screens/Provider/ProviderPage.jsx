import React, { useState } from "react";
import ToJS from "../../hoc/ToJS";
import ProTable from "@ant-design/pro-table";
import { Button, Space, Switch } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { localeDate } from "../../utils/localeDate";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeProviderActivation, getListProvider } from "./redux/action";
import toJSVarible from "../../utils/toJSVarible";
import select from "../../utils/select";
import AddProvider from "./components/AddProvider";
import UpdateProvider from "./components/UpdateProvider";
import DeleteProvider from "./components/DeleteProvider";

export const ProviderPage = () => {
    const [refreshing, setRefreshing] = useState(undefined);
    const [visible, setVisible] = useState(false);
    const [visibleUpd, setVisibleUpd] = useState(false);
    const [visibleDlt, setVisibleDlt] = useState(false);
    const [dataRow, setDataRow] = useState(undefined);
    const onClose = () => setVisible(false);
    const openUpd = () => setVisibleUpd(true);
    const openDlt = () => setVisibleDlt(true);
    const onCloseUpd = () => setVisibleUpd(false);
    const onCloseDlt = () => setVisibleDlt(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const listProvider = toJSVarible(useSelector((state) => select(state, ['providerReducer'], 'listProvider')))
    const pagination = toJSVarible(useSelector((state) => select(state, ['providerReducer'], 'pagination')))
    const isFetching = toJSVarible(useSelector((state) => select(state, ['providerReducer'], 'isFetching')))

    const fiterListProvider = (params, sort) => {
        const options = {
            current: params.current,
            pageSize: params.pageSize,
            sortBy: sort,
        };
        const filter = {
            email: params?.email,
            role: params?.role,
        };
        dispatch(getListProvider({ filter, options }));
        setRefreshing(null);
    };

    const columns = [
        {
            title: t('providerName'),
            key: 'name',
            dataIndex: 'name',
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
                    <Switch defaultChecked={!record.hide} onChange={() => { dispatch(changeProviderActivation(record?._id)) }} />
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
                dataSource={listProvider}
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
                    fiterListProvider(params, sort, filter);
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
                        {t('addNewProvider')}
                    </Button>,
                ]}
            ></ProTable>
            <AddProvider visible={visible} onClose={onClose} setRefreshing={setRefreshing} />
            <UpdateProvider visible={visibleUpd} onClose={onCloseUpd} data={dataRow} />
            <DeleteProvider visible={visibleDlt} onClose={onCloseDlt} data={dataRow} />
        </div>
    )
}

export default ToJS(ProviderPage)