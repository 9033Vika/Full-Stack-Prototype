import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, useEffect } from "react";
import { Suspense } from "react";
import Loader from "./components/Loader";
import { useDispatch } from "react-redux";
import { getProfile } from "./axios/user";
import { server } from "./constants/MISC";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Navbar = lazy(() => import("./components/Navbar"));
const Error = lazy(() => import("./pages/Error"));
const Footer = lazy(() => import("./components/Footer"));
const Testemonials = lazy(() => import("./pages/Testemonials"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const Products = lazy(() => import("./pages/Products"));
const Class = lazy(() => import("./pages/Class"));
const Course = lazy(() => import("./pages/Course"));
const Subject = lazy(() => import("./pages/Subject"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const Cart = lazy(() => import("./pages/Cart"));
const PaymentResult = lazy(() => import("./pages/PaymentResult"));
const Logout = lazy(() => import("./pages/Logout"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getProfile(dispatch, `${server}user/profile`);
  }, [dispatch]);
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testemonials />} />
          <Route path="/detail" element={<CourseDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/class/:id" element={<Class />} />
          <Route path="/login" element={<Login />} />
          <Route path="/course/:id" element={<Course />} />
          <Route path="/subject/:id" element={<Subject />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/paymentSuccess/:id" element={<PaymentResult />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
