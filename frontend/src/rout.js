import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Product from "./Product";
import Contacts from "./contact";
import Cart from "./Cart";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import ForgotPassword from "./components/Auth/ForgotPassword";
import BillingDetailsForm from "./Billing";
import MyAccountDashboard from "./components/UserDashboard/MyAccountDashboard";
// import AdminSignUp from "./components/Auth/AdminSignup";
import MyOrders from "./components/orders/Orders";

import Adminlogin from "./components/Auth/Adminlogin";
import AdminPanel from "./Admin/AdminPanel";
import CreateProduct from "./Admin/CreateProduct";
import AllProducts from "./Admin/AllProducts";
import AdminCategory from "./Admin/AdminCategory";
import AdminOrder from "./Admin/AdminOrder";
import AdminOrderList from "./Admin/AdminOrderList";
import { CheckAdminAuth, CheckClientAuth } from "./Auth/CheckAuth";
import AdminSignUp from "./components/Auth/AdminSignup";
import AdminGetUsers from "./Admin/AdminGetUsers";
import AllAdmins from "./Admin/AllAdmins";
import AccountDetails from "./components/UserDashboard/AccountDetails";
import UserPayment from "./components/payment/UserPayment";
import Myaccount from "./components/account/Myaccount";
import ResetPassword from "./components/Auth/ResetPassword";
import RefundPolicy from "./RefundPolicy";
import Aboutus from "./Aboutus";

const Rout = ({
  product,
  setProduct,
  details,
  view,
  close,
  setClose,
  cart,
  setCart,
  addtoCart,
  changeCartQuantity,
  deleteCartItem,
}) => {
  let { adminIsLoggedIn } = CheckAdminAuth();
  let { clientisLoggedIn } = CheckClientAuth();

  console.log("=====>", clientisLoggedIn);
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <Home
              details={details}
              view={view}
              close={close}
              setClose={setClose}
              addtoCart={addtoCart}
            />
          }
        />
        <Route
          path='/product'
          element={
            <Product
              product={product}
              setProduct={setProduct}
              details={details}
              view={view}
              close={close}
              setClose={setClose}
              addtoCart={addtoCart}
            />
          }
        />

        <Route path='/contact' element={<Contacts />} />
        <Route path='/refund' element={<RefundPolicy />} />
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/billingform' element={<BillingDetailsForm />} />
        <Route path='/adminlogin' element={<Adminlogin />} />
        <Route path='/adminsignup' element={<AdminSignUp />} />
        <Route
          path='/cart'
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              changeCartQuantity={changeCartQuantity}
              close={close}
              setClose={setClose}
              deleteCartItem={deleteCartItem}
            />
          }
        />
      </Routes>

      <Routes>
        <Route
          path='/myaccount'
          element={clientisLoggedIn ? <MyAccountDashboard /> : <Login />}
        />

        <Route
          path='/myorders'
          element={clientisLoggedIn ? <MyOrders /> : <Login />}
        />
        <Route
          path='/accountdetails'
          user={clientisLoggedIn ? <AccountDetails /> : <Login />}
        />

        <Route
          path='/payment'
          element={clientisLoggedIn ? <UserPayment /> : <Login />}
        />
        <Route
          path='account'
          element={clientisLoggedIn ? <Myaccount /> : <Login />}
        />

        {/* Admin screen Delight */}

        {/* <AdminProtectedRoutes path="/admin" component={<AdminPanel />} /> */}
        <Route path='/admin-login' element={<Adminlogin />} />
        <Route path='/admin-signup' element={<AdminSignUp />} />

        <Route
          path='/admin'
          element={adminIsLoggedIn ? <AdminPanel /> : <Adminlogin />}
        />
        <Route
          path='/admin-get-users'
          element={adminIsLoggedIn ? <AdminGetUsers /> : <Adminlogin />}
        />
        <Route
          path='/admin-get-admins'
          element={adminIsLoggedIn ? <AllAdmins /> : <Adminlogin />}
        />
        <Route
          path='/admin-create-product'
          element={adminIsLoggedIn ? <CreateProduct /> : <Adminlogin />}
        />
        <Route
          path='/all-product'
          element={adminIsLoggedIn ? <AllProducts /> : <Adminlogin />}
        />
        <Route
          path='/admin-category'
          element={adminIsLoggedIn ? <AdminCategory /> : <Adminlogin />}
        />
        <Route
          path='/admin-order-list'
          element={adminIsLoggedIn ? <AdminOrder /> : <Adminlogin />}
        />
        <Route
          path='/admin-order-list-item'
          element={adminIsLoggedIn ? <AdminOrderList /> : <Adminlogin />}
        />
      </Routes>
    </>
  );
};

export default Rout;
