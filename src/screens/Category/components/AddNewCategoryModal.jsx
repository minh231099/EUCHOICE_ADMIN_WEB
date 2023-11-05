import React, { useRef } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useTranslation } from "react-i18next";

const { Item } = Form;

const AddNewCategoryModal = (props) => {
    const { visible, onOk, onCancel } = props;
    const { t } = useTranslation();
    const formRef = useRef();

    const onClickSubmit = () => {
        formRef.current.submit();
    }

    const onFinish = (newCategory) => {
        onOk(newCategory);
    }

    return (
        <Modal
            title={t('addNewCategory')}
            open={visible}
            destroyOnClose={true}
            maskClosable={false}
            footer={
                <div>
                    <Button
                        onClick={onCancel}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        type='primary'
                        onClick={onClickSubmit}
                    >
                        {t('save')}
                    </Button>
                </div>
            }
        >
            <Form ref={formRef} onFinish={onFinish}>
                <Item
                    label={t('categoryName')}
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: t('pleaseInputCategoryName'),
                        },
                    ]}
                >
                    <Input
                    />
                </Item>
            </Form>
        </Modal>
    )
}

export default AddNewCategoryModal;