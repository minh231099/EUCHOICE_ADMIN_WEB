import React from 'react';
import { Col, Modal, Row, message } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import select from '../../../utils/select';
import { useEffect } from 'react';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import ToJS from '../../../hoc/ToJS';
import toJSVarible from '../../../utils/toJSVarible';
import { useTranslation } from 'react-i18next';
import { updWarehouse } from '../redux/action';

const UpdateWarehouse = (props) => {
    const [form] = ProForm.useForm();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const successUpd = toJSVarible(useSelector((state) => select(state, ['warehouseReducer'], 'successUpd')));
    const listAccounts = toJSVarible(useSelector((state) => select(state, ['accountsReducer'], 'listAccounts')));

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(props.data);
    }, [props.data]);

    useEffect(() => {
        if (successUpd) {
            form.resetFields();
            props.onClose();
            message.success(t("updateWarehouseSuccessfully"));
        }
    }, [successUpd]);

    const onFinish = async (values) => {
        dispatch(updWarehouse(props?.data?._id, values));
    }

    const onClose = () => {
        props.onClose();
        form.resetFields();
    }
    return (
        <Modal
            title={t('editWarehouse')}
            open={props.visible}
            onCancel={onClose}
            width={900}
            footer={false}
        >
            <ProForm
                form={form}
                onFinish={onFinish}
            >
                <Row gutter={16}>
                    <Col lg={12} md={24} sm={24} xs={24}>
                        <ProFormText
                            label={t("warehouseName")}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: t('pleaseDoNotLeaveItBlank'),
                                },
                            ]}
                            placeholder={t('pleaseEnterWarehouseName')}
                        />
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24}>
                        <ProFormText
                            label={t("address")}
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: t('pleaseDoNotLeaveItBlank'),
                                },
                            ]}
                            placeholder={t('pleaseEnterAddress')}
                        />
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24}>
                        <ProFormText
                            label={t("city")}
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: t('pleaseDoNotLeaveItBlank'),
                                },
                            ]}
                            placeholder={t('pleaseEnterCity')}
                        />
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24}>
                        <ProFormText
                            label={t("country")}
                            name="country"
                            rules={[
                                {
                                    required: true,
                                    message: t('pleaseDoNotLeaveItBlank'),
                                },
                            ]}
                            placeholder={t('pleaseEnterCountry')}
                        />
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24}>
                        <ProFormSelect
                            showSearch={true}
                            label={t("manager")}
                            name="manager"
                            options={listAccounts?.map((e) => ({
                                label: e.email,
                                value: e._id,
                            }))}
                            placeholder={t('pleaseSelectManager')}
                            rules={[{ required: true, message: t('pleaseDoNotLeaveItBlank') }]}
                        />
                    </Col>
                </Row>
            </ProForm>
        </Modal >
    )
}

UpdateWarehouse.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    data: PropTypes.any,
};

UpdateWarehouse.defaultProps = {
    visible: false,
    onClose: () => { },
    data: {},
};

export default ToJS(UpdateWarehouse);