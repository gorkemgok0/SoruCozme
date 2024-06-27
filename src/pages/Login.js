
import React, { useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = values => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('studentId', values.username);
      message.success('Başarılı giriş');
      setLoading(false);
      navigate('/profile');
    }, 1000);
  };

  return (
    <div className="centered-form">
      <Card title="Login" bordered={false}>
        <Form name="login" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Kullanıcı adını gir!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Şifreni gir!' }]}
          >
            <Input.Password placeholder="Şifre" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
