import React, { useState } from 'react';
import { DownOutlined, GlobalOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

import '../../assets/sass/components/_languageToggleButton.scss'

import LOCAL_STORAGE from '../../config/localStorage';

const keyMap = {
    vn: 'Tiếng Việt',
    en: 'English'
}

const LanguageToggleButton = () => {
    const [currentLng, setCurrentLng] = useState(localStorage.getItem(LOCAL_STORAGE.language) ? localStorage.getItem(LOCAL_STORAGE.language) : 'vn');

    const items = [
        {
            key: 'vn',
            label: 'Tiếng Việt',
        },
        {
            key: 'en',
            label: 'English',
        },
    ];

    const onClick = ({ key }) => {
        setCurrentLng(key);
        localStorage.setItem(LOCAL_STORAGE.language, key);
        location.reload();
    };

    return (
        <Dropdown
            menu={{
                items, onClick
            }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <GlobalOutlined />
                    {keyMap[currentLng]}
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    )
}

export default LanguageToggleButton;