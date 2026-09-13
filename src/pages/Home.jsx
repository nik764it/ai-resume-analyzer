import NavBar from "../NavBar"
export default function Home() {
  return (
    <div className="home">
      <NavBar />
      <p className = "desc">Track Your Applications &<br /> Resume Ratings</p>
      <p className = "desc2">No resumes found.Upload your first resume to get feedback.</p>
      <div className = "upload-resume-button">
        <button className = "upload-button">Upload resume</button>
      </div>
    </div>
  )
}