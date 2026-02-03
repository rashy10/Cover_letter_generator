import React from 'react';
import { useState } from 'react';

export default function Form() {
    const [letter,setLetter] = useState();




    const handleSubmit = async (event) => {
        event.preventDefault();
        const companyName = event.target.companyName.value;
        const jobDescription = event.target.jobDescription.value;
        
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
    }
  return (
    <div>
      <h1>Cover Letter Generator</h1>
      <form onSubmit={handleSubmit}  >
        
        <br />
        <label>
          Company Name:
          <input type="text" name="companyName" />
        </label>
        <br />
        <label>
          Job description:
          <input type="textarea" name="jobDescription" />
        </label>
        <br />
        <button type="submit">Generate Cover Letter</button>
      </form>
     { letter && (
        <div>
          <h2>Generated Cover Letter:</h2>
          <p>{letter}</p>
        </div>
      )}
    </div>
  );
}   