
import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('studentId');
    navigate('/login');
  };

  return (
    <AntHeader>
      <div className="logo" onClick={() => navigate('/')}>Soru Çözme</div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        {isAuthenticated ? (
          <Menu.Item key="1" onClick={handleLogout}>
            Logout
          </Menu.Item>
        ) : (
          <Menu.Item key="1" onClick={() => navigate('/login')}>
            Login
          </Menu.Item>
        )}
      </Menu>
    </AntHeader>
  );
};

export default Header;
