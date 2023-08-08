import { useContext, useState } from 'react';
import electionResults from "../../Data/2020presidential.json"
import "./ResultsBox.css"
import { unclickables } from '../../constants.js';
import { UserContext } from '../../UserContext';

export default function ResultsBox( { locationLevel, countyFIPS, selectedCandidates, setSelectedCandidates, stateName } ) {
    //locationLevels: 1 = country, 2 = state, 3 = county

    let data = []
    let candidates = []
    const pageSize = 5;
    const [candidatesShowing, setCandidatesShowing] = useState(pageSize);
    const { user } = useContext(UserContext);

    function addCandidate(key, name, voteCount, percentage) {
        let candidate = {
            key: key,
            name: name,
            voteCount: voteCount,
            percentage: percentage
        };
        candidates.push(candidate);
    }

    if (locationLevel === 1) {
        data = electionResults.data.party_control.find((race) => race.race_type === "president").parties

        for (let party in data) {
            const key = data[party].party_id;
            const name = data[party].name_display;
            const voteCount = data[party].votes;
            const percentage = data[party].percent;
        
            addCandidate(key, name, voteCount, percentage);
        }
    }
    else if (locationLevel === 2) {
        data = electionResults.data.races.find( (race) => race.state_slug === stateName ).candidates

        data.map((candidate) => {
            const key = candidate.candidate_key;
            const name = candidate.name_display;
            const voteCount = candidate.votes;
            const percentage = candidate.percent;

                addCandidate(key, name, voteCount, percentage);
        })
    }
    else {
        data = electionResults.data.races.find( (race) => race.state_slug === stateName ).counties.find((county) => (county.fips%1000) == (countyFIPS%1000))

        for (let candidate in data.results) {
            const key = candidate;
            const name = electionResults.data.races.find( (race) => race.state_slug === stateName ).candidates.find((person) => person.candidate_key === key).name_display;
            const voteCount = data.results[candidate]
            const percentage = Math.round((voteCount/data.votes*100) * 10) / 10

            addCandidate(key, name, voteCount, percentage);
        }
    }

    candidates.sort((a, b) => b.voteCount - a.voteCount);

    async function handleClick(key, name, e) {
      e.preventDefault()

      try {
        const clickedCandidate = candidates.find(candidate => candidate.name === name);

        if (clickedCandidate) {
          const response = await fetch("http://localhost:3001/click", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: user.username,
              candidateName: clickedCandidate.name
            }),
          });

          if (response.ok) {
            const { clickCount } = await response.json();
          } else {
            console.error("Failed to update click count:", response.status, response.statusText);
          }
        }
      }
      catch (error) {
        console.error("Error clicking candidate:", error);
      }

      if (!unclickables.includes(name)) {
        setSelectedCandidates((selected) => {
            const foundCandidate = selected.findIndex((candidate) => candidate.key === key);
            if (foundCandidate !== -1) {
                return selected.filter((candidate) => candidate.key !== key);
            } else {
                const updatedCandidates = selected.concat({ key, name });
                return updatedCandidates.slice(-2);
            }
        });
      }
  }

    return (
        <div className="results-box">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Vote Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {candidates.slice(0, Math.min(candidatesShowing, candidates.length)).map((candidate) => (
                <tr key={candidate.key}
                    onClick={() => handleClick(candidate.key, candidate.name, event)}
                    className={ (selectedCandidates && (selectedCandidates.some((c) => c.key === candidate.key))) ? "selected" : ""}
                    >
                  <td>{candidate.name != "None of these candidates" ? (candidate.name) : ("Independent")}</td>
                  <td>{candidate.voteCount}</td>
                  <td>{candidate.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {locationLevel != 3 && candidatesShowing < candidates.length && (
            <button onClick={() => setCandidatesShowing((prev) => prev + pageSize)}>
              Show More
            </button>
          )}
        </div>
    )
}