import React, { useState } from "react";

const Grades = () => {
    const [formData, setFormData] = useState({
        examFile: null,
        solutionPaper: null,
        quizNo: '',
        section: ''
    });
    const [formattedResponse, setFormattedResponse] = useState(null); 
    const [showResponse, setShowResponse] = useState(false); 

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0]
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const getIdForSection = (section) => {
        switch (section) {
            case 'A':
                return 1;
            case 'B':
                return 2;
            case 'C':
                return 3;
            default:
                return null; 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        const formDataToSend = new FormData();
        formDataToSend.append('pdf_file', formData.examFile);
        formDataToSend.append('image_file', formData.solutionPaper);
        formDataToSend.append('quizNo', formData.quizNo);
        formDataToSend.append('section', formData.section);

   
        const id = getIdForSection(formData.section);

        try {
            // Upload files to http://127.0.0.1:8000/upload/
            const uploadResponse = await fetch('http://127.0.0.1:8000/upload/', {
                method: 'POST',
                body: formDataToSend,
            });

         
            const responseData = await uploadResponse.json();
            console.log(responseData);

            const responseWithDetails = {
                ...responseData,
                quizNo: formData.quizNo,
                section: formData.section
            };

         
            const formatted = formatResponse(responseWithDetails);

            
            setFormattedResponse(formatted);

           
            setShowResponse(true);

         
            setFormData({
                examFile: null,
                solutionPaper: null,
                quizNo: '',
                section: ''
            });

        } catch (error) {
            console.error('Error uploading files or sending data:', error);
            
        }
    };

    const formatResponse = (response) => {
    
      const { students } = response;
    
 
      return (
        <div className="rresponse-container">
        
          <table className="student-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Student Name</th>
                <th>Obtained Marks</th>
                <th>Total Marks</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.obtained_marks}</td>
                  <td>{20}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    const handleReset = () => {
        setShowResponse(false); 
        setFormattedResponse(null); 
    };

    return (
        <div className="Grades">
            <div className="UploadGrades">
                <h2>Upload Exams</h2>
                {!showResponse ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="examFile">Students Exam PDF File:</label>
                            <div className="custom-file-input">
                                <input
                                    type="file"
                                    id="examFile"
                                    name="examFile"
                                    onChange={handleFileChange}
                                    className="file-input"
                                    accept="application/pdf"
                                    required
                                />
                                <label htmlFor="examFile" className="file-label">Choose PDF File</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="solutionPaper">Solution Paper (Image):</label>
                            <div className="custom-file-input">
                                <input
                                    type="file"
                                    id="solutionPaper"
                                    name="solutionPaper"
                                    onChange={handleFileChange}
                                    className="file-input"
                                    accept="image/*"
                                    required
                                />
                                <label htmlFor="solutionPaper" className="file-label">Choose Image File</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="quizNo">Quiz No:</label>
                            <input
                                type="text"
                                id="quizNo"
                                name="quizNo"
                                value={formData.quizNo}
                                onChange={handleChange}
                                className="regular-input"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="section">Section:</label>
                            <select
                                id="section"
                                name="section"
                                value={formData.section}
                                onChange={handleChange}
                                className="regular-input"
                                required
                            >
                                <option value="">Select Section</option>
                                <option value="A">BSE-A</option>
                                
                                <option value="C">T2</option>
                                <option value="D">T3</option>
                                <option value="D">T4</option>
                        
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                ) : (
                    <div className="rrresponse-container">
                        {formattedResponse}
                        <button onClick={handleReset}>Back to Form</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Grades;