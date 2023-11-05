import React from 'react';
import { Modal, message } from 'antd';
import ToJS from '../../../hoc/ToJS';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toJSVarible from '../../../utils/toJSVarible';
import select from '../../../utils/select';
import { useTranslation } from 'react-i18next';
import { dltWarehouse } from '../redux/action';

const DeleteWarehouse = (props) => {
    const [content, setContent] = useState(undefined);
    const { visible, onClose, data } = props;
    const dispatch = useDispatch();
    const successDlt = toJSVarible(useSelector((state) => select(state, ['warehouseReducer'], 'successDlt')));
    const { t } = useTranslation();

    useEffect(() => {
        if (successDlt) {
            message.success(<span>{t('confirmDelWHF')} <span className='warning-del-span'>{content} </span> {t('confirmDelWHL')}</span>);
        }
    }, [successDlt]);

    useEffect(() => {
        setContent(data?.name)
    }, [data]);

    const deleteAccount = () => {
        dispatch(dltWarehouse(data?._id));
        onClose();
    };

    return (
        <div>
            <Modal
                title={t('confirmDeleteWarehouse')}
                open={visible}
                onCancel={onClose}
                zIndex={3000}
                onOk={deleteAccount}
            >
                <p className='warning-del-p'>{t('sureDelWHF')} <span className='warning-del-span'>{content} </span>{t('sureDelWHL')}</p>
            </Modal>
        </div>
    )
}

DeleteWarehouse.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    data: PropTypes.any,
};

DeleteWarehouse.defaultProps = {
    visible: false,
    onClose: () => { },
    data: {},
};

export default ToJS(DeleteWarehouse);