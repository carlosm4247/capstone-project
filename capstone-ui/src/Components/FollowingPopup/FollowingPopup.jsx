import { useContext } from "react";
import { UserContext } from "../../UserContext.js";
import "./FollowingPopup.css";
import FollowButton from "../FollowButton/FollowButton.jsx"

export default function FollowingPopup( { handleClosePopup }) {

    const { user } = useContext(UserContext);

    return (
        <>
        <div className="overlay"></div>
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={handleClosePopup}>
                    &times;
                </span>
                <h2>Followed Candidates: </h2>
                {user.following.length > 0 ? (
                    <div>
                        {user.following.map((candidate) => (
                            <div key={candidate} className='followed-candidate'>
                                <span className='followed-candidate-name'>{candidate}</span>
                                <FollowButton candidateName={candidate} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No candidates followed yet.</p>
                )}
            </div>
        </div>
        </>
    )
}