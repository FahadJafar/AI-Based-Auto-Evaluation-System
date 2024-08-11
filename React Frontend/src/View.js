import React, { useState, useEffect } from "react";
import axios from "axios";

const View = ({ sectionName }) => {
  const [quizzesData, setQuizzesData] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${sectionName}`);
        setQuizzesData(response.data);
      } catch (error) {
        console.error(`Error fetching quizzes for ${sectionName}:`, error);
      }
    };

    fetchQuizzes();
  }, [sectionName]);

  return (
    <div className="View">
      <h2>Quizzes for {sectionName}</h2>
      <ul>
        {quizzesData.map((quiz) => (
          <li key={quiz.id}>
            {quiz.name} - Marks: {quiz.O_marks}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default View;
