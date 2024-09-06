import React, { useState, useEffect } from "react";
import axios from 'axios';

const UserList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [buscar, setBuscar] = useState('');

    const handleCorreo = (event) => {
        setCorreo(event.target.value);
    };

    const handleNombre = (event) => {
        setNombre(event.target.value);
    };

    const DataUsuarios = () => {
        axios.get('http://localhost:3000/usuarios')
            .then(response => {
                setUsuarios(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleAgregarUsuario = (event) => {
        event.preventDefault();
        const nuevoUsuario = { name: nombre, email: correo };
        axios.post('http://localhost:3000/usuarios', nuevoUsuario)
            .then(() => {
                setUsuarios([...usuarios, nuevoUsuario]);
                setNombre('');
                setCorreo('');
            })
            .catch(error => {
                console.error('Error, no se pudo añadir usuario:', error);
            });
    };

    const handleElimUsuario = (id) => {
        axios.delete(`http://localhost:3000/usuarios/${id}`)
            .then(() => {
                setUsuarios(usuarios.filter(usuario => usuario.id !== id));
            })
            .catch(error => {
                console.error('Error tratando de eliminar al usuario:', error);
            });
    };

    useEffect(() => {
        DataUsuarios();
    }, []);

    const filtraUsuarios = usuarios.filter(usuario =>
        usuario.name.toLowerCase().includes(buscar.toLowerCase())
    );

    return (
        <div>
            <h3>Lista de Usuarios</h3>
            <p>Ingrese en el primer espacio su nombre y en el segundo su correo</p>
            <form onSubmit={handleAgregarUsuario}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={handleNombre}
                />
                <input
                    type="email"
                    placeholder="Correo"
                    value={correo}
                    onChange={handleCorreo}
                />
                <input
                    type="text"
                    placeholder="Buscar nombre"
                    value={buscar}
                    onChange={e => setBuscar(e.target.value)}
                />
                <button type="submit">Agregar Usuario</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Eliminar información</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.name}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button onClick={() => handleElimUsuario(usuario.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
