// import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { logout } from './authSlice';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  // const username = useSelector((state) => state.auth.username);
  // const dispatch = useDispatch();

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  return (
    <nav className="navbar">
      <div className="links">
        <h1>{user.name}</h1>
        <nav>
          
          <NavLink to="/home" >Home</NavLink>
          <NavLink to="/CreateSections">Create Section</NavLink>
          <NavLink to="/ManageSections">Manage Section</NavLink>
          <NavLink to="/Upload">Upload Exams</NavLink>
          <NavLink to="/quiz">All Quiz</NavLink>
          
        </nav>
        <div className="logout">
          <NavLink to="/login" onClick={() => logout({ logoutParams: { returnTo: window.location.origin+"/login" } })}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
