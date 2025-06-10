import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar.jsx';
import Homepage from './pages/Homepage.jsx';
import Moviepage from './pages/Moviepage.jsx';

const App = () => {

  return (
    <div className=''>
      <Navbar />

      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/movies/:id"} element={<Moviepage />} />
      </Routes>
    </div>
  );
};

export default App;