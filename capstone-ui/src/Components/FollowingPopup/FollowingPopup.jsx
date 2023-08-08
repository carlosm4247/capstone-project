import { useContext } from "react";
import { UserContext } from "../../UserContext.js";
import "./FollowingPopup.css";

export default function FollowingPopup( { handleClosePopup }) {

    const { user } = useContext(UserContext);

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={handleClosePopup}>
                    &times;
                </span>
                <h2>Followed Candidates: </h2>
                {user.following.length > 0 ? (
                    <ul>
                        {user.following.map((candidate) => (
                            <li key={candidate}>{candidate}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No candidates followed yet.</p>
                )}
            </div>
        </div>
    )
}