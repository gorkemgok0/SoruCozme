
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import './index.css';

const { Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header />
        <Content className="site-layout-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/quiz/:examCode" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Router>
  );
}

export default App;
