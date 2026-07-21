import './App.css';
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';
import Main from './component/Main';
import About from './component/about';
import Pet from './component/pet_adop';
import Contact from './component/contact';
import Accessories from './component/Accessories';
import AdminLogin from './component/AdminLogin';
import AdminDashboard from './component/AdminDashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const basename = window.location.hostname.includes('github.io') ? '/pawtopia' : '';
  return (
    <>
    <Router basename={basename}>
        <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/dashboard" element={<Main />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/pet_adop" element={<Pet />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/accessories" element={<Accessories />} />
        <Route exact path="/admin-login" element={<AdminLogin />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      </Router>
    </>
  );
}

export default App;
