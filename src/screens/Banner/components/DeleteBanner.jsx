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
import { dltBanner } from '../redux/action';

const DeleteBanner = (props) => {
    const [content, setContent] = useState(undefined);
    const { visible, onClose, data } = props;
    const dispatch = useDispatch();
    const successDlt = toJSVarible(useSelector((state) => select(state, ['bannersReducer'], 'successDlt')));
    const { t } = useTranslation();

    useEffect(() => {
        if (successDlt) {
            message.success(<span>{t('confirmDelBannerF')} <span className='warning-del-span'>{content} </span> {t('confirmDelBannerL')}</span>);
        }
    }, [successDlt]);

    useEffect(() => {
        setContent(data?.name)
    }, [data]);

    const deleteAccount = () => {
        dispatch(dltBanner(data?._id));
        onClose();
    };

    return (
        <div>
            <Modal
                title={t('confirmDeleteBanner')}
                open={visible}
                onCancel={onClose}
                zIndex={999999999}
                onOk={deleteAccount}
            >
                <p className='warning-del-p'>{t('sureDelBannerF')} <span className='warning-del-span'>{content} </span>{t('sureDelBannerL')}</p>
            </Modal>
        </div>
    )
}

DeleteBanner.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    data: PropTypes.any,
};

DeleteBanner.defaultProps = {
    visible: false,
    onClose: () => { },
    data: {},
};

export default ToJS(DeleteBanner);