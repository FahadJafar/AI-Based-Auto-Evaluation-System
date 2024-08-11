import React, { useState } from 'react';

const About = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [response, setResponse] = useState(null);

    const handlePdfChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('pdf_file', pdfFile);
        formData.append('image_file', imageFile);

        try {
            // Upload files to the backend using fetch
            const uploadResponse = await fetch('http://127.0.0.1:8000/upload/', {
                method: 'POST',
                body: formData,
            });
            const uploadData = await uploadResponse.json(); // Extract response data as JSON

            // Send data as POST to http://localhost:8080/quiz
            const apiResponse = await fetch('http://localhost:8080/quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(uploadData), // Sending uploadData received from uploadResponse
            });

            const apiData = await apiResponse.json(); // Extract response data as JSON

            // Store the API response in the component state
            setResponse(apiData);
            console.log(apiData); // Log the API response for debugging
        } catch (error) {
            console.error('Error uploading files or fetching data:', error);
        }
    };

    return (
        <div className="About">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>PDF File:</label>
                    <input type="file" accept="application/pdf" onChange={handlePdfChange} required />
                </div>
                <div>
                    <label>Image File:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                </div>
                <button type="submit">Upload Files</button>
            </form>
            {response && Array.isArray(response) && ( // Check if response is an array
                <div>
                    <h2>Quizzes</h2>
                    <ul>
                        {response.map((quiz) => (
                            <li key={quiz.id}>
                                <p><strong>ID:</strong> {quiz.id}</p>
                                <p><strong>Name:</strong> {quiz.name}</p>
                                <p><strong>Subject:</strong> {quiz.subject}</p>
                                <p><strong>Strength:</strong> {quiz.strength}</p>
                                <p><strong>Total Quizzes:</strong> {quiz.totalQuizzes}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default About;
