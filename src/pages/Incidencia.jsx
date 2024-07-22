/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

function Incidencia() {
  const { incidencias, fetchIncidencias } = useContext(UserContext);
  const [filters, setFilters] = useState({
    estado: '',
    desde: '',
    hasta: ''
  });

  const handleFilterChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFilters(prev => ({
        ...prev,
        estado: prev.estado === value ? '' : value
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };



  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchIncidencias(token);
    }
  }, []);

  const applyFilters = (incidencia) => {
    // Filtrar por estado
    if (filters.estado && incidencia.estado.toLowerCase() !== filters.estado.toLowerCase()) {
      return false;
    }
  
    // Filtrar por rango de fechas
    if (filters.desde && new Date(incidencia.fecha_creacion) < new Date(filters.desde)) {
      return false;
    }
    if (filters.hasta && new Date(incidencia.fecha_creacion) > new Date(filters.hasta)) {
      return false;
    }
  
    return true;
  };

  const filteredIncidencias = incidencias.filter(applyFilters);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Incidencias</h1>
      <div className="mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <label className="mr-2">Estado:</label>
            <input 
              type="checkbox" 
              id="pendiente" 
              name="estado" 
              value="pendiente" 
              className="mr-1" 
              checked={filters.estado === 'pendiente'} 
              onChange={handleFilterChange} 
            />
            <label htmlFor="pendiente" className="mr-4">Pendiente</label>
            <input 
              type="checkbox" 
              id="enProgreso" 
              name="estado" 
              value="en Progreso" 
              className="mr-1" 
              checked={filters.estado === 'en Progreso'} 
              onChange={handleFilterChange} 
            />
            <label htmlFor="enProgreso" className="mr-4">En Progreso</label>
            <input 
              type="checkbox" 
              id="resuelto" 
              name="estado" 
              value="resuelto" 
              className="mr-1" 
              checked={filters.estado === 'resuelto'} 
              onChange={handleFilterChange} 
            />
            <label htmlFor="resuelto" className="mr-4">Resuelto</label>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <input type="date" name="desde" className="border p-2 rounded" placeholder="Desde" value={filters.desde} onChange={handleFilterChange} />
          <input type="date" name="hasta" className="border p-2 rounded" placeholder="Hasta" value={filters.hasta} onChange={handleFilterChange} />
         
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Estado</th>
            <th className="p-2">Asunto</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Imagen</th>
            <th className="p-2">Creado</th>
          </tr>
        </thead>
        <tbody>
          {filteredIncidencias.map((i) => (
            <tr key={i.id} className="border-b">
              <td className="p-2">
                <span className={`inline-block w-3 h-3 rounded-full ${
                  i.estado === 'pendiente' ? 'bg-yellow-500' :
                  i.estado === 'en Progreso' ? 'bg-blue-500' :
                  i.estado === 'resuelto' ? 'bg-green-500' :
                  'bg-red-500'
                } mr-2`}></span>
                {i.estado}
              </td>
              <td className="p-2">{i.asunto}</td>
              <td className="p-2">{i.descripcion}</td>
              <td className="p-2">{i.imagen}</td>
              <td className="p-2">{new Date (i.fecha_creacion).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Incidencia;
