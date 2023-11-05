import React from 'react';
import { Modal, message } from 'antd';
import ToJS from '../../../hoc/ToJS';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAcc } from '../redux/action';
import toJSVarible from '../../../utils/toJSVarible';
import select from '../../../utils/select';
import { useTranslation } from 'react-i18next';

const DeleteAccount = (props) => {
    const [content, setContent] = useState(undefined);
    const { visible, onClose, data } = props;
    const dispatch = useDispatch();
    const successDlt = toJSVarible(useSelector((state) => select(state, ['accountsReducer'], 'successDlt')));
    const { t } = useTranslation();

    useEffect(() => {
        if (successDlt) {
            message.success(<span>{t('confirmDelF')} <span className='warning-del-span'>{content} </span> {t('confirmDelL')}</span>);
        }
    }, [successDlt]);

    useEffect(() => {
        setContent(data?.email)
    }, [data]);

    const deleteAccount = () => {
        dispatch(deleteAcc(data?._id));
        onClose();
    };

    return (
        <div>
            <Modal
                title={t('confirmDeleteAccount')}
                open={visible}
                onCancel={onClose}
                zIndex={3000}
                onOk={deleteAccount}
            >
                <p className='warning-del-p'>{t('sureDelF')} <span className='warning-del-span'>{content} </span>{t('sureDelL')}</p>
            </Modal>
        </div>
    )
}

DeleteAccount.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    data: PropTypes.any,
};

DeleteAccount.defaultProps = {
    visible: false,
    onClose: () => { },
    data: {},
};

export default ToJS(DeleteAccount);