import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Overview from './components/Overview/Overview';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/overview/:id" element={<Overview />} />
    </Routes>
  );
}

export default App;