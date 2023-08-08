import { useState, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';
import PresidentialRaces from '../PresidentialRaces/PresidentialRaces';
import "./App.css";
import { options} from "../../constants.js"
import FollowingPopup from '../FollowingPopup/FollowingPopup';
import Feed from '../Feed/Feed';
import Recommendations from '../Recommendations/Recommendations';

export default function App() {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  })

  const updateUser = (newUser) => {
    setUser(newUser)
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user])

  const handleLogout = () => {
    updateUser(null);
  };

  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleFollowingListClick = () => {
    setShowPopup(true);
  }

  const handleClosePopup = () => {
    setShowPopup(false);
  }

  return (
    <div className='app'>
      <UserContext.Provider value={{ user, setUser, updateUser }}>
        <BrowserRouter>
          <main>
            <div className="navbar">
              <div className="dropdown">
                  {options.map((option) => (
                  <Link key={option.value} to={option.value}> <button>{option.label}</button> </Link>
                  ))}
              </div>
              <h2 className="title">ElectionSphere</h2>
              <div className='login-section'>
                {user ? (
                  <div className='profile'>
                    <div className='user-info'>
                      <div>{user.username}</div>
                      <div>Zip Code: {user.zipcode}</div>
                      <div className="following-list" onClick={handleFollowingListClick}>Candidates Followed: {user.following.length}</div>
                    </div>
                    <div className='logout'>
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  </div>
                ) : (
                  <Link to="/login"><button>Login</button></Link>
                )}
              </div>
            </div>
            <div className="content">
              <Routes>
                <Route path='/' element={ user ? (<div className='loggedin-home'>
                                                    <Feed loggedin={true}/> 
                                                    <Recommendations /> 
                                                  </div>) : (
                                                    <Feed loggedin={false}/>
                                                  )}/>
                <Route path='/president' element={<PresidentialRaces 
                                                    selectedCandidates={selectedCandidates} 
                                                    setSelectedCandidates={setSelectedCandidates}
                                                  />}/>
                <Route path='/login' element={<LoginForm />}/>
                <Route path='/signup' element={<SignupForm />}/>
              </Routes>
            </div>
            {showPopup && (
              <FollowingPopup handleClosePopup={handleClosePopup} />
            )}
          </main>
        </BrowserRouter>
      </UserContext.Provider>
      
    </div>
  );
}