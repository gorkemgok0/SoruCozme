
import React, { useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [examCode, setExamCode] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('studentId');
    navigate('/login');
  };

  const handleStartQuiz = () => {
    const studentId = localStorage.getItem('studentId');
    const alreadyTaken = checkIfExamTaken(studentId, examCode);

    if (alreadyTaken) {
      message.error('Zaten bu sınava girdin.');
    } else {
      if (examCode === 'mat101' || examCode === 'tur101') {
        navigate(`/quiz/${examCode}`);
      } else {
        message.error('Geçersiz sınav kodu.');
      }
    }
  };

  const checkIfExamTaken = (studentId, examCode) => {
    // Simulated database check
    const takenExams = JSON.parse(localStorage.getItem('takenExams')) || [];
    return takenExams.some(exam => exam.studentId === studentId && exam.examCode === examCode);
  };

  return (
    <div className="centered-form">
      <Card title="Sınav kodunu gir" bordered={false}>
        <Form onFinish={handleStartQuiz}>
          <Form.Item
            name="examCode"
            rules={[{ required: true, message: 'Sınav kodu gir!' }]}
          >
            <Input
              placeholder="Enter exam code"
              value={examCode}
              onChange={e => setExamCode(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Soru Çözmeye Başla
            </Button>
          </Form.Item>
        </Form>
        <Button type="primary" onClick={handleLogout} block style={{ marginTop: 10 }}>
          Log out
        </Button>
      </Card>
    </div>
  );
};

export default Profile;

