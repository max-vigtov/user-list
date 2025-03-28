import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para obtener los usuarios de la API
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de usuarios');
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Filtrar usuarios cuando cambia el término de búsqueda
    if (searchTerm === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '1.5rem'
      }}>Lista de Usuarios</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.8rem',
            width: '100%',
            maxWidth: '500px',
            borderRadius: '8px',
            border: '2px solid #dfe6e9',
            fontSize: '1rem',
            margin: '0 auto',
            display: 'block',
            outline: 'none',
            transition: 'border 0.3s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            ':focus': {
              borderColor: '#0984e3'
            }
          }}
        />
      </div>
      
      <div style={{ display: 'grid', gap: '1rem' }}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div 
              key={user.id}
              style={{
                padding: '1.5rem',
                border: '1px solid #dfe6e9',
                borderRadius: '12px',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                ':hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }
              }}
            >
              <h3 style={{ 
                margin: '0 0 0.5rem 0',
                color: '#2d3436',
                fontSize: '1.2rem'
              }}>{user.name}</h3>
              <p style={{ 
                margin: '0', 
                color: '#636e72',
                fontSize: '0.9rem'
              }}>{user.email}</p>
            </div>
          ))
        ) : (
          <p style={{
            textAlign: 'center',
            color: '#636e72',
            padding: '2rem'
          }}>No se encontraron usuarios que coincidan con la búsqueda.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;