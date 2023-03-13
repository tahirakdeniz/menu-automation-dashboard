import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>This is the home page</h1>
      <Link to="log-in">Click to view our login page</Link>
      <Link to="signup">Click to view our signup page</Link>
      {/* <Link to="company">Click to view our company page</Link>
      <Link to= "deneme">Click to view Deneme</Link> */}
    </div>
  );
}

export default Home;