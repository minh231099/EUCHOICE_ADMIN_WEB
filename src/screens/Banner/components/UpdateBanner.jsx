import React from 'react';
import { Col, Image, Modal, Row, Space, message } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import select from '../../../utils/select';
import { useEffect } from 'react';
import ProForm, { ProFormDatePicker, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import ToJS from '../../../hoc/ToJS';
import toJSVarible from '../../../utils/toJSVarible';
import { useTranslation } from 'react-i18next';
import { updBanner } from '../redux/action';
import { RotateLeftOutlined, RotateRightOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
const baseUrl = process.env.REACT_APP_BASE_URL;

const UpdateBanner = (props) => {
    const [form] = ProForm.useForm();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const successUpd = toJSVarible(useSelector((state) => select(state, ['bannersReducer'], 'successUpd')));

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(props.data);
    }, [props]);

    useEffect(() => {
        if (successUpd) {
            form.resetFields();
            props.onClose();
            message.success(t("updateBannerSuccessfully"));
        }
    }, [successUpd]);

    const onFinish = async (values) => {
        dispatch(updBanner(props?.data?._id, values));
    }

    const onClose = () => {
        props.onClose();
        form.resetFields();
    }
    return (
        <div>
            <Modal
                title={t('editBanner')}
                open={props.visible}
                onCancel={onClose}
                width={400}
                zIndex={999999999}
                footer={false}
            >
                <div style={{ marginBottom: '10px' }}>
                    <Image
                        width={100}
                        src={`${baseUrl}image/${props?.data?.image}`}
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
                </div>
                <ProForm
                    form={form}
                    onFinish={onFinish}
                >
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
                            />
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={24}>
                            <ProFormSwitch
                                name="main"
                                label={t("isMain")}
                            />
                        </Col>
                    </Row>
                </ProForm>
            </Modal >
        </div>
    )
}

UpdateBanner.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    data: PropTypes.any,
};

UpdateBanner.defaultProps = {
    visible: false,
    onClose: () => { },
    data: {},
};

export default ToJS(UpdateBanner);