
import React, { useState, useEffect } from 'react';
import { Card, Button, Radio, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const Quiz = () => {
  const { examCode } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const allQuestions = {
        mat101: [
          { question: '2 + 2?', options: ['3', '4', '5', '6'], answer: '4' },
          { question: '3 + 5?', options: ['5', '8', '7', '9'], answer: '8' },
          { question: '10 - 7?', options: ['3', '4', '2', '1'], answer: '3' },
          { question: '5 * 6?', options: ['11', '30', '25', '20'], answer: '30' },
          { question: '12 / 3?', options: ['4', '3', '6', '2'], answer: '4' },
          { question: '9 + 1?', options: ['8', '9', '10', '11'], answer: '10' },
          { question: '7 - 2?', options: ['5', '6', '7', '4'], answer: '5' },
          { question: '3 * 3?', options: ['6', '8', '9', '7'], answer: '9' },
          { question: '16 / 4?', options: ['3', '4', '5', '6'], answer: '4' },
          { question: '10 - 5?', options: ['2', '4', '5', '6'], answer: '5' },
        ],
        tur101: [
          { question: 'Aşağıdaki cümlelerin hangisinde zamir (adıl) vardır?', options: ['Ali okula gitti.', 'O, çok çalışkan bir öğrencidir.', 'Kitap okudu.', 'Beni aradı.'], answer: 'O, çok çalışkan bir öğrencidir.' },
          { question: 'Hangisi büyük ünlü uyumuna uyar?', options: ['Kalem', 'Kitap', 'Defter', 'Çanta'], answer: 'Kalem' },
          { question: 'Aşağıdaki cümlelerin hangisinde edat vardır?', options: ['Ali okula gitti.', 'Kitap çok güzeldi.', 'Evin önünde durdu.', 'Yolda yürüdü.'], answer: 'Evin önünde durdu.' },
          { question: 'Aşağıdaki cümlelerin hangisinde bağlaç vardır?', options: ['Ve yağmur yağdı.', 'Okula gitti.', 'Kitap okudu.', 'Beni aradı.'], answer: 'Ve yağmur yağdı.' },
          { question: 'Hangisi küçük ünlü uyumuna uyar?', options: ['Okul', 'Kitap', 'Evin', 'Çanta'], answer: 'Okul' },
          { question: 'Hangisi tamlanan tamlayanı uyumlu şekilde gösterir?', options: ['Kitabın kapağı', 'Defter kalemi', 'Çantası', 'Kalemliği'], answer: 'Kitabın kapağı' },
          { question: 'Aşağıdaki cümlelerin hangisinde dolaylı tümleç vardır?', options: ['Ali okula gitti.', 'Kitap çok güzeldi.', 'Evin önünde durdu.', 'Yolda yürüdü.'], answer: 'Ali okula gitti.' },
          { question: 'Hangisi isim tamlamasıdır?', options: ['Kalemlik', 'Kitap', 'Evin önünde', 'Çantası'], answer: 'Evin önünde' },
          { question: 'Hangisi sıfat tamlamasıdır?', options: ['Büyük ev', 'Kalem', 'Kitap', 'Çantası'], answer: 'Büyük ev' },
          { question: 'Hangisi birleşik isimdir?', options: ['Çamaşır makinesi', 'Kitap', 'Kalem', 'Evin önünde'], answer: 'Çamaşır makinesi' },
        ]
      };

      setQuestions(allQuestions[examCode]);
    };

    fetchQuestions();
  }, [examCode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    if (timeLeft === 0) {
      handleSubmitAnswer();
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionChange = e => {
    setSelectedOption(e.target.value);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setCorrectAnswers(prev => prev + 1);
    } else {
      setIncorrectAnswers(prev => prev + 1);
    }
    setSelectedOption(null);
    setTimeLeft(10);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      navigate('/result', { state: { score: calculateScore(correctAnswers, incorrectAnswers) } });
    }
  };

  const calculateScore = (correctAnswers, incorrectAnswers) => {
    const totalQuestions = questions.length;
    const netCorrectAnswers = correctAnswers - Math.floor(incorrectAnswers / 4);
    const score = ((netCorrectAnswers / totalQuestions) * 100)+10;
    return Math.max(0, Math.min(score, 100)); 
  };

  const saveResult = () => {
    const studentId = localStorage.getItem('studentId');
    const takenExams = JSON.parse(localStorage.getItem('takenExams')) || [];
    takenExams.push({ studentId, examCode });
    localStorage.setItem('takenExams', JSON.stringify(takenExams));
  };

  return (
    <div className="centered-form">
      <Card
        title={`Soru ${currentQuestionIndex + 1}`}
        bordered={false}
      >
        {questions.length > 0 ? (
          <>
            <h3>{questions[currentQuestionIndex].question}</h3>
            <Radio.Group onChange={handleOptionChange} value={selectedOption}>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <Radio key={index} value={option}>
                  {option}
                </Radio>
              ))}
            </Radio.Group>
            <div style={{ marginTop: 20 }}>
              <Button type="primary" onClick={handleSubmitAnswer} disabled={!selectedOption}>
                Onayla
              </Button>
            </div>
            <div style={{ marginTop: 20 }}>
              <p>Kalan Zaman: {timeLeft} saniye</p>
            </div>
          </>
        ) : (
          <p>Loading questions...</p>
        )}
      </Card>
    </div>
  );
};

export default Quiz;
