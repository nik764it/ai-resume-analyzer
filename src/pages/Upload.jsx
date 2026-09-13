import { useState } from "react";
import NavBar from "../NavBar"
import extractPdfText from "../utils/extractPdfText";
import i from "../assets/icons/info.svg";
import pdf from "../assets/images/pdf.png"
export default function Upload() {
  const [form, setForm] = useState({
    company: "",
    jobTitle: "",
    jobDescription: "",
    resume: null
  })

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

  async function handleSubmit(e) {
    e.preventDefault();
    const resumeText = await extractPdfText(form.resume);

    const prompt = `
      Company:${form.company}
      Job Title: ${form.jobTitle}

      Job Description:
      ${form.jobDescription}

      Resume:
      ${resumeText}
    `;

    const response = await window.puter.ai.chat(prompt);
    console.log(response.message.content);
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