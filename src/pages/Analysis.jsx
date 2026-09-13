import { useLocation } from "react-router-dom"
export default function Analysis(){
  const location = useLocation();
  const result = location.state;
  console.log(result);
  return(
    <div></div>
  )
}