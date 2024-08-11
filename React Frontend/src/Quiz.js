import React, { useState, useEffect } from "react";

const Quiz = () => {
    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/quizzes/');
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz data');
                }
                const data = await response.json();
                setQuizData(data.results); // Assuming 'results' contains the array of quiz data
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

        fetchQuizData();
    }, []);

    return (
        <div className="quiz-container">
            <h2>Quiz Data</h2>
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
                            <td>{quiz.section}</td> {/* Assuming section ID is shown here */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Quiz;
