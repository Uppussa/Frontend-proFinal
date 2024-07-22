import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import backgroundImage from '../assets/model.png'; // Ajusta la ruta si es necesario

const Layout = () => {
  const [menuDisplayed, setMenuDisplayed] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    setMenuDisplayed(!menuDisplayed);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: '40%', // Ajusta este valor según necesites
        }}
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar-wrapper"
        className={`fixed top-0 left-0 h-full bg-purple-700 opacity-90 transition-all duration-500 flex flex-col ${
          menuDisplayed ? 'w-64' : 'w-0'
        } overflow-hidden z-50`}
      >
        <ul className="sidebar-nav list-none p-0 text-center w-full transition-all duration-500 flex flex-col justify-center h-full">
          <li className="w-full py-2 transition-all duration-300 hover:bg-purple-900">
            <Link to="/dashboard" className="block text-white">
              <button className="w-full">Home</button>
            </Link>
          </li>
          <li className="w-full py-2 transition-all duration-300 hover:bg-purple-900">
            <Link to="/new-incidencia" className="block text-white">
              <button className="w-full">Crear Incidencia</button>
            </Link>
          </li>
          <li className="w-full py-2 transition-all duration-300 hover:bg-purple-900">
            <Link to="/bitacora" className="block text-white">
              <button className="w-full">Mis incidencias</button>
            </Link>
          </li>
          {/* <li className="w-full py-2 transition-all duration-300 hover:bg-purple-900">
            <Link to="/nuevo" className="block text-white">
              <button className="w-full">Nuevo</button>
            </Link>
          </li> */}
        </ul>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 transition-all duration-500 ${menuDisplayed ? 'ml-64' : 'ml-0'}`}>
        <Navbar />

        <main className="">
          <button
            onClick={toggleMenu}
            className="mb-4 p-2 bg-purple-700 text-white  hover:bg-purple-900 transition duration-200"
          >
            {menuDisplayed ? '<' : '>'}
          </button>

          {/* Content wrapper with semi-transparent background */}
          <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;