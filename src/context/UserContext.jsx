/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [incidencias, setIncidencias] = useState([]);   // Add incidencias state
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchIncidencias = (token) => {
    axios.get('http://localhost:3000/incidencia', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setIncidencias(res.data);
      })
      .catch(error => {
        console.error('Error fetching incidencias:', error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      axios.get('http://localhost:3000/usuario/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          setUser(res.data);
          setIsAuthenticated(true);
          // fetchIncidencias(token); // Fetch incidencias after fetching user data
          // getById(res.data.id);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          // logout(); // Handle logout or error scenarios
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:3000/usuario/', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      fetchIncidencias(res.data.token); // Fetch incidencias after successful login
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const createIncidencia = async (incidencia) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      for (const key in incidencia) {
        formData.append(key, incidencia[key]);
      }
      const res = await axios.post('http://localhost:3000/incidencia/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setIncidencias(prev => [...prev, res.data]);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Incidencia creada con éxito",
        text: "Tu incidencia ha sido creada correctamente.",
        showConfirmButton: false,
        timer: 2000
      });
    } catch (error) {
      console.error('Error creating incidencia:', error);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Error al crear incidencia",
        text: "Hubo un problema al crear tu incidencia. Inténtalo de nuevo.",
        showConfirmButton: true,
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIncidencias([]); // Clear incidencias on logout
    setIsAuthenticated(true);
  };

  const updateIncidencia = async (id, descripcion) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:3000/incidencia/${id}`, 
        { descripcion }, // Asegúrate de que descripcion no sea undefined o null
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setIncidencias(prev => prev.map(inc => inc.id === res.data.id ? res.data : inc));
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Incidencia actualizada con éxito",
        text: "Tu incidencia ha sido actualizada correctamente.",
        showConfirmButton: false,
        timer: 2000
      });
    } catch (error) {
      console.error('Error updating incidencia:', error.response?.data || error);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Error al actualizar incidencia",
        text: "Hubo un problema al actualizar tu incidencia. Inténtalo de nuevo.",
        showConfirmButton: true,
      });
      throw error;
    }
  };

  const getById = async (id) => {
    try {
      console.log(id)
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró token de autenticación');
      }
  
      const response = await axios.get(`http://localhost:3000/incidencia/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setIncidencias(response.data);
  
      // if (response.data && Array.isArray(response.data)) {
      //   setIncidencias(response.data);
      // } else if (response.data && response.data.message) {
      //   console.log(response.data.message);
      //   setIncidencias([]);
      // } else {
      //   console.error('Respuesta inesperada:', response.data);
      //   setIncidencias([]);
      // }
    } catch (error) {
      console.error('Error fetching incidencias:', error);
      if (error.response && error.response.status === 403) {
        console.log('No tienes permiso para ver estas incidencias');
      }
      setIncidencias([]);
      throw error;
    }
  };

  const eliminarIncidencia = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró token de autenticación');
      }

      await axios.delete(`http://localhost:3000/incidencia/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Actualizar el estado local después de eliminar
      setIncidencias(prevIncidencias => prevIncidencias.filter(inc => inc.id !== id));

    } catch (error) {
      console.error('Error eliminando incidencia:', error);
      throw error;
    }
  };


  return (
    <UserContext.Provider value={{ loading, incidencias, isAuthenticated, user, login, logout, fetchIncidencias, createIncidencia , updateIncidencia, getById, eliminarIncidencia}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
