import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const ParticipateSurvey = () => {
    const { surveyId } = useParams();
    const [survey, setSurvey] = useState(null);
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSurvey = async () => {
          try {
            const response = await axiosInstance.get(`/Surveys/${surveyId}`);
                setSurvey(response.data);
          } catch (error) {
            console.error('Anket yüklenemedi:', error);
          }
        };
        fetchSurvey();
    }, [surveyId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
          await axiosInstance.post('/Participations', {
            surveyId : surveyId,
            answer: answer
        });
        setAnswer('');
        } catch (error) {
          if (error.response && error.response.data && error.response.data.detail) {
            setError(error.response.data.detail);
        } else {
            setError('Bir hata oluştu, lütfen tekrar deneyin.');
        }
        }
    };

    if (!survey) return <div>Yükleniyor...</div>;

    return (
      <div className="container mt-4">
          <h2>{survey.name}</h2>
          <p>{survey.questionText}</p>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
              <div className="form-check">
                  <input
                      type="radio"
                      className="form-check-input"
                      value="Evet"
                      checked={answer === "Evet"}
                      onChange={(e) => setAnswer(e.target.value)}
                  />
                  <label className="form-check-label">Evet</label>
              </div>
              <div className="form-check">
                  <input
                      type="radio"
                      className="form-check-input"
                      value="Hayır"
                      checked={answer === "Hayır"}
                      onChange={(e) => setAnswer(e.target.value)}
                  />
                  <label className="form-check-label">Hayır</label>
              </div>
              <button type="submit" className="btn btn-primary mt-3">Katıl</button>
          </form>
      </div>
  );
};

export default ParticipateSurvey;
