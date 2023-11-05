import React from "react";
import { useTranslation } from "react-i18next";

import ProTable from "@ant-design/pro-table";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined, MedicineBoxOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { generateKey } from "../../../utils/lib";

const ProductTable = (props) => {
    const { t } = useTranslation();

    const { data, loading, polling, requestFunc, pagination, onClickAddNew, onClickEdit, onClickDelete, onClickFlash } = props;

    const productData = data.map(product => {
        const newProd = {
            ...product,
            category: product.category.name,
            warehouse: product.warehouse.name,
            image: product.image[0],
        };
        return newProd;
    });

    const columns = [
        {
            title: t('name'),
            dataIndex: 'name',
            ellipsis: true,
            key: 'name',
        },
        {
            title: t('category'),
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: t('prodClass'),
            key: 'prodClass',
            hideInSearch: true,
            render: (_, record) => {
                const { type } = record;
                return (
                    <>
                        {
                            type.map((prodClass) => {
                                const { group1, group2 } = prodClass;
                                return (
                                    group1 ?
                                        <div key={generateKey()} className="prod-class-list-data">
                                            {`${group1 ? group1 : ''} ${group2 ? `, ${group2}` : ''}`}
                                        </div> : null
                                )
                            }
                            )
                        }
                    </>
                )
            }
        },
        {
            title: t('price'),
            ellipsis: true,
            key: 'price',
            hideInSearch: true,
            sorter: true,
            render: (_, record) => {
                const { type } = record;
                return (
                    <>
                        {
                            type.map((prodClass) => {
                                return (
                                    <div key={generateKey()} className="prod-class-list-data">
                                        {prodClass.price ? prodClass.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : ''}
                                    </div>
                                )
                            }
                            )
                        }
                    </>
                )
            }
        },
        {
            title: t('quantity'),
            ellipsis: true,
            key: 'amount',
            hideInSearch: true,
            sorter: true,
            render: (_, record) => {
                const { type } = record;
                return (
                    <>
                        {
                            type.map((prodClass) => {
                                return (
                                    <div key={generateKey()} className="prod-class-list-data">
                                        {prodClass.amount ? prodClass.amount : ''}
                                    </div>
                                )
                            }
                            )
                        }
                    </>
                )
            }
        },
        {
            title: t('sold'),
            dataIndex: 'totalSold',
            key: 'totalSold',
            hideInSearch: true,
            sorter: true,
        },
        {
            title: t('return'),
            dataIndex: 'return',
            key: 'return',
            hideInSearch: true,
            sorter: true,
        },
        {
            title: t('warehouse'),
            key: 'warehouse',
            dataIndex: 'warehouse'
        },
        {
            title: t('action'),
            key: 'action',
            hideInSearch: true,
            render: (_, record) => {
                return (
                    <>
                        <EditOutlined
                            style={{
                                marginLeft: 0,
                                fontSize: 20,
                                alignSelf: 'center',
                                color: '#2069b3',
                            }}
                            title="Edit Item"
                            onClick={() => onClickEditProduct(record._id)}
                        />
                        <ThunderboltOutlined
                            style={{
                                marginLeft: 15,
                                fontSize: 20,
                                alignSelf: 'center',
                                color: '#2069b3',
                            }}
                            title="Flash Sale"
                            onClick={() => onClickFlash(record)}
                        />
                        <DeleteOutlined
                            style={{
                                marginLeft: 15,
                                fontSize: 20,
                                alignSelf: 'center',
                                color: '#2069b3',
                            }}
                            title="Delete Item"
                            onClick={() => onClickDeleteProduct(record._id)}
                        />
                    </>
                )
            }
        }
    ];

    const onClickDeleteProduct = (productId) => {
        onClickDelete(productId);
    }

    const onClickEditProduct = (productId) => {
        onClickEdit(productId);
    }

    return (
        <ProTable
            loading={loading}
            columns={columns}
            dataSource={productData}
            polling={polling}
            request={async (params, sort) => {
                requestFunc(params, sort);
            }}
            rowKey={'_id'}
            pagination={{ ...pagination, showSizeChanger: true }}
            toolBarRender={() => [
                <Button
                    key="add"
                    icon={<MedicineBoxOutlined />}
                    type="primary"
                    onClick={() => onClickAddNew()}
                >
                    {t('addNewProduct')}
                </Button>,
            ]}
        />
    )
}

export default ProductTable;