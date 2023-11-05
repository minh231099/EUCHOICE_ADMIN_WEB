import React, { useEffect, useState } from "react";
import ToJS from "../../../hoc/ToJS";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import toJSVarible from "../../../utils/toJSVarible";
import select from "../../../utils/select";
import { useTranslation } from "react-i18next";
import { Modal, message } from "antd";
import { dltProvider } from "../redux/action";

const DeleteProvider = (props) => {
    const [content, setContent] = useState(undefined);
    const { visible, onClose, data } = props;
    const dispatch = useDispatch();
    const successDlt = toJSVarible(useSelector((state) => select(state, ['providerReducer'], 'successDlt')));
    const { t } = useTranslation();

    useEffect(() => {
        if (successDlt) {
            message.success(<span>{t('confirmDelProvF')} <span className='warning-del-span'>{content} </span> {t('confirmDelProvL')}</span>);
        }
    }, [successDlt]);

    useEffect(() => {
        setContent(data?.name)
    }, [data]);

    const deleteAccount = () => {
        dispatch(dltProvider(data?._id));
        onClose();
    };

    return (
        <div>
            <Modal
                title={t('confirmDeleteProvider')}
                open={visible}
                onCancel={onClose}
                zIndex={3000}
                onOk={deleteAccount}
            >
                <p className='warning-del-p'>{t('sureDelProvF')} <span className='warning-del-span'>{content} </span>{t('sureDelProvL')}</p>
            </Modal>
        </div>
    )
}

DeleteProvider.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    data: PropTypes.any,
};

DeleteProvider.defaultProps = {
    visible: false,
    onClose: () => { },
    data: {},
};
export default ToJS(DeleteProvider)