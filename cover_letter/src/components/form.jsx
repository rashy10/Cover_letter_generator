import React from 'react';
import { useState } from 'react';

export default function Form() {
    const [letter,setLetter] = useState();
    const [loading, setLoading] = useState(false);




    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const companyName = event.target.companyName.value;
        const jobDescription = event.target.jobDescription.value;
        
        try {
            const response = await fetch("https://zvj4bb0x1m.execute-api.us-east-2.amazonaws.com/default/cover_letter_generator",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    companyName: companyName,
                    jobDescription: jobDescription,
                }), 

            })

            const data = await response.json();
            console.log(data);
            setLetter(data.coverLetter);
        } catch (error) {
            console.error("Error generating cover letter:", error);
        } finally {
            setLoading(false);
        }
    }
  return (
    <div>
      <div className="form-container">
        <h1>Cover Letter Generator</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="companyName">
              Company Name:
            </label>
            <input 
              type="text" 
              id="companyName"
              name="companyName" 
              required
              placeholder="Enter company name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="jobDescription">
              Job Description:
            </label>
            <textarea 
              id="jobDescription"
              name="jobDescription" 
              required
              placeholder="Paste the job description here..."
            />
          </div>
          
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Generating..." : "Generate Cover Letter"}
          </button>
        </form>
      </div>
      
      {letter && (
        <div className="result-container">
          <h2>Generated Cover Letter:</h2>
          <textarea 
            className="editable-letter"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            rows="20"
          />
        </div>
      )}
    </div>
  );
}   