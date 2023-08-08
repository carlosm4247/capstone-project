import { useContext } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from "../../UserContext.js";

export default function CandidateView({ candidateName }) {

    const { user, setUser } = useContext(UserContext);

    const handleFollow = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch("http://localhost:3001/follow", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: user.username,
              candidateName,
            }),
          });
      
          if (response.ok) {
            setUser((prevUser) => {
              return {
                ...prevUser,
                following: [...prevUser.following, candidateName],
              };
            });
          } else {
            console.error("Failed to follow candidate:", response.status, response.statusText);
          }
        } catch (error) {
            console.error("Error following candidate:", error);
        }
    };
    
    const handleUnfollow = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch("http://localhost:3001/unfollow", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: user.username,
              candidateName,
            }),
          });
    
          if (response.ok) {
            const updatedFollowing = user.following.filter(name => name !== candidateName);
            setUser(prevUser => ({
                ...prevUser,
                following: updatedFollowing,
            }));
          } else {
            console.error("Failed to unfollow candidate:", response.status, response.statusText);
          }
        } catch (error) {
            console.error("Error unfollowing candidate:", error);
        }
    };

    return (
        <div className="follow-button">
            {user ? (
                <>
                {user.following && user.following.some((cName) => cName == candidateName) ? (
                    <button onClick={handleUnfollow}>Unfollow</button>
                    ) : ( <button onClick={handleFollow}>Follow</button>)}
                </>
                ) : (
                <Link to="/login"><button>Follow</button></Link>
            )}
        </div>
    )
}