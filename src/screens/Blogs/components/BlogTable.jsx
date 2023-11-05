import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import ProTable from "@ant-design/pro-table";
import { Button, Space, Switch } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { convertToDateTime } from "../../../utils/lib";

const BlogTable = (props) => {
    const {
        data,
        loading,
        polling,
        pagination,
        requestFunc,
        toolBarRender,
        onClickViewDetails,
        onDeleteBlog,
        onChangeHideBlog,
    } = props;
    const { t } = useTranslation();

    const columns = [
        {
            title: t('title'),
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: t('createdAt'),
            key: 'createdAt',
            hideInSearch: true,
            render: (_, record) => (
                <span>{convertToDateTime(record.createdAt)}</span>
            )
        },
        {
            title: t('updatedAt'),
            key: 'updatedAt',
            hideInSearch: true,
            render: (_, record) => (
                <span>{convertToDateTime(record.updatedAt)}</span>
            )
        },
        {
            title: t('hide'),
            key: 'hide',
            hideInSearch: true,
            render: (_, record) => (
                <Space size="middle">
                    <Switch
                        defaultChecked={record.hide}
                        onChange={() => {
                            onChangeHideBlog(record._id, !record.hide);
                            record.hide = !record.hide;
                        }}
                    />
                </Space>
            )
        },
        {
            title: t('action'),
            key: 'action',
            hideInSearch: true,
            render: (_, record) => (
                <Space>
                    <Button
                        style={{ border: 0, background: 'transparent' }}
                        icon={
                            <SearchOutlined
                                style={{
                                    color: '#2069b3',
                                    marginLeft: 0,
                                    fontSize: 20,
                                    alignSelf: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => { onClickViewDetails(record._id) }}
                            />
                        }
                    />
                    <Button
                        style={{ border: 0, background: 'transparent' }}
                        icon={
                            <DeleteOutlined
                                style={{
                                    color: '#2069b3',
                                    marginLeft: 0,
                                    fontSize: 20,
                                    alignSelf: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => { onDeleteBlog(record._id) }}
                            />
                        }
                    />
                </Space>
            )
        }
    ]

    return (
        <ProTable
            loading={loading}
            dataSource={data}
            columns={columns}
            polling={polling}
            pagination={pagination}
            rowKey="_id"
            request={async (params, sort) => {
                requestFunc(params, sort);
            }}
            toolBarRender={toolBarRender}
        />
    )
}

export default BlogTable;