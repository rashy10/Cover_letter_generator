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

    const downloadAsTxt = () => {
        const blob = new Blob([letter], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'cover_letter.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const downloadAsDocx = () => {
        // Create a simple HTML representation for Word
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Cover Letter</title>
            </head>
            <body>
                <pre style="font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.5; white-space: pre-wrap;">${letter}</pre>
            </body>
            </html>
        `;
        const blob = new Blob([htmlContent], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'cover_letter.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const downloadAsPdf = () => {
        // Create a printable window
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Cover Letter</title>');
        printWindow.document.write('<style>body { font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.6; padding: 40px; white-space: pre-wrap; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(letter);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        
        setTimeout(() => {
            printWindow.print();
        }, 250);
    };

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
          <div className="download-buttons">
            <button onClick={downloadAsPdf} className="download-btn">
              Download as PDF
            </button>
            <button onClick={downloadAsDocx} className="download-btn">
              Download as DOC
            </button>
            <button onClick={downloadAsTxt} className="download-btn">
              Download as TXT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}   