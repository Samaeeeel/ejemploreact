import './App.css';
import { useEffect, useState} from 'react';

//const API_URL='https://backendpeteats.runasp.net/api/productos';

import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
}from './services/ProductoService'

function App() {
  const [productos, setProductos]=useState([]);
  const [form,setForm]=useState({
    CAT_DESCRIPCION:"",
    PRD_DESCRIPCION:"", 
    PRD_ESTADO:"",
    PRD_ID:"", 
    PRD_IMAGEN:"", 
    PRD_NOMBRE:"", 
    PRD_PRECIO:"", 
    PRD_STOCK:"",
    T_ANIMAL_DES:""});
  const [editId, setEditId]=useState(null);

  const cargarProductos=async()=>{
    const res=await obtenerProductos();
    setProductos(res.data)
  };

  useEffect(()=>{
    cargarProductos();
  },[]);

  const registro =async(e)=>{
    e.preventDefault();
    if(editId){
      await actualizarProducto(editId, form);
    }
    else{
      await crearProducto(form);
    }
    setForm({
    CAT_ID:"",
    T_ANIMAL_ID:"",
    PRD_NOMBRE:"", 
    PRD_DESCRIPCION:"", 
    PRD_PRECIO:"", 
    PRD_STOCK:"",
    PRD_IMAGEN:"", 
    PRD_ESTADO:"" 
    });
    setEditId(null);
    cargarProductos();
  };
  const editar=(productos)=>{
    setForm({
    CAT_ID:productos.CAT_ID,
    T_ANIMAL_ID:productos.T_ANIMAL_ID,
    PRD_NOMBRE:productos.PRD_NOMBRE, 
    PRD_DESCRIPCION: productos.PRD_DESCRIPCION, 
    PRD_PRECIO:productos.PRD_PRECIO, 
    PRD_STOCK:productos.PRD_STOCK,
    PRD_IMAGEN:productos.PRD_IMAGEN, 
    PRD_ESTADO: productos.PRD_ESTADO
    });
    setEditId(productos.PRD_ID);
  };
  const eliminar=async(id)=>{
    await eliminarProducto(id);
    cargarProductos();
  };
  
  return (
    <div style={{padding: '20px'}}>
      <h2>EJEMPLO REACT - Productos</h2>
      <form onSubmit={registro}>
        {/* <input
        type='number'
        placeholder='Id'
        value={form.PRD_ID}
        onChange={(e)=>setForm({...form, PRD_ID:e.target.value})}
        required
        /> */}
        <input
        type='number'
        placeholder='Categoría'
        value={form.CAT_ID}
        onChange={(e)=>setForm({...form, CAT_ID:e.target.value})}
        required
        />
        <input
        type='text'
        placeholder='Descripción'
        value={form.PRD_DESCRIPCION}
        onChange={(e)=>setForm({...form, PRD_DESCRIPCION:e.target.value})}
        required
        />
        <input
        type='text'
        placeholder='Estado'
        value={form.PRD_ESTADO}
        onChange={(e)=>setForm({...form, PRD_ESTADO:e.target.value})}
        required
        />
        <input
        type='text'
        placeholder='Imagen'
        value={form.PRD_IMAGEN}
        onChange={(e)=>setForm({...form, PRD_IMAGEN:e.target.value})}
        required
        />
        {form.PRD_IMAGEN&&(
          <div style={{marginTop:'10px'}}>
            <img
            src={form.PRD_IMAGEN}
            alt="Vista previa"
            style={{maxWidht:'200px', border:'1px solid #ccc'}}
            onError={(e)=>{
              e.target.src='error'
            }}
            />
          </div>
        )}
        <input
        type='text'
        placeholder='Nombre'
        value={form.PRD_NOMBRE}
        onChange={(e)=>setForm({...form, PRD_NOMBRE:e.target.value})}
        required
        />
        <input
        type='number'
        placeholder='Precio'
        value={form.PRD_PRECIO}
        onChange={(e)=>setForm({...form, PRD_PRECIO:e.target.value})}
        required
        />
        <input
        type='number'
        placeholder='Stock'
        value={form.PRD_STOCK}
        onChange={(e)=>setForm({...form, PRD_STOCK:e.target.value})}
        required
        />
        <input
        type='number'
        placeholder='Animal'
        value={form.T_ANIMAL_ID}
        onChange={(e)=>setForm({...form, T_ANIMAL_ID:e.target.value})}
        required
        />
        <button type="submit">{editId ?'Actualizar':'Crear'}</button>
      </form>
      <ul>
        {productos.map((prod) => (
          <li key={prod.PRD_ID}>
            {prod.PRD_NOMBRE} - ${prod.PRD_PRECIO}
            <button onClick={() => editar(prod)}>Editar</button>
            <button onClick={() => eliminar(prod.PRD_ID)}>Eliminar</button>
            <button onClick={() => alert(JSON.stringify(prod, null, 2))}>Ver</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
