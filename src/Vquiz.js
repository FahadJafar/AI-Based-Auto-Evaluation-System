import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewQuiz = (props) => {
    const [quizData, setQuizData] = useState([]);
    const { id } = useParams(); // Extract section ID from URL
   
    useEffect(() => {
      const fetchQuizData = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/quizzes/');
          if (!response.ok) {
            throw new Error('Failed to fetch quiz data');
          }
          const data = await response.json();
  
          // Filter quiz data efficiently using sid
          const filteredData = data.results.filter((quiz) => quiz.section === parseInt(id));
          setQuizData(filteredData);
        } catch (error) {
          console.error('Error fetching quiz data:', error);
        }
      };
  
      fetchQuizData();
    }, [id]); // Dependency on sid for refetching when it changes
    return (
        <div className="quiz-container">
            <h2>Quiz Data for Section ID {id}</h2>
            <table className="quiz-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Obtained Marks</th>
                        <th>Total Marks</th>
                        <th>Section</th>
                    </tr>
                </thead>
                <tbody>
                    {quizData.map((quiz) => (
                        <tr key={quiz.id}>
                            <td>{quiz.id}</td>
                            <td>{quiz.name}</td>
                            <td>{quiz.o_marks}</td>
                            <td>{20}</td> {/* Assuming total marks are static or calculated elsewhere */}
                            <td>{quiz.section}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewQuiz;
