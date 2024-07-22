/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";


const BitacoraTable = () => {
  const { incidencias, user, getById, eliminarIncidencia, updateIncidencia  } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {

        try {
          setLoading(true);
          await getById(user.id);
        } catch (error) {
          console.error("Error fetching incidencias:", error);
          setError("Error al cargar las incidencias. Por favor, intenta de nuevo más tarde.");
          if (error.response && error.response.status === 403) {
            setError("No tienes permiso para ver estas incidencias.");
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        width: 600,
        text: "No podrás revertir esta acción!",
        padding: "3em",
        color: "#716add",
        icon: 'warning',
        background: "#fff url(/images/trees.png)",
        backdrop: `
    rgba(0,0,123,0.4)
    url("/public/cat.gif")
    left top
    no-repeat
  `,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      });

      if (result.isConfirmed) {
        await eliminarIncidencia(id);
        Swal.fire(
          'Eliminado!',
          'La incidencia ha sido eliminada.',
          'success'
        );
      }
    } catch (error) {
      console.error("Error al eliminar la incidencia:", error);
      Swal.fire(
        'Error',
        'No se pudo eliminar la incidencia.',
        'error'
      );
    }
  };

  const handleEdit = async (incidencia) => {
    try {
      const { value: formValues } = await Swal.fire({
        title: 'Actualizar Incidencia',
        html: `<input id="swal-descripcion" class="swal2-input" placeholder="Descripción" value="${incidencia.descripcion}">`,
        preConfirm: () => {
          const descripcion = document.getElementById('swal-descripcion').value;
          if (!descripcion.trim()) {
            Swal.showValidationMessage('La descripción no puede estar vacía');
          }
          return { descripcion };
        },
      });
  
      if (formValues && formValues.descripcion) {
        await updateIncidencia(incidencia.id, formValues.descripcion);
        Swal.fire('Actualizado!', 'La incidencia ha sido actualizada.', 'success');
      }
    } catch (error) {
      console.error("Error al actualizar la incidencia:", error);
      Swal.fire('Error', 'No se pudo actualizar la incidencia.', 'error');
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!incidencias || incidencias.length === 0) {
    return <div>No se encontraron incidencias.</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Mis Incidencias</h2>
      <div className="mb-4 flex justify-between items-center">
        {/* ... (controles de la tabla) ... */}
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Estado</th>
            <th className="p-2">Descripcion</th>
            <th className="p-2">imagen</th>
            <th className="p-2">fecha</th>
            <th className="p-2">actualizado</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {incidencias.map((i, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{i.estado}</td>
              <td className="p-2">{i.descripcion}</td>
              <td className="p-2">{i.imagen}</td>
              <td className="p-2">{new Date(i.fecha_creacion).toLocaleDateString()}</td>
              <td className="p-2">{new Date(i.fecha_actualizacion).toLocaleDateString()}</td>
              <td className="p-2 flex">
              <button onClick={() => handleEdit(i)} className="text-blue-500 hover:text-blue-700 mr-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: "currentColor" }}>
      <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/>
    </svg>
  </button>
  <button onClick={() => handleDelete(i.id)} className="text-red-500 hover:text-red-700">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: "currentColor" }}>
      <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
    </svg>
  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* ... (paginación) ... */}
    </div>
  );
};

export default BitacoraTable;