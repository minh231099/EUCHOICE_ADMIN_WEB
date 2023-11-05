import React, { useState } from 'react';
import { Col, Modal, Row, Tabs, message } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import select from '../../../utils/select';
import { useEffect } from 'react';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import ToJS from '../../../hoc/ToJS';
import { changePassAcc } from '../redux/action';
import { updAcc } from '../redux/action';
import toJSVarible from '../../../utils/toJSVarible';
import { useTranslation } from 'react-i18next';

const UpdateAccount = (props) => {
    const [form] = ProForm.useForm();
    const [form1] = ProForm.useForm();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const successUpd = toJSVarible(useSelector((state) => select(state, ['accountsReducer'], 'successUpd')));

    useEffect(() => {
        form.resetFields();
        form1.resetFields();
        form.setFieldsValue(props.data);
    }, [props.data]);

    useEffect(() => {
        if (successUpd) {
            form.resetFields();
            form1.resetFields();
            props.onClose();
            if (activeTab === '1')
                message.success(t("updateAccountInfomationsSuccessfully"));
            else message.success(t("updateAccountPasswordSuccessfully"));
        }
    }, [successUpd]);

    const onFinish = async (values) => {
        const raw = {
            _id: props?.data?._id,
            ...values
        };
        dispatch(updAcc(raw));
    }
    const onFinish1 = async (values) => {
        const raw = {
            _id: props?.data?._id,
            ...values
        };
        dispatch(changePassAcc(raw))
    }
    const initialItems = [
        {
            label: t('accountInfomations'),
            key: '1',
            children: <ProForm
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
                        <ProFormSelect
                            label={t("role")}
                            name="role"
                            options={[
                                {
                                    value: "admin",
                                    label: t("Admin"),
                                },
                                {
                                    value: "user",
                                    label: t("User"),
                                },
                                {
                                    value: "editor",
                                    label: t("Editor"),
                                },
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message: t('pleaseDoNotLeaveItBlank'),
                                },
                            ]}
                            placeholder={t('pleaseChooseRole')}
                        />
                    </Col>
                </Row>
            </ProForm>,
        },
        {
            label: t("accountPassword"),
            key: '2',
            children: <ProForm
                form={form1}
                onFinish={onFinish1}
            >
                <Row gutter={16}>
                    <Col lg={12} md={24} sm={24} xs={24}>
                        <ProFormText.Password
                            label={t("newPassword")}
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
                            placeholder={t("pleaseEnterNewPassword")}
                        />
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24}>
                        <ProFormText.Password
                            label={t("reEnterNewPassword")}
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
                            placeholder={t('pleaseReEnterNewPassword')}
                        />
                    </Col>
                </Row>
            </ProForm>,
        },
    ];
    const [activeTab, setActiveTab] = useState(initialItems[0].key);
    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const onClose = () => {
        props.onClose();
        form.resetFields();
        form1.resetFields();
    }
    return (
        <Modal
            title={t('editAnAccount')}
            open={props.visible}
            onCancel={onClose}
            width={900}
            footer={false}
        >
            <Tabs activeKey={activeTab} onChange={handleTabChange} className='tab-in-modal' items={initialItems} />
        </Modal >
    )
}

UpdateAccount.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    data: PropTypes.any,
};

UpdateAccount.defaultProps = {
    visible: false,
    onClose: () => { },
    data: {},
};

export default ToJS(UpdateAccount);