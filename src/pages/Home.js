
import React from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="centered-form">
      <Card title="SORU ÇÖZME UYGULAMASI" bordered={false}>
        <Button type="primary" onClick={goToProfile} block>
          Oturum aç
        </Button>
      </Card>
    </div>
  );
};

export default Home;
