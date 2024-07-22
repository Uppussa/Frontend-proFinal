import { useState } from 'react';
import { Link } from 'react-router-dom';
import Incidencia from '../pages/Incidencia';
import Navbar from '../pages/Navbar';

const Dashboard = () => {
  const [menuDisplayed, setMenuDisplayed] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    setMenuDisplayed(!menuDisplayed);
  };

  return (
    <div id="wrapper" className={menuDisplayed ? "menuDisplayed" : ""}>
      {/* Sidebar */}
      <div
        id="sidebar-wrapper"
        className={`fixed top-0 left-0 h-full bg-purple-700 opacity-90 transition-all duration-500 flex flex-col ${menuDisplayed ? 'w-64' : 'w-0'
          } overflow-hidden z-50`}
      >
        <ul className="sidebar-nav list-none p-0 text-center w-full transition-all duration-500 flex flex-col justify-center h-full">
          <li className="w-full py-2 transition-all duration-300 hover:bg-purple-900">
            <Link to="" className="block text-white">
              <button className="w-full">
                Home
              </button>
            </Link>
          </li>
          <li className="w-full py-2 transition-all duration-300 hover:bg-purple-900">
            <Link to="/new-incidencia" className="block text-white">
              <button className="w-full">
                Crear Incidencia
              </button>
            </Link>
          </li>
          <li className="w-full py-2 transition-all duration-300 hover:bg-purple-900">
            <Link to="/bitacora" className="block text-white">
              <button className="w-full">
                Contact
              </button>
            </Link>
          </li>
        </ul>
      </div>


      {/* Page Content */}
      <div id="page-content-wrapper" className={`relative w-full transition-all duration-500 ${menuDisplayed ? 'pl-64' : 'pl-0'}`}>
        <div className="container-fluid">
          <Navbar />
          <div className="row">
            <div className="col-lg-12 flex justify-start">
              <button className="ml-0 text-2xl bg-purple-700 text-white  transition-all duration-300 hover:bg-purple-900 focus:outline-none" id="menu-toggle" onClick={toggleMenu}>
                <span className="inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="34" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.79 10.17a.18.18 0 0 0-.11 0l-.2.27H7a.15.15 0 0 0 .1-.06l.17-.26v-.05zm-1.47.89a.14.14 0 0 0-.11 0l-.2.26v.05h4.6a.09.09 0 0 0 .09-.06l.08-.23v-.06zM4.6 12a.13.13 0 0 0-.1.06l-.13.24v.06h2.15a.08.08 0 0 0 .07-.07v-.23s0-.07-.06-.07zm15.99-3.07a3.62 3.62 0 0 0-2.78-.5 4.09 4.09 0 0 0-2.72 1.63 4 4 0 0 0-.67 1.26h-3.14a.25.25 0 0 0-.24.16c-.14.25-.37.76-.5 1.06s0 .29.18.29h1.88a2.8 2.8 0 0 1-.26.36 1.81 1.81 0 0 1-1.65.65 1.53 1.53 0 0 1-1.32-1.53 2.07 2.07 0 0 1 1-1.85 1.71 1.71 0 0 1 1.77-.15 1.36 1.36 0 0 1 .45.37c.13.15.14.14.29.1l1.63-.43c.12 0 .16-.08.1-.16a3 3 0 0 0-1.13-1.38 3.35 3.35 0 0 0-2.58-.47A4.31 4.31 0 0 0 8.16 10a3.81 3.81 0 0 0-.82 2.85A3 3 0 0 0 8.57 15a3.46 3.46 0 0 0 2.62.65A4.06 4.06 0 0 0 14 14a4.33 4.33 0 0 0 .41-.69 3 3 0 0 0 1 1.55 3.68 3.68 0 0 0 2.38.86c.25 0 .51 0 .78-.09a4.51 4.51 0 0 0 2.33-1.25A3.72 3.72 0 0 0 22 11.1a3 3 0 0 0-1.41-2.17zm-1.78 4.73a1.81 1.81 0 0 1-1.59.06 1.61 1.61 0 0 1-.9-1.84A2.12 2.12 0 0 1 18 10.19a1.59 1.59 0 0 1 2 1.29 2.91 2.91 0 0 1 0 .32 2.11 2.11 0 0 1-1.19 1.86z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
          <Incidencia />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
