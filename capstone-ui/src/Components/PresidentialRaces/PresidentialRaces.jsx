import { useState } from "react";
import InteractiveMap from "../InteractiveMap/InteractiveMap";
import ResultsBox from "../ResultsBox/ResultsBox";
import CandidateView from "../CandidateView/CandidateView";
import "./PresidentialRaces.css";
import electionResults from "../../Data/2020presidential.json";

export default function PresidentialRaces({ selectedCandidates, setSelectedCandidates }) {

    const [locationLevel, setLocationLevel] = useState(1);
    const [stateName, setStateName] = useState(null);
    const [showBackButton, setShowBackButton] = useState(false);
    const [selectedState, setSelectedState] = useState(null);

    const handleBackButton = (bool) => {
        if (!bool) {
            setLocationLevel(1);
            setSelectedState(null); 
            setSelectedCandidates([]);
            setStateName(null);
        }
        setShowBackButton(bool);
    }

    const handleLocation = (level) => {
        setLocationLevel(level);
    }

    const handleState = (state) => {
        setStateName(state)
        setSelectedCandidates([]);
    }

    return (
        <div className="presidential-races">
            <div className="map-container">
                <InteractiveMap 
                    handleLocation = {handleLocation}
                    handleState= {handleState}
                    handleBackButton={handleBackButton}
                    selectedState={selectedState}
                    setSelectedState={setSelectedState}
                />
                {showBackButton && (<button className="back-button" onClick={() => handleBackButton(false)}>Back</button>)}
            </div>
            <div className="info">
                <div className="results-container">
                    {stateName != null ? 
                        (<h2>{electionResults.data.races.find((race) => race.state_slug === stateName).state_name} Results</h2>) 
                        : 
                        (<h2>Country Results</h2>)}
                    <ResultsBox 
                        locationLevel={locationLevel}
                        selectedCandidates={selectedCandidates}
                        setSelectedCandidates={setSelectedCandidates}
                        stateName={stateName}
                    />
                </div>
                <div className="candidate-comparison-container">
                    {selectedCandidates ? (selectedCandidates.map((candidate) => (
                                <CandidateView
                                    key={candidate.key}
                                    candidateName={candidate.name}
                                />
                            ))) : <></>}
                </div>
            </div>
        </div>
    )
}