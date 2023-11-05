import React, { useState } from "react";
import { Button, Input, Space, Switch, Typography } from "antd";
import ProTable from "@ant-design/pro-table";
import { AppstoreAddOutlined, CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Text } = Typography;


const CategoryTable = (props) => {
    const { data, loading, polling, requestFunc, onClickAddNew, onDelete, onUpdate, pagination } = props;

    const { t } = useTranslation();

    const [selectedRows, setSelectedRows] = useState([]);

    const [rowUpdating, setRowUpdating] = useState(null);
    const [rowNameUpdating, setRowNameUpdating] = useState(null);

    const onChangeNameUpdatingRow = (e) => {
        setRowNameUpdating(e.target.value);
    }

    const onCancelUpdatingRow = () => {
        setRowUpdating(null);
        setRowNameUpdating(null);
    }

    const columns = [
        {
            title: t('name'),
            dataIndex: 'name',
            ellipsis: true,
            render: (_, record) => {
                return (
                    <>
                        {
                            record._id === rowUpdating ?
                                <>
                                    <Input
                                        style={{ width: '60%' }}
                                        value={rowNameUpdating}
                                        onChange={onChangeNameUpdatingRow}
                                    />
                                    <Button
                                        style={{
                                            marginLeft: 10,
                                            marginRight: 5,
                                            background: '#2069b3',
                                            color: '#fff'
                                        }}
                                        icon={<CheckOutlined />}
                                        onClick={() => handleUpdate(record._id, { name: rowNameUpdating })}
                                    />
                                    <Button
                                        style={{
                                            background: '#eee',
                                            color: '#000'
                                        }}
                                        icon={<CloseOutlined />}
                                        onClick={onCancelUpdatingRow}
                                    />
                                </>
                                :
                                <Text>
                                    {record.name}
                                    {
                                        record._id === hoveredRow ?
                                            <EditOutlined
                                                onClick={() => { setRowUpdating(record._id); setRowNameUpdating(record.name) }}
                                                className="edit-button"
                                                style={{
                                                    marginLeft: 10,
                                                    fontSize: 18,
                                                    color: '#2069b3'
                                                }}
                                            />
                                            :
                                            null
                                    }
                                </Text>
                        }
                    </>
                )
            },
            key: 'name',
        },
        {
            title: t('numberOfProd'),
            dataIndex: 'numberOfProd',
            key: 'numberOfProd',
        },
        {
            title: t('on/off'),
            dataIndex: 'isOn',
            key: 'isOn',
            render: () => (
                <Space size="middle">
                    <Switch />
                </Space>
            )
        },
        {
            title: t('action'),
            key: 'action',
            hideInSearch: true,
            render: () => (
                <Space>
                    <a>Xem Chi Tiết</a>
                </Space>
            )
        }
    ];

    const rowSelection = {
        type: 'checkbox',
        onChange: (selectedRows) => {
            setSelectedRows(selectedRows)
        },
    };

    const handleDelete = () => {
        onDelete(selectedRows);
    }

    const handleUpdate = (id, payload) => {
        onUpdate(id, payload);
        onCancelUpdatingRow();
    }

    const [hoveredRow, setHoveredRow] = useState(null);

    const handleRowHover = (record) => {
        if (record) {
            setHoveredRow(record._id);
        } else {
            setHoveredRow(null);
        }
    };

    return (
        <ProTable
            loading={loading}
            columns={columns}
            dataSource={data}
            polling={polling}
            request={async (params, sort) => {
                requestFunc(params, sort);
            }}
            pagination={pagination}
            rowKey={'_id'}
            onRow={(record) => ({
                onMouseEnter: () => handleRowHover(record),
                onMouseLeave: () => handleRowHover(null),
            })}
            search={false}
            toolBarRender={() => [
                <Button
                    key="add"
                    icon={<AppstoreAddOutlined />}
                    type="primary"
                    onClick={() => onClickAddNew()}
                >
                    {t('addNewCategory')}
                </Button>,
            ]}
            tableAlertRender={(props) => {
                const { selectedRows } = props
                return (
                    <Text>
                        {`${t('selected')} ${selectedRows.length} ${selectedRows.length > 1 ? t('category') : t('categories')}`}
                    </Text>
                )
            }}
            tableAlertOptionRender={() => {
                return (
                    <Space size={16}>
                        <Button
                            key="deleteButton"
                            onClick={handleDelete}
                        >
                            Xóa
                        </Button>
                    </Space>
                );
            }}
            rowSelection={{
                ...rowSelection,
            }}
        />
    )
}

export default CategoryTable;