import React, { useState } from 'react';
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
    const [isSide, setIsSide] = useState(false);

    const successUpd = toJSVarible(useSelector((state) => select(state, ['bannersReducer'], 'successUpd')));

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(props.data);
        if (props.data.pos1 || props.data.pos2)
            setIsSide(true)
    }, [props]);

    useEffect(() => {
        if (successUpd) {
            form.resetFields();
            props.onClose();
            setIsSide(false);
            message.success(t("updateBannerSuccessfully"));
        }
    }, [successUpd]);

    const onFinish = async (values) => {
        const infoBanner = { ...values };
        delete infoBanner.isSide
        dispatch(updBanner(props?.data?._id, infoBanner));
    }

    const onClose = () => {
        props.onClose();
        setIsSide(false);
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
                                dependencies={['main']}
                                shouldUpdate={(prevValues, curValues) => curValues.main === false}
                                onChange={(value) => {
                                    if (value) {
                                        form.setFieldsValue({ main: false });
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