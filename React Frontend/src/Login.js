import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Both username and password are required');
      return;
    }
    // No dispatch action needed for login
    setFormData({ username: '', password: '' });
    setError('');
    navigate('/home');
  };

  return (
    <div className="LoginContainer">
      <div className="LoginWrapper">
        <div className="Login">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
         
          <button  className="Nbutton" onClick={() => loginWithRedirect()}>Log In</button>
        </div>
        <div className="RightSide">
          {/* Optionally, add content for the right side */}
        </div>
      </div>
    </div>
  );
};

export default Login;
