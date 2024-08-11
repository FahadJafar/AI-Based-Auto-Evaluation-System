import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import CSections from './CSections';
import MSections from './MSections';
import Grades from './Grades';
import Login from './Login';
import About from './About';
import Quiz from './Quiz';
import View from './View';
import ViewQuiz from './Vquiz';
import minahil from './minahil';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="App">
      <Router>
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/CreateSections" element={isAuthenticated ? <CSections /> : <Navigate to="/login" />} />
          <Route path="/ManageSections" element={isAuthenticated ? <MSections /> : <Navigate to="/login" />} />
          <Route path="/Upload" element={isAuthenticated ? <Grades /> : <Navigate to="/login" />} />
          <Route path="/View" element={isAuthenticated ? <View /> : <Navigate to="/login" />} />
          <Route path="/Vquiz/:id" element={isAuthenticated ? <ViewQuiz /> : <Navigate to="/login" />} />
          <Route path="/quiz" element={isAuthenticated ? <Quiz /> : <Navigate to="/login" />} />
          <Route path="/Minahil" element={isAuthenticated ? <minahil /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
