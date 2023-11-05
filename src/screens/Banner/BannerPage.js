import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, MenuOutlined, PlusOutlined, RotateLeftOutlined, RotateRightOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Image, Space, Switch, Tabs, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import ToJS from '../../hoc/ToJS';
import { localeDate } from '../../utils/localeDate';
import { changeBannerActivation, getListBanner, setShowBanner, updateOrderBanner } from './redux/action';
import { useDispatch } from 'react-redux';
import select from '../../utils/select';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import AddBanner from './components/AddBanner';
import DeleteBanner from './components/DeleteBanner';
import UpdateBanner from './components/UpdateBanner';

const baseUrl = process.env.REACT_APP_BASE_URL;

const Row = ({ children, ...props }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props['data-row-key'],
    });
    const style = {
        ...props.style,
        transform: CSS.Transform.toString(
            transform && {
                ...transform,
                scaleY: 1,
            },
        ),
        transition,
        ...(isDragging
            ? {
                position: 'relative',
                zIndex: 9999,
            }
            : {}),
    };
    return (
        <tr {...props} ref={setNodeRef} style={style} {...attributes}>
            {React.Children.map(children, (child) => {
                if (child.key === 'sort') {
                    return React.cloneElement(child, {
                        children: (
                            <MenuOutlined
                                ref={setActivatorNodeRef}
                                style={{
                                    touchAction: 'none',
                                    cursor: 'move',
                                }}
                                {...listeners}
                            />
                        ),
                    });
                }
                return child;
            })}
        </tr>
    );
};
const BannerPage = (props) => {
    const { listBanner, isFetching, pagination } = props
    const { t } = useTranslation();
    const [refreshing, setRefreshing] = useState(undefined);
    const [dataSource, setDataSource] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visibleDlt, setVisibleDlt] = useState(false);
    const [visibleUpd, setVisibleUpd] = useState(false);
    const [dataRow, setDataRow] = useState(undefined);
    const openDlt = () => setVisibleDlt(true);
    const onCloseDlt = () => setVisibleDlt(false);
    const onClose = () => setVisible(false);
    const openUpd = () => setVisibleUpd(true);
    const onCloseUpd = () => setVisibleUpd(false);

    const dispatch = useDispatch();

    const filterListBanner = (params, sort, isTop) => {
        const options = {
            current: params.current,
            pageSize: params.pageSize,
            sortBy: sort,
        };
        const filter = {
            name: params?.name,
        };
        dispatch(getListBanner({ filter, options }, isTop));
        setRefreshing(null);
    };

    useEffect(() => {
        setDataSource(listBanner)
    }, [listBanner])

    const onChange = (e) => {
        const options = {};
        const filter = {};
        if (e == 1) {
            dispatch(getListBanner({ filter, options }, true));
        }
        if (e == 2) {
            dispatch(getListBanner({ filter, options }, false));
        }
    }

    const columns = [
        {
            key: 'sort',
            align: 'center',
            render: () => {
                return <MenuOutlined
                    style={{
                        touchAction: 'none',
                        cursor: 'move',
                    }}
                />
            }
        },
        {
            title: t('nameBanner'),
            dataIndex: 'name',
        },
        {
            title: t('imageBanner'),
            key: 'image',
            hideInSearch: true,
            // width: 120,
            align: 'center',
            render: (_value) => {
                return (
                    <Image
                        width={100}
                        src={`${baseUrl}image/${_value.image}`}
                        preview={{
                            toolbarRender: (
                                _,
                                {
                                    transform: { scale },
                                    actions: { onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                                },
                            ) => (
                                <Space size={12} className="toolbar-wrapper">
                                    <RotateLeftOutlined onClick={onRotateLeft} />
                                    <RotateRightOutlined onClick={onRotateRight} />
                                    <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                                    <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                                </Space>
                            ),
                        }}
                    />
                )
            }
        },
        {
            title: t('alwaysShow'),
            dataIndex: 'always',
            hideInSearch: true,
            // width: 120,
            align: 'center',
            render: (_value, record) => (
                <Space>
                    <Switch defaultChecked={record.always} onChange={() => { dispatch(setShowBanner(record._id)) }} />
                </Space>
            ),
        },
        {
            title: t('expiredBanner'),
            key: 'expired',
            hideInSearch: true,
            align: 'center',
            render: (_, record) => {
                return localeDate(record.expired);
            },
        },
        {
            title: t('statusBanner'),
            key: 'status',
            hideInSearch: true,
            align: 'center',
            render: (_, record) => {
                let date1 = new Date();
                let date2 = new Date(record.expired);
                if (date1 < date2)
                    return <Tag style={{ width: '100px' }} color={'green'} icon={<CheckCircleOutlined />}><span style={{ fontSize: 14 }}>{t(`stillValidStatusBanner`)}</span></Tag>
                else
                    return <Tag style={{ width: '100px' }} color={'red'} icon={<CloseCircleOutlined />}><span style={{ fontSize: 14 }}>{t(`expiredStatusdBanner`)}</span></Tag>
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
                    <Switch defaultChecked={!record.hide} onChange={() => { dispatch(changeBannerActivation(record._id)) }} />
                </Space>
            ),
        },
        {
            title: t('createdAt'),
            key: 'createdAt',
            hideInSearch: true,
            align: 'center',
            render: (_, record) => {
                return localeDate(record.createdAt);
            },
        },
        {
            title: t('updatedAt'),
            key: 'updatedAt',
            align: 'center',
            hideInSearch: true,
            render: (_, record) => {
                return localeDate(record.updatedAt);
            },
        },
        {
            title: t('action'),
            key: 'action',
            hideInSearch: true,
            // width: 100,
            align: 'center',
            render: (_, record) => (
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
    ];

    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setDataSource((previous) => {
                const activeIndex = previous.findIndex((i) => i.key === active.id);
                const overIndex = previous.findIndex((i) => i.key === over?.id);
                const sortData = (arrayMove(previous, activeIndex, overIndex)).map((item) => {
                    return item._id
                })
                dispatch(updateOrderBanner(sortData))
                return arrayMove(previous, activeIndex, overIndex);
            });
        }
    };
    const items = [
        {
            key: '1',
            label: t('mainBanner'),
            children: <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                <SortableContext
                    items={dataSource.map((i) => i.key)}
                    strategy={verticalListSortingStrategy}
                >
                    <ProTable
                        components={{
                            body: {
                                row: Row,
                            },
                        }}
                        loading={isFetching}
                        polling={refreshing}
                        search={false}
                        rowKey="key"
                        rowClassName={(record) => record.color?.replace('#', '')}
                        columns={columns}
                        dataSource={dataSource}
                        scroll={{ x: 1500 }}
                        columnsState={{
                            persistenceKey: 'pro-table-singe-demos',
                            persistenceType: 'localStorage',
                        }}
                        pagination={{
                            ...pagination,
                            showSizeChanger: true,
                        }}
                        request={async (params, sort) => {
                            filterListBanner(params, sort, true);
                        }}
                        dateFormatter="string"
                        toolBarRender={() => [
                            <Button
                                key="add"
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={() => { setVisible(true) }}
                            >
                                {t('addNewBanner')}
                            </Button>,
                        ]}
                    />
                </SortableContext>
            </DndContext>,
        },
        {
            key: '2',
            label: t('subBanner'),
            children: <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                <SortableContext
                    items={dataSource.map((i) => i.key)}
                    strategy={verticalListSortingStrategy}
                >
                    <ProTable
                        components={{
                            body: {
                                row: Row,
                            },
                        }}
                        loading={isFetching}
                        polling={refreshing}
                        search={false}
                        rowKey="key"
                        rowClassName={(record) => record.color?.replace('#', '')}
                        columns={columns}
                        dataSource={dataSource}
                        scroll={{ x: 1500 }}
                        columnsState={{
                            persistenceKey: 'pro-table-singe-demos',
                            persistenceType: 'localStorage',
                        }}
                        pagination={{
                            ...pagination,
                            showSizeChanger: true,
                        }}
                        request={async (params, sort) => {
                            filterListBanner(params, sort, false);
                        }}
                        dateFormatter="string"
                        toolBarRender={() => [
                            <Button
                                key="add"
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={() => { setVisible(true) }}
                            >
                                {t('addNewBanner')}
                            </Button>,
                        ]}
                    />
                </SortableContext>
            </DndContext>
        },
    ];
    return (
        <div>
            <Tabs defaultActiveKey="1" items={items} onChange={(e) => { onChange(e) }} />
            <AddBanner visible={visible} onClose={onClose} setRefreshing={setRefreshing} />
            <UpdateBanner visible={visibleUpd} onClose={onCloseUpd} data={dataRow} />
            <DeleteBanner visible={visibleDlt} onClose={onCloseDlt} data={dataRow} />
        </div>
    );
};

function mapStateToProps(state) {
    return {
        listBanner: select(state, 'bannersReducer', 'listBanner'),
        isFetching: select(state, 'bannersReducer', 'isFetching'),
        pagination: select(state, 'bannersReducer', 'pagination'),
    };
}
export default connect(mapStateToProps)(ToJS(BannerPage));