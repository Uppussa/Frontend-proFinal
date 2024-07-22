import { useNavigate } from 'react-router-dom';
import { useContext, } from 'react';
import { UserContext } from '../context/UserContext';
import imagen1 from '../assets/dragon_1.jpg';

function Navbar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-b border-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <img src={imagen1} className="h-10 w-auto rounded-xl" />
            <h1 className="ml-3 text-xl font-bold">TeamUp</h1>
          </div>
          <div className="flex items-center">
            {user && (
              <span className="mr-4">Bienvenido, {user.nombre}</span>
            )}
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
