import './App.css'

// React Router
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Pages
import HomePage from './pages/HomePage';
import FCFS from './schedulers/FCFS';
import SJF from './schedulers/SJF';
import MLFQ from './schedulers/MLFQ';
import Test from './pages/Test'

export default function App() {
  return (
    <BrowserRouter basename={window.location.pathname || ''}>
      <Routes>
        <Route exact path="/" element={<Test/>} />
        <Route path='/FCFS' element={<FCFS />}/>
        <Route path='/SJF' element={<SJF />}/>
        <Route path='/MLFQ' element={<MLFQ />}/>
      </Routes>
    </BrowserRouter>
  )
}