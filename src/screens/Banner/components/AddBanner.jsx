import React, { useEffect, useState } from 'react';
import { Col, Modal, Row, Upload, message } from 'antd';
import PropTypes from 'prop-types';
import ProForm, { ProFormDatePicker, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import ToJS from '../../../hoc/ToJS';
import { useTranslation } from 'react-i18next';
import Item from 'antd/lib/list/Item';
import { PlusOutlined } from '@ant-design/icons';
import { uploadBanner } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import toJSVarible from '../../../utils/toJSVarible';
import select from '../../../utils/select';

const AddBanner = (props) => {
    const [form] = ProForm.useForm();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
    const [previewOpen, setPreviewOpen] = useState(false);
    const [isSide, setIsSide] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const successAdd = toJSVarible(useSelector((state) => select(state, ['bannersReducer'], 'successAdd')));
    const isCreateEr = toJSVarible(useSelector((state) => select(state, ['bannersReducer'], 'isCreateEr')));
    const messageBN = toJSVarible(useSelector((state) => select(state, ['bannersReducer'], 'messageBN')));
    const refreshing = toJSVarible(useSelector((state) => select(state, ['bannersReducer'], 'refreshing')));

    useEffect(() => {
        if (successAdd) {
            form.resetFields();
            setFileList([]);
            props.onClose();
            message.success(t("createBannerSuccessfully"));
        }
        if (isCreateEr) {
            message.error(t(messageBN));
            props.setRefreshing(1000);
        }
        if (refreshing) {
            props.setRefreshing(1000);
        }
    }, [successAdd, isCreateEr, refreshing]);

    const onFinish = (values) => {
        const infoBanner = { ...values };
        delete infoBanner.isSide
        dispatch(uploadBanner(infoBanner, fileList))
    }

    const handleCancelPreview = () => setPreviewOpen(false);

    const onClose = () => {
        props.onClose();
        form.resetFields();
        setFileList([]);
    }
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList }) => {
        setFileList(fileList);
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const customRequest = ({ onSuccess }) => {
        onSuccess("ok");
    };

    return (
        <div>
            <Modal
                title={t('createNewBanner')}
                open={props.visible}
                onCancel={onClose}
                width={400}
                footer={false}
                zIndex={999999999}
            >
                <ProForm
                    form={form}
                    onFinish={onFinish}
                >
                    <Item
                        labelCol={{ span: 5 }}
                        name='image'
                        label={t('prodImages')}
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            customRequest={customRequest}
                            listType="picture-card"
                            fileList={fileList}
                            accept=".png, .jpg, .jpge"
                            onChange={handleChange}
                            multiple={false}
                            onPreview={handlePreview}
                            maxCount={1}
                        >
                            {
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>{t('uploadBanner')}</div>
                                </div>
                            }
                        </Upload>
                    </Item>
                    <Row gutter={16}>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <ProFormText
                                label={t("nameBanner")}
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: t('pleaseDoNotLeaveItBlank'),
                                    },
                                ]}
                                placeholder={t('pleaseEnterBannerName')}
                            />
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <ProFormText
                                label={t("bannerOrder")}
                                name='order'
                                rules={[
                                    {
                                        required: true,
                                        message: t('pleaseDoNotLeaveItBlank'),
                                    },
                                    {
                                        pattern: /^[0-9]*$/,
                                        message: t('pleaseEnterANumber'),
                                    },
                                ]}
                                placeholder={t('pleaseEnterOrderBanner')}
                            />
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <ProFormDatePicker
                                name="expired"
                                label={t("expiredBanner")}
                                rules={[
                                    {
                                        required: true,
                                        message: t('pleaseDoNotLeaveItBlank'),
                                    },
                                ]}
                            />
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={24}>
                            <ProFormSwitch
                                name="always"
                                label={t("alwaysShow")}
                                initialValue={false}
                            />
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={24}>
                            <ProFormSwitch
                                name="top"
                                label={t("isMain")}
                                initialValue={false}
                                dependencies={['isSide']}
                                shouldUpdate={(prevValues, curValues) => curValues.isSide === false}
                                onChange={(value) => {
                                    if (value) {
                                        form.setFieldsValue({ isSide: false });
                                        setIsSide(false)
                                    }
                                }}
                            />
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <ProFormSwitch
                                name="isSide"
                                label={t("isSide")}
                                initialValue={false}
                                dependencies={['top']}
                                shouldUpdate={(prevValues, curValues) => curValues.top === false}
                                onChange={(value) => {
                                    if (value) {
                                        form.setFieldsValue({ top: false });
                                    }
                                    setIsSide(value)
                                }}
                            />
                        </Col>
                        {
                            isSide ?
                                <>
                                    <Col lg={12} md={12} sm={12} xs={24}>
                                        <ProFormSwitch
                                            name="pos1"
                                            label={t("pos1")}
                                            initialValue={false}
                                            dependencies={['pos2']}
                                            shouldUpdate={(prevValues, curValues) => curValues.pos2 === false}
                                            onChange={(value) => {
                                                if (value) {
                                                    form.setFieldsValue({ pos2: false });
                                                }
                                            }}
                                        />
                                    </Col>
                                    <Col lg={12} md={12} sm={12} xs={24}>
                                        <ProFormSwitch
                                            name="pos2"
                                            label={t("pos2")}
                                            initialValue={false}
                                            dependencies={['pos1']}
                                            shouldUpdate={(prevValues, curValues) => curValues.pos1 === false}
                                            onChange={(value) => {
                                                if (value) {
                                                    form.setFieldsValue({ pos1: false });
                                                }
                                            }}
                                        />
                                    </Col>
                                </> : null
                        }
                    </Row>
                </ProForm>
            </Modal >
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelPreview}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </div>
    )
}

AddBanner.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    setRefreshing: PropTypes.func,
};

AddBanner.defaultProps = {
    visible: false,
    onClose: () => { },
    setRefreshing: () => { },
};

export default ToJS(AddBanner);