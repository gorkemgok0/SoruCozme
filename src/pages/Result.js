
import React from 'react';
import { Card, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score } = location.state || { score: 0 };

  const handleBackToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="centered-form">
      <Card title="Sınav Sonucu" bordered={false}>
        <h2>Puanın: {score.toFixed(2)}</h2>
        <Button type="primary" onClick={handleBackToProfile} block style={{ marginTop: 10 }}>
          Sınav kodu sayfasına dön
        </Button>
      </Card>
    </div>
  );
};

export default Result;
