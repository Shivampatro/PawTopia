import './App.css';
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';
import Main from './component/Main';
import About from './component/about';
import Pet from './component/pet_adop';
import Contact from './component/contact';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
    <Router basename='/pawtopia'>
        <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/dashboard" element={<Main />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/pet_adop" element={<Pet />} />
        <Route exact path="/contact" element={<Contact />} />
      </Routes>
      </Router>
    </>
  );
}

export default App;
