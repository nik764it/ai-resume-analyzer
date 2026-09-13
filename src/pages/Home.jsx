import NavBar from "../NavBar"
import {Link} from "react-router-dom";
export default function Home() {
  return (
    <div className="home">
      <NavBar />
      <p className = "desc">Track Your Applications &<br /> Resume Ratings</p>
      <p className = "desc2">No resumes found.Upload your first resume to get feedback.</p>
      <div className = "upload-resume-button">
        <Link to = "upload"><button className = "upload-button">Upload resume</button></Link>
        
      </div>
    </div>
  )
}