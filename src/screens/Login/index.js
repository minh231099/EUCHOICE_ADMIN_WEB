import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import select from '../../utils/select';
import toJs from '../../hoc/ToJS';

import { login } from '../Auth/redux/action';

import Card from '../../components/Card';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Item } = Form;

const LoginScreen = (props) => {
    const navigate = useNavigate();

    const { isAuthenticated, isVerify, userLogin, error, errorMessage } = props;

    useEffect(() => {
        if (isAuthenticated) {
            if (isVerify) {
                navigate('/');
            }
            else navigate('/change-password');
        }
    }, [isAuthenticated]);

    const handleLogin = (values) => {
        userLogin(values);
    };

    const openNotification = (errorMessage, type) => {
        notification.open({
            message: "Email hoặc mật khẩu không chính xác",
            type: type
        });
    }

    useEffect(() => {
        if (error) openNotification(errorMessage, 'error');
    }, [error]);

    return (
        <div className="login-page">
            <Card
                hoverable={false}
                clickable={false}
                hasShadow
                className="login-card"
            >
                <div>
                    <h1 style={{ textAlign: 'center' }}>{'Login'}</h1>
                    <Form
                        initialValues={{
                            remember: true,
                            username: '',
                            password: '',
                        }}
                        onFinish={handleLogin}
                    >
                        <Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Email"
                                autoComplete="email"
                            />
                        </Item>
                        <Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Password"
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                                autoComplete="password"
                            />
                        </Item>
                        <Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox className="remember-me-check">Remember me</Checkbox>
                        </Item>
                        <Item style={{ marginTop: 15 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Log in
                            </Button>
                        </Item>
                    </Form>
                </div>
            </Card>
            <div className="footer">
                <p>Copyright © 2023 All rights reserved by EUCHOICE</p>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: select(state, 'authReducer', 'isAuthenticated'),
        isFetching: select(state, 'authReducer', 'isFetching'),
        error: select(state, 'authReducer', 'error'),
        errorMessage: select(state, 'authReducer', 'message'),
        isVerify: select(state, 'authReducer', 'isVerify'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userLogin: (paramrs) => dispatch(login(paramrs))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(toJs(LoginScreen));