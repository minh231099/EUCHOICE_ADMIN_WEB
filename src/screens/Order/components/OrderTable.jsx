import React, { useState } from "react";
import ProTable from "@ant-design/pro-table";
import { Button, Popover, Space, Tag, Tooltip } from 'antd';
import { useTranslation } from "react-i18next";
import { generateKey } from '../../../utils/lib';
import {
    SendOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';

import { PiPackage } from "react-icons/pi";
import { AiOutlinePrinter } from 'react-icons/ai';

const baseUrl = process.env.REACT_APP_BASE_URL;

const colorMap = {
    new: {
        color: 'default',
        icon: <ClockCircleOutlined />,
    },
    packing: {
        color: 'purple',
        icon: <PiPackage style={{ fontSize: 16, marginRight: 5 }} />,
    },
    shipping: {
        color: 'processing',
        icon: <SyncOutlined spin />,
    },
    cancel: {
        color: 'error',
        icon: <CloseCircleOutlined />,
    },
    done: {
        color: 'success',
        icon: <CheckCircleOutlined />,
    },
}

const OrderTable = (props) => {
    const { data, loading, polling, requestFunc, pagination, chageOrderStatusToShipping, onDelete, changeOrderStatusToPacking, printInvoice } = props;

    const [selectedRows, setSelectedRows] = useState([]);
    const rowSelection = {
        type: 'checkbox',
        onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows)
        },
    };
    const { t } = useTranslation();

    const isHasOneCannotRenderInvoice = () => {
        const tmp = selectedRows.filter(record => record.status != 'packing' && record.status != 'shipping');
        return tmp.length > 0;
    }


    const onClickChangeStatusToPacking = (order) => {
        order.status = 'packing';
        changeOrderStatusToPacking(order._id);
    }

    const onClickChangeStatusToShipping = (order) => {
        order.status = 'shipping';
        chageOrderStatusToShipping(order._id);
    }

    const columns = [
        {
            title: t('orderId'),
            key: 'orderId',
            dataIndex: 'orderId'
        },
        {
            title: t('warehouse'),
            key: 'warehouse',
            render: (_, record) => {
                const { warehouse } = record;
                return `${warehouse.name} - ${warehouse.address}, ${warehouse.city}, ${warehouse.country}`;
            }
        },
        {
            title: t('price'),
            key: 'price',
            dataIndex: 'price'
        },
        {
            title: t('status'),
            key: 'status',
            dataIndex: 'status',
            render: (text) => {
                return (
                    <Tag
                        color={colorMap[text].color}
                        icon={colorMap[text].icon}
                        style={{ display: "flex", width: 'fit-content', alignItems: 'center' }}
                    >
                        <span style={{ fontSize: 14 }}>{t(`lower${text}`)}</span>
                    </Tag>
                );
            }
        },
        {
            title: t('paymentStatus'),
            key: 'paid',
            dataIndex: 'paid',
            render: (value) => {
                return (
                    <Tag
                        color={value ? 'green' : undefined}
                        style={{ display: "flex", width: 'fit-content', alignItems: 'center' }}
                    >
                        <span style={{ fontWeight: 700 }}>{value ? t('paid') : t('unpaid')}</span>
                    </Tag>
                );
            }
        },
        {
            title: '',
            key: 'printInvoice',
            render: (_, record) => {
                return (
                    <a className={`Mic5QMQpUW ${record.status != 'packing' && record.status != 'shipping' ? 'disable' : ''}`} onClick={() => { printInvoice([record]) }}>
                        <Tooltip
                            title={<span dangerouslySetInnerHTML={{ __html: t('printInvoiceDisableTooltip') }}></span>}
                            overlayClassName={`${record.status != 'packing' && record.status != 'shipping' ? '' : 'display-none'}`}
                        >
                            <div className="XTYSPYSFZ0"><AiOutlinePrinter className="pOPcZNbZdV" />{t('printInvoice')}</div>
                        </Tooltip>
                    </a>
                )
            }
        },
        {
            title: t('action'),
            key: 'action',
            render: (_, record) => {
                return (
                    <>
                        <Popover content={<span>{t('changeToPacking')}</span>}>
                            <Button
                                style={{ border: 0, background: 'transparent' }}
                                icon={
                                    <PiPackage
                                        style={{
                                            marginLeft: 0,
                                            fontSize: 20,
                                            alignSelf: 'center',
                                            color: record.status == 'new' ? '#2069b3' : '#ccc',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => { onClickChangeStatusToPacking(record) }}
                                    />
                                }
                                disabled={record.status !== 'new'}
                            />
                        </Popover>
                        <Popover content={<span>{t('changeToShipping')}</span>}>
                            <Button
                                style={{ border: 0, background: 'transparent' }}
                                icon={
                                    <SendOutlined
                                        style={{
                                            marginLeft: 0,
                                            fontSize: 20,
                                            alignSelf: 'center',
                                            color: record.status == 'packing' ? '#2069b3' : '#ccc',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => { onClickChangeStatusToShipping(record) }}
                                    />
                                }
                                disabled={record.status === 'cancel'}
                            />
                        </Popover>
                    </>
                )
            }
        },
    ];

    const handleDelete = () => {
        onDelete(selectedRows.map(value => value._id));
    }

    const RenderExpansionRow = (cart) => {
        return <div className="n3efxUfcgl">
            <div>
                <div className="order-details-card">
                    <div className="order-details-card-cell header-cell">
                        {t('name')}
                    </div>
                    <div className="order-details-card-cell header-cell">
                        <span>
                            {t('prodClass')}
                        </span>
                    </div>
                    <div className="order-details-card-cell header-cell">
                        <span>
                            {t('unitPrice')}
                        </span>
                    </div>
                    <div className="order-details-card-cell header-cell">
                        <span>
                            {t('amount')}
                        </span>
                    </div>
                    <div className="order-details-card-cell header-cell">
                        <span>
                            {t('totalPrice')}
                        </span>
                    </div>
                </div>
            </div>
            {
                cart.map((prodInfo) => {
                    const { product, type, amount } = prodInfo;
                    return <div key={generateKey()} className="order-details-card">
                        <div className="order-details-card-cell header-cell">
                            <img
                                width={100}
                                height={100}
                                src={`${baseUrl}image/${product.image[0]}`}
                            />
                            <span className="order-details-card-cell-name">
                                {product.name}
                            </span>
                        </div>
                        <div className="order-details-card-cell">
                            <span>
                                {`${type.group1 ? type.group1 : ''} ${type.group2 ? ` - ${type.group2}` : ''}`}
                            </span>
                        </div>
                        <div className="order-details-card-cell">
                            <span>
                                {type.price}
                            </span>
                        </div>
                        <div className="order-details-card-cell">
                            <span>
                                {amount}
                            </span>
                        </div>
                        <div className="order-details-card-cell">
                            <span>
                                {type.price * amount}
                            </span>
                        </div>
                    </div>
                })
            }
        </div>
    }

    const handlePrintListInvoice = () => {
        printInvoice(selectedRows);
    }

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
            search={false}
            expandable={{
                expandedRowRender: (record) => RenderExpansionRow(record.cart),
            }}
            tableAlertOptionRender={() => {
                return (
                    <Space size={16}>
                        <a
                            className={`Mic5QMQpUW ${isHasOneCannotRenderInvoice() ? 'disable' : ''}`}
                            onClick={handlePrintListInvoice}
                        >
                            <Tooltip
                                title={<span dangerouslySetInnerHTML={{ __html: t('printInvoiceDisableTooltip') }}></span>}
                                overlayClassName={`${isHasOneCannotRenderInvoice() ? '' : 'display-none'}`}
                            >
                                <div className="XTYSPYSFZ0"><AiOutlinePrinter className="pOPcZNbZdV" />{t('printInvoice')}</div>
                            </Tooltip>
                        </a>
                        <Button
                            key="deleteButton"
                            onClick={handleDelete}
                        >
                            {t('cancelOrder')}
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

export default OrderTable;