/* eslint-disable no-unreachable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import '../Styles/CreateSurvey.css';

const CreateSurvey = () => {
  const [name, setName] = useState('');
  const [question, setQuestion] = useState(['']);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const survey = { name, questionText: question };
      await axiosInstance.post('/Surveys', survey);
      navigate('/surveys');
      // Başarılı olursa, kullanıcıyı bilgilendirin veya yönlendirin
    } catch (error) {
      const response = await axiosInstance.get(`/Surveys`);
      alert(response.data, error);
    }
  };

  return (
    <div className="create-survey-container">
      <h2>Anket Oluştur</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Anket Adı:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Anket adını giriniz"
          />
        </div>
        <div>
          <label>Soru:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Soruyu giriniz"
          />
        </div>
        <button type="submit">Oluştur</button>
      </form>
    </div>
  );
};

export default CreateSurvey;
