import React, { useEffect } from 'react';
import { Col, Modal, Row, message } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import select from '../../../utils/select';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import ToJS from '../../../hoc/ToJS';
import toJSVarible from '../../../utils/toJSVarible';
import { useTranslation } from 'react-i18next';
import { addNewWarehouse } from '../redux/action';

const AddWarehouse = (props) => {
    const [form] = ProForm.useForm();
    const dispatch = useDispatch();
    const successAdd = toJSVarible(useSelector((state) => select(state, ['warehouseReducer'], 'successAdd')));
    const isCreateEr = toJSVarible(useSelector((state) => select(state, ['warehouseReducer'], 'isCreateEr')));
    const messageWH = toJSVarible(useSelector((state) => select(state, ['warehouseReducer'], 'messageWH')));
    const refreshing = toJSVarible(useSelector((state) => select(state, ['warehouseReducer'], 'refreshing')));
    const listAccounts = toJSVarible(useSelector((state) => select(state, ['authReducer'], 'listFilterAccount')));
    const { t } = useTranslation();

    useEffect(() => {
        if (successAdd) {
            form.resetFields();
            props.onClose();
            message.success(t("createWarehouseSuccessfully"));
        }
        if (isCreateEr) {
            message.error(t(messageWH));
            props.setRefreshing(1000);
        }
        if (refreshing) {
            props.setRefreshing(1000);
        }
    }, [successAdd, isCreateEr, refreshing]);

    const onFinish = (values) => {
        dispatch(addNewWarehouse(values));
    }

    const onClose = () => {
        props.onClose();
        form.resetFields();
    }
    return (
        <Modal
            title={t('createNewWarehouse')}
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
                            options={listAccounts}
                            placeholder={t('pleaseSelectManager')}
                            rules={[{ required: true, message: t('pleaseDoNotLeaveItBlank') }]}
                        />
                    </Col>
                </Row>
            </ProForm>
        </Modal >
    )
}

AddWarehouse.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    setRefreshing: PropTypes.func,
};

AddWarehouse.defaultProps = {
    visible: false,
    onClose: () => { },
    setRefreshing: () => { },
};

export default ToJS(AddWarehouse);