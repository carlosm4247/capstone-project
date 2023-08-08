import { useContext } from 'react';
import './Recommendations.css';
import { questionsWithOptions, partiesOrganized } from '../../constants';
import { UserContext } from '../../UserContext';
import candidateData from '../../Data/candidates.json';
import FollowButton from '../FollowButton/FollowButton.jsx'

export default function Recommendations() {

    const { user } = useContext(UserContext);

    const convertPartyToVector = (selectedParty) => {
        const vector = partiesOrganized.map((party) => (party === selectedParty ? 1 : 0));
        return vector;
    };

    const convertToVector = (stances, question) => {
        const options = questionsWithOptions[question];
        const vector = options.map((option) => (stances.includes(option[1]) ? 1 : 0));

        return vector;
    };

    const calculateHammingDistance = (vector1, vector2) => {
        if (vector1.length !== vector2.length) {
            throw new Error("Vectors must have the same length");
        }
    
        let hammingDistance = 0;
    
        for (let i = 0; i < vector1.length; i++) {
            if (vector1[i] !== vector2[i]) {
                hammingDistance++;
            }
        }
    
        return hammingDistance;
    }

    const calculateAverageHammingDistance = (stancesSet1, stancesSet2) => {
        const questions = Object.keys(questionsWithOptions);
        const similarities = questions.map((question) => {
            const vector1 = convertToVector(stancesSet1[question], question);
            const vector2 = convertToVector(stancesSet2[question], question);
            const hammingDistance = calculateHammingDistance(vector1, vector2);
            return 1 - hammingDistance / vector1.length;
        });

        const totalSimilarity = similarities.reduce((acc, similarity) => acc + similarity, 0);
        const averageSimilarity = totalSimilarity / similarities.length;

        return averageSimilarity;
    }

    const calculateCandidateScores = () => {
        const candidateScores = candidateData.candidates.map((candidate) => {
            const candidateStances = candidate.stances;
        
            const userStances = user.stances;
            const followedCandidates = candidateData.candidates.filter((c) => user.following.includes(c.name));
            const followedStances = followedCandidates.map((c) => c.stances);
        
            const userSimilarity = calculateAverageHammingDistance(userStances, candidateStances);
            
            const followedSimilarities = followedStances.map((followedStancesSet) =>
                calculateAverageHammingDistance(followedStancesSet, candidateStances)
            );

            const validFollowedSimilarities = followedSimilarities.filter((similarity) => !Number.isNaN(similarity));
            const followedSimilarity = validFollowedSimilarities.length > 0 ? 
                validFollowedSimilarities.reduce((acc, similarity) => acc + similarity, 0) / validFollowedSimilarities.length
                : 0;

            const partyVector1 = convertPartyToVector(user.preferredParty);
            const partyVector2 = convertPartyToVector(candidate.party);
            const partySimilarity = 1 - calculateHammingDistance(partyVector1, partyVector2) / partyVector1.length;
        
            const userWeight = 0.5;
            const followedWeight = 0.1;
            const partyWeight = 0.2;
            const clicksWeight = 0.2;

            let maxClicks = 0;

            for (const candidate in user.candidates) {
                const clicks = user.candidates[candidate][0];
                maxClicks += clicks;
            }

            let normalizedClicks = 0;

            if (maxClicks != 0) {
                normalizedClicks = user.candidates[candidate.name][0] / maxClicks;
            }
        
            const score = userWeight * userSimilarity + followedWeight * followedSimilarity + partyWeight * partySimilarity + clicksWeight * normalizedClicks;
        
            return {
                name: candidate.name,
                score,
            };
        });
    
        candidateScores.sort((a, b) => b.score - a.score);
      
        return candidateScores;
      };
      
      const candidateScores = calculateCandidateScores();

      const topThreeCandidates = candidateScores.filter(candidate => !user.following.includes(candidate.name)).slice(0, 3);

    return (
        <div className='recommendations-container'>
            <h3>Recommendations</h3>
            {topThreeCandidates.length > 0 ? (
                <div>
                    {topThreeCandidates.map(candidate => (
                        <div key={candidate.name}>{candidate.name} <FollowButton candidateName={candidate.name}/></div>
                    ))}
                </div>
            ) : (
                <p>"No recommendations right now"</p>
            )}
        </div>
    );
}