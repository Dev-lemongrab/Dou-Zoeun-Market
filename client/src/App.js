import Header from "./components/Outlet/Header";
import Footer from "./components/Outlet/Footer";
import MainPage from "./components/MainPage/MainPage";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./components/Product/ProductDetail";
import Transaction from "./components/Payment/Transaction";
import { useSelector } from "react-redux";
import MyPage from "./components/Mypage/MyPage";
import ProductForm from "./components/Product/ProductForm";
import "./css/App.css";
import "./css/Main.scss";
import Error403 from "./components/ErrorPage/Error403";

function App() {
  const getAuthInfo = useSelector((state) => state);

  console.log(getAuthInfo);
  return (
    <div className="DouZoeun">
      <Header />
      <Routes>
        <Route path="/:id/:email" element={<Transaction />}></Route>
        <Route path="/" element={<MainPage />} />
        <Route path="/403Error" element={<Error403 />} />
        <Route path="/:id" element={<ProductDetail />} />
        <Route path="/mypage/:userId" element={<MyPage />} />
        <Route path="/new-product" element={<ProductForm />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
