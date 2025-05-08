// src/App.jsx
import './App.css';
import Navbar from './components/Navbar.jsx';
import AddTasks from './components/addtasks.jsx';
import SplineBackground from './components/SplineBackground.jsx'; // 👈 Add this

export default function App() {
  return (
    <>
      <body class>
      <SplineBackground />
      <Navbar />
      <div className='flex justify-center'>
      <AddTasks/>
      </div>
      </body>
    </>
  );
}
