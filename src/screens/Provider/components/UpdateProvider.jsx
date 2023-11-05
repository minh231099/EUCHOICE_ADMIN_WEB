import React, { useEffect } from "react";
import ToJS from "../../../hoc/ToJS";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import toJSVarible from "../../../utils/toJSVarible";
import select from "../../../utils/select";
import { Col, Modal, Row, message } from "antd";
import { updProvider } from "../redux/action";
import ProForm, { ProFormText } from "@ant-design/pro-form";

const UpdateProvider = (props) => {
    const [form] = ProForm.useForm();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const successUpd = toJSVarible(useSelector((state) => select(state, ['providerReducer'], 'successUpd')));

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(props.data);
    }, [props.data]);

    useEffect(() => {
        if (successUpd) {
            form.resetFields();
            props.onClose();
            message.success(t("updateProviderSuccessfully"));
        }
    }, [successUpd]);

    const onFinish = async (values) => {
        dispatch(updProvider(props?.data?._id, values));
    }

    const onClose = () => {
        props.onClose();
        form.resetFields();
    }
    return (
        <Modal
            title={t('editProvider')}
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
}

UpdateProvider.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    data: PropTypes.any,
};

UpdateProvider.defaultProps = {
    visible: false,
    onClose: () => { },
    data: {},
};
export default ToJS(UpdateProvider);