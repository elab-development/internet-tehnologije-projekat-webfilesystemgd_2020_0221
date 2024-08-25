import { useState } from "react";
import LoginRegister from "./Components/LoginRegister/LoginRegister";
import Navbar from "./Components/Navbar/Navbar.jsx";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import "./index.css";
import Company from "./Components/Company/Company.jsx";
import Home from "./Components/Home/Home.jsx";
import Employees from "./Components/Employees/Employees.jsx";

function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <Navbar />
    //     <div className="content">
    //       <Switch>
    //         <Route exact path="/">
    //           <Home />
    //         </Route>
    //         <Route path="/create">
    //           <Create />
    //         </Route>
    //         <Route path="/blogs/:id">
    //           <BlogDetails />
    //         </Route>
    //         <Route path="*">
    //           <NotFound />
    //         </Route>
    //       </Switch>
    //     </div>
    //   </div>
    // </Router>
    <BrowserRouter className="container">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/loginRegister" element={<LoginRegister />} />
        <Route path="/createCompany" element={<Company />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
