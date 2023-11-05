import ProForm, { ProFormText } from "@ant-design/pro-form";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toJSVarible from "../../../utils/toJSVarible";
import select from "../../../utils/select";
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import { Col, Modal, Row, message } from "antd";
import { addNewProvider } from "../redux/action";
import ToJS from "../../../hoc/ToJS";

const AddProvider = (props) => {
    const [form] = ProForm.useForm();
    const dispatch = useDispatch();
    const successAdd = toJSVarible(useSelector((state) => select(state, ['providerReducer'], 'successAdd')));
    const isCreateEr = toJSVarible(useSelector((state) => select(state, ['providerReducer'], 'isCreateEr')));
    const messageProv = toJSVarible(useSelector((state) => select(state, ['providerReducer'], 'messageProv')));
    const refreshing = toJSVarible(useSelector((state) => select(state, ['providerReducer'], 'refreshing')));
    const { t } = useTranslation();

    useEffect(() => {
        if (successAdd) {
            form.resetFields();
            props.onClose();
            message.success(t("createProviderSuccessfully"));
        }
        if (isCreateEr) {
            message.error(t(messageProv));
            props.setRefreshing(1000);
        }
        if (refreshing) {
            props.setRefreshing(1000);
        }
    }, [successAdd, isCreateEr, refreshing]);

    const onFinish = (values) => {
        dispatch(addNewProvider(values));
    }

    const onClose = () => {
        props.onClose();
        form.resetFields();
    }
    return (
        <Modal
            title={t('createNewProvider')}
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
                            label={t("providerName")}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: t('pleaseDoNotLeaveItBlank'),
                                },
                            ]}
                            placeholder={t('pleaseEnterProviderName')}
                        />
                    </Col>
                </Row>
            </ProForm>
        </Modal >
    )
};
AddProvider.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    setRefreshing: PropTypes.func,
};

AddProvider.defaultProps = {
    visible: false,
    onClose: () => { },
    setRefreshing: () => { },
};
export default ToJS(AddProvider)