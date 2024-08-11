import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Home = () => {
    const navigate = useNavigate();

    const handleManageSections = () => {
        navigate('/ManageSections');
    };

    const handleUploadExams = () => {
        navigate('/Upload');
    };

    return (
        <div className="wrap">
            
        <div className="Home">
            <div className="Manage">
            <h2>Welcome to the Teachers Portal Where You Can Efficiently Grade Students Exam</h2>
            <button onClick={handleManageSections}>Manage Sections</button>
            <button onClick={handleUploadExams}>Upload Exams</button>
            </div>
        </div>
        </div>
    );
}

export default Home;
