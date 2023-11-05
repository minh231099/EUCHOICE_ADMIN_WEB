import React, { useEffect, useState } from 'react';
import { Dropdown } from 'antd';
import { connect } from 'react-redux';

import select from '../../../utils/select';
import toJs from '../../../hoc/ToJS';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import { logOut } from '../../Auth/redux/action';

const UserDropdown = (props) => {
    const { userInfo, logOut } = props;
    const { t } = useTranslation();
    const [nameUser, setNameUser] = useState('');

    useEffect(() => {
        if (userInfo) {
            setNameUser(userInfo.email.split('@')[0])
        }
    }, [JSON.stringify(userInfo)]);

    const onLogOut = () => {
        logOut();
    }

    const items = [
        {
            key: '1',
            label: (
                <div onClick={onLogOut}>
                    {t('Log Out')}
                </div>
            ),
        },
    ];

    return (
        <Dropdown menu={{ items }}>
            <a>
                <UserOutlined style={{ border: 'solid 1px', borderRadius: '50%', marginRight: 5 }} />{nameUser}
            </a>
        </Dropdown>
    )
};

function mapStateToProps(state) {
    return {
        userInfo: select(state, 'authReducer', 'userInfo'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: () => dispatch(logOut()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(toJs(UserDropdown));