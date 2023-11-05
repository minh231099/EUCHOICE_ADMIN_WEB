import { Modal } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const DeleteModal = (props) => {
    const { visible, onCancel, onConfirm } = props;
    const {t} = useTranslation();
    return (
        <Modal
            onCancel={onCancel}
            open={visible}
            onOk={onConfirm}
            title={t('deleteConfirm')}
        >
            {t('confirmBodyDeleteProd')}
        </Modal>
    )
}

export default DeleteModal;