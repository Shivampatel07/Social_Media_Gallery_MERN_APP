import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Userprofile from "./components/Userprofile";
import { Signin, Signup } from "./components/Form";
import Uploadpost from "./components/Uploadpost";
import Otherprofile from "./components/Otherprofile";
import Category from "./components/Category";
import { AuthProvider, useAuth } from "./components/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Appcontent() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Header />{" "}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/uploadpost" element={<Uploadpost />} />
            <Route path="/userprofile" element={<Userprofile />} />
            <Route path="/otherprofile/:username" element={<Otherprofile />} />
            <Route path="/*" element={<Navigate to="/userprofile" />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<Navigate to="/signin" />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Appcontent />
      </Router>
    </AuthProvider>
  );
}
export default App;
