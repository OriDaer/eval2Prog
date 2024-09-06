import { useState } from 'react'
import './App.css'
import axios from 'axios'
import UserList from './components/userList'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <h1>Evalucion de Programacion</h1>
      <UserList/>
    </>
  );
};

export default App

