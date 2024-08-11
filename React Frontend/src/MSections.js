import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MSections = () => {
  const [sections, setSections] = useState([]);
  const [showQuizzes, setShowQuizzes] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [currentSectionId, setCurrentSectionId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/sections/");
        setSections(response.data.results); // Set data from 'results' array
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchSections();
  }, []);

  const handleViewQuizzes = (section) => {
    setCurrentSection(section.name);
    setCurrentSectionId(section.id);
    setShowQuizzes(true);
    navigate(`/vquiz/${section.id}`); // Navigate to VQuiz page with section ID
  };

  const handleView = () => {
    setShowQuizzes(true);
    navigate(`/CreateSections`);
  };

  return (
    <div className="ManageSections">
      <div className="container">
        <div className="header">
          <h2>Sections</h2>
          <button onClick={handleView} className="create-button">
            Create Section
          </button>
        </div>
        <div className="form-list-container">
          <table className="form-list">
            <thead>
              <tr className="form-header">
                <th>Name</th>
                <th>Subject</th>
                <th>Strength</th>
                <th>Total Quizzes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sections.map((item) => (
                <tr key={item.id} className="form-row">
                  <td>{item.name}</td>
                  <td>{item.subject}</td>
                  <td>{item.strength}</td>
                  <td>{item.totalQuizzes}</td>
                  <td>
                    <button
                      className="create-button2"
                      onClick={() => handleViewQuizzes(item)}
                    >
                      View Quizzes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showQuizzes && (
        <div className="quizzes">
          <h3>Quizzes for {currentSection}</h3>
          <ul>
            <li>Quiz 1</li>
            <li>Quiz 2</li>
            <li>Quiz 3</li>
          </ul>
          <button onClick={() => setShowQuizzes(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default MSections;
