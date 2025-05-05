import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Overview from './components/Overview/Overview';
import Noticias from './components/Noticias/Noticias';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/overview/:SIAFE" element={<Overview />} />
      <Route path="/noticias" element={<Noticias />}/>
    </Routes>
  );
} 

export default App;