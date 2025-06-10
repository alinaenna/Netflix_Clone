import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar.jsx';
import Homepage from './pages/Homepage.jsx';
import Moviepage from './pages/Moviepage.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';

const App = () => {

  return (
    <div className=''>
      <Navbar />

      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/movies/:id"} element={<Moviepage />} />
        <Route path={"/signin"} element={<SignIn />} />
        <Route path={"/signup"} element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;