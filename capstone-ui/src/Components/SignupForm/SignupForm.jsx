import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { questionsWithOptions, parties, baseCandidates } from "../../constants";
import "./SignupForm.css";

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [stances, setStances] = useState({})
    const [preferredParty, setPreferredParty] = useState("");
    const [candidates, setCandidates] = useState(baseCandidates);

    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const isValidZip = (zip) => {
        return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            if (!isValidZip(zipcode)) {
                alert("Invalid ZIP code");
                return;
            }

            const response = await fetch('http://localhost:3001/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, zipcode, stances, preferredParty, candidates }),
                credentials: "include"
            });

            if (response.ok) {
                const data = await response.json();
                const loggedInUser = data.user

                setUsername("");
                setPassword("");
                setZipcode("");
                setStances({});
                setPreferredParty("");
                setCandidates(baseCandidates);

                updateUser(loggedInUser);

                navigate("/");
            }
            else {
                const data = await response.json();
                const error = data.error;
                alert("Signup failed: " + error);
            }
        }
        catch(error) {
            alert('Signup failed: ' + error);
        }
    };

    return (
        <div className="signup-form-container">
            <form className="signup-form" onSubmit={handleSignup}>
                <h2>Sign Up</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="zipcode">Zip Code:</label>
                    <input 
                        type="number" 
                        id="zipcode"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="preferred-party">Preferred Party:</label>
                    <select
                        id="preferred-party"
                        value={preferredParty}
                        onChange={(e) => {
                            setPreferredParty(e.target.value)
                        }}
                        required
                        >
                        <option value="">Select your party:</option>
                        {parties.map((party, index) => (
                            <option key={index} value={party}>
                            {party}
                            </option>
                        ))} 
                    </select>
                </div>
                <h3>Stances</h3>
                {Object.entries(questionsWithOptions).map(([question, options]) => (
                <div className="form-group" key={question}>
                    <div className="stances">
                    <label htmlFor={question}>{question}</label>
                    <select
                        id={question}
                        value={stances[question] ? stances[question][1] : ""}
                        onChange={(e) => {
                            const selectedOption = e.target.value;
                            const selectedTagAndOption = options.find(
                            (opt) => opt[1] === selectedOption
                            );

                            setStances((prevStances) => ({
                            ...prevStances,
                            [question]: selectedTagAndOption ? selectedTagAndOption : "",
                            }));
                        }}
                        required
                        >
                        <option value="">Select your stance</option>
                        {options.map((option, index) => (
                            <option key={index} value={option[1]}>
                            {option[1]}
                            </option>
                        ))}
                    </select>
                    </div>
                </div>
                ))}
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};

export default SignupForm;