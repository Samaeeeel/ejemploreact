import axios from 'axios';

const API_URL='https://backendpeteats.runasp.net/api/productos';

export const obtenerProductos = ()=>axios.get(API_URL);
export const obtenerProductosPorId=(id)=>axios.get(`${API_URL}/${id}`);
export const crearProducto = (producto)=>axios.post(API_URL, producto);
export const actualizarProducto = (id, producto)=> axios.put(`${API_URL}/${id}`, producto);
export const eliminarProducto = (id)=> axios.delete(`${API_URL}/${id}`);