import { useState } from "react";
import NavBar from "../NavBar"
import { useNavigate } from "react-router-dom";
import extractPdfText from "../utils/extractPdfText";
import i from "../assets/icons/info.svg";
import gif from "../assets/images/resume-scan.gif"
import pdf from "../assets/images/pdf.png"
export default function Upload() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company: "",
    jobTitle: "",
    jobDescription: "",
    resume: null
  })

  const [loading, setLoading] = useState("");


  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  function handleFile(e) {
    const file = e.target.files[0];
    setForm((prev) => ({
      ...prev,
      resume: file
    }))
  }

  if (loading) {
    return (
      <div className="details">
        <NavBar />
        <div className="status">
          <div className="status-container">
            <div className="text">
              {loading === "pdf" && <p>Loading PDF...</p>}
              {loading === "ai" && <p>Analyzing...</p>}
              {loading === "complete" && <p>Resume analyzed!</p>}
            </div>
            <div className="gif-container">
              <img src={gif} className="gif" />
            </div>
          </div>
        </div>
      </div>
    )
  }
  async function handleSubmit(e) {
    e.preventDefault();

    setLoading("pdf");

    const resumeText = await extractPdfText(form.resume);
    setLoading("ai");


    const prompt = `
      Company:${form.company}
      Job Title: ${form.jobTitle}

      Job Description:
      ${form.jobDescription}

      Resume:
      ${resumeText}

      Return only valid JSON in this exact structure:

      {
       "atsScore": 0,
       "summary": "",
       "strengths": [],    
       "weaknesses": [],
       "missingSkills": [],
       "improvements": []
      }
    `;

    const response = await window.puter.ai.chat(prompt);
    setLoading("complete");
    const parsedResult = JSON.parse(response.message.content);
 

    navigate("/analysis",{
      state:parsedResult
    });

    console.log(parsedResult);
  }



  return (
    <div className="details">
      <NavBar />
      <p className="desc3">Smart feedback for your dream<br /> job</p>
      <p className="desc4">Drop your resume for an ATS score and improvement tips</p>

      <div className="form-c">
        <form onSubmit={handleSubmit}>
          <label htmlFor="company-name">Company name</label>
          <input value={form.company} onChange={handleChange} id="company-name" name="company" placeholder="Company name" />

          <label htmlFor="job-title">Job Title</label>
          <input value={form.jobTitle} onChange={handleChange} id="job-title" name="jobTitle" placeholder="Job Title" />

          <label htmlFor="job-description">Job Description</label>
          <textarea value={form.jobDescription} onChange={handleChange} id="job-description" name="jobDescription" placeholder="Job Description"></textarea>

          <div className="file">
            <input id="resume" onChange={handleFile} name="resume" type="file" accept=".pdf" />

            <label htmlFor="resume">
              <div className="upload-icon">
                <img src={form.resume == null ? i : pdf} className="i-image" />
              </div>
              <div>{form.resume == null ? <span>Click to upload or drag and drop</span> : <span>{form.resume.name}</span>} </div>
              <div>PDF (max 20 MB)</div>
            </label>

          </div>

          <div className="u">
            <button type="submit" className="upload-btn">Upload resume</button>
          </div>

        </form>
      </div>
    </div>
  )
}