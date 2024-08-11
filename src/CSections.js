import React, { useState } from "react";

const CSections = () => {
    const [formData, setFormData] = useState({
        sectionName: '',
        sectionStrength: '',
        subjectName: '',
        totalQuizzes: '',
        teacherID: '91369fb5-356a-42ad-a2e7-2feb16adc9a7' // Replace with actual teacherID
    });

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any form field is empty
        if (!formData.sectionName || !formData.sectionStrength || !formData.subjectName || !formData.totalQuizzes) {
            setError('All fields are required');
            return;
        } else {
            setError('');
        }

        try {
            // Prepare data to be sent to the API
            const dataToSend = {
                name: formData.sectionName,
                subject: formData.subjectName,
                strength: parseInt(formData.sectionStrength),
                totalQuizzes: parseInt(formData.totalQuizzes),
                teacherID: formData.teacherID // Include teacherID in the data
            };

            // Send POST request to API
            const response = await fetch('http://127.0.0.1:8000/sections/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            // Check if request was successful
            if (!response.ok) {
                throw new Error('Failed to submit data');
            }

            // Handle success scenario
            console.log('Form submitted successfully');
            setShowSuccessMessage(true);

            // Reset form fields
            setFormData({
                sectionName: '',
                sectionStrength: '',
                subjectName: '',
                totalQuizzes: '',
                teacherID: '91369fb5-356a-42ad-a2e7-2feb16adc9a7' // Reset teacherID if needed
            });

        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error scenario, e.g., show error message to user
        }
    };

    const handleAddAnotherSection = () => {
        setShowSuccessMessage(false);
        // Optionally reset form fields or perform other actions
    };

    return (
        <div className="ContainerC">
            <div className="CSections">
                <h2>Create Section</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="sectionName">Name</label>
                        <input
                            type="text"
                            id="sectionName"
                            name="sectionName"
                            value={formData.sectionName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="sectionStrength">Strength</label>
                        <input
                            type="number"
                            id="sectionStrength"
                            name="sectionStrength"
                            value={formData.sectionStrength}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="subjectName">Subject</label>
                        <input
                            type="text"
                            id="subjectName"
                            name="subjectName"
                            value={formData.subjectName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="totalQuizzes">Total Quizzes</label>
                        <input
                            type="number"
                            id="totalQuizzes"
                            name="totalQuizzes"
                            value={formData.totalQuizzes}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>

                {showSuccessMessage && (
                    <div className="success-message">
                        <p className="success-text">Section successfully created!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CSections;
