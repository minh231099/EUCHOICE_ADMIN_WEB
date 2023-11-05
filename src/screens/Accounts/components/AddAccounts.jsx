import React from 'react';
import { Col, Modal, Row, message } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import select from '../../../utils/select';
import { useEffect } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import ToJS from '../../../hoc/ToJS';
import { addAcc } from '../redux/action';
import toJSVarible from '../../../utils/toJSVarible';
import { useTranslation } from 'react-i18next';

const AddAccount = (props) => {
    const [form] = ProForm.useForm();
    const dispatch = useDispatch();
    const successAdd = toJSVarible(useSelector((state) => select(state, ['accountsReducer'], 'successAdd')));
    const isCreateEr = toJSVarible(useSelector((state) => select(state, ['accountsReducer'], 'isCreateEr')));
    const messageAcc = toJSVarible(useSelector((state) => select(state, ['accountsReducer'], 'messageAcc')));
    const refreshing = toJSVarible(useSelector((state) => select(state, ['accountsReducer'], 'refreshing')));
    const { t } = useTranslation();

    useEffect(() => {
        if (successAdd) {
            form.resetFields();
            props.onClose();
            message.success(t("createAccountSuccessfully!"));
        }
        if (isCreateEr) {
            message.error(t(messageAcc));
            props.setRefreshing(1000);
        }
        if (refreshing) {
            props.setRefreshing(1000);
        }
    }, [successAdd, isCreateEr, refreshing]);

    const onFinish = (values) => {
        const { email, password } = values;
        const raw = {
            email: email,
            password: password
        }
        dispatch(addAcc(raw));
    }

    const onClose = () => {
        props.onClose();
        form.resetFields();
    }
    return (
        <Modal
            title={t('createNewAccount')}
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
                            label={t("email")}
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: t('pleaseDoNotLeaveItBlank'),
                                },
                                {
                                    pattern: /^[^.]+[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+[^.]$/,
                                    message: t('pleaseEnterAnEmail'),
                                },
                                {
                                    transform(value) {
                                        return value?.toUpperCase?.().trim?.();
                                    },
                                },
                            ]}
                            placeholder={t('pleaseEnterAnEmail')}
                        />
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24}>
                        <ProFormText.Password
                            label={t("password")}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: t('pleaseDoNotLeaveItBlank'),
                                },
                                {
                                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,18}$/,
                                    message: t('validatePass')
                                }
                            ]}
                            placeholder={t('pleaseEnterPassword')}
                        />
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24}>
                        <ProFormText.Password
                            label={t("reEnterPassword")}
                            name="rePassword"
                            rules={[
                                {
                                    required: true,
                                    message: t('pleaseDoNotLeaveItBlank'),
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(t('validate2Pass'))
                                        );
                                    },
                                }),
                            ]}
                            placeholder={t('pleaseReEnterPassword')}
                        />
                    </Col>
                </Row>
            </ProForm>
        </Modal >
    )
}

AddAccount.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    setRefreshing: PropTypes.func,
};

AddAccount.defaultProps = {
    visible: false,
    onClose: () => { },
    setRefreshing: () => { },
};

export default ToJS(AddAccount);