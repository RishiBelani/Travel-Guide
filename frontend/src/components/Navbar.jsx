// import { Link } from 'react-router-dom';
import '../styles/navbar.css';

//the navbar is the navigation bar of the page
function Navbar() {
  return (
    //the navbar is divided into two parts
    //the first part is the logo
    //the second part is the menu
    <nav>
      <div className="logo">Travel Guide on Steroids </div>
      <ul className="menu">
        {/* <li><Link to="#">Home</Link></li> */}
      </ul>
    </nav>
  );
}

export default Navbar;