import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import '../Styles/SurveyList.css';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const responsecount = await axiosInstance.get('/Surveys');
        const countdata = responsecount.data.count;
        const response = await axiosInstance.get(`/Surveys?PageSize=${countdata}`);
        setSurveys(response.data.items); // API'den dönen veriyi al
      } catch (error) {
        console.error('Anketler yüklenemedi:', error);
      }
    };

    fetchSurveys();
  }, []);

  const handleSurveyClick = (surveyId) => {
    navigate(`/participate/${surveyId}`);
  };

  return (
    <div className="container mt-5 container-custom">
      <h2 className="header-custom">Anketler</h2>
      <ul className="list-group">
        {surveys.map(survey => (
          <li
            key={survey.id}
            className="list-group-item list-item-custom"
            onClick={() => handleSurveyClick(survey.id)}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1 survey-name">{survey.name}</h5>
                <p className="mb-1 text-muted">Oluşturma Tarihi: {new Date(survey.createdDate).toLocaleDateString()}</p>
                <p className="mb-1 text-muted">Katılımcı Sayısı: {survey.participationCount}</p>
              </div>
              <div className="text-right">
                <p className="mb-1 text-success">Evet Cevap Sayısı: {survey.answerYes}</p>
                <p className="mb-1 text-danger">Hayır Cevap Sayısı: {survey.answerNo}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyList;

