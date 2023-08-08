import { useState } from "react";
import FollowButton from "../FollowButton/FollowButton.jsx";
import candidateData from '../../Data/candidates.json';
import "./CandidateView.css"

export default function CandidateView({ candidateName }) {

    const candidate = candidateData.candidates.find((c) => c.name === candidateName);

    if (!candidate) {
        return <div className="candidate-view">Candidate not found.</div>;
    }

    const [selectedCategory, setSelectedCategory] = useState("bio");

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="candidate-view">
            <div className="topbar">
                <div className="candidate-name">
                    {candidateName}
                </div>
                <div className="follow-button-container">
                  <FollowButton candidateName={candidateName} />
                </div>
            </div>
            <div className="details">
                <div className="categories">
                    <div className={`category ${selectedCategory === "bio" ? "selected" : ""}`} onClick={() => handleCategoryClick("bio")}> 
                        Bio
                    </div>
                    <div className={`category ${selectedCategory === "position_summary" ? "selected" : ""}`} onClick={() => handleCategoryClick("position_summary")}>
                        Position Summary
                    </div>
                    <div className={`category ${selectedCategory === "stances" ? "selected" : ""}`} onClick={() => handleCategoryClick("stances")}>
                        Stances
                    </div>
                </div>
                <div className="category-content">
                    {selectedCategory === "bio" && (
                        <div className="bio-content">
                            <p>Date of Birth: {candidate.bio[0].dob}</p>
                            <p>Offices Held:</p>
                                <ul>
                                    {candidate.bio[0].offices_held.map((office, index) => (
                                        <li key={index}>{office}</li>
                                    ))}
                                </ul>
                            <p>{candidate.bio[0].intro}</p>
                        </div>
                    )}
                    {selectedCategory === "position_summary" && (
                        <div className="position-summary-content">
                            <p>{candidate.position_summary}</p>
                        </div>
                    )}
                    {selectedCategory === "stances" && (
                        <div className="stances-content">
                            {/* Render the stances without the tag */}
                            {Object.entries(candidate.stances).map(([question, answer]) => (
                                <div key={question}>
                                    <p>{question}</p>
                                    <p>{answer[1]}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}