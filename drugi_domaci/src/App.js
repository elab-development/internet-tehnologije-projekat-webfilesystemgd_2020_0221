import { useState } from "react";
import LoginRegister from "./Components/LoginRegister/LoginRegister";
import Navbar from "./Components/Navbar/Navbar.jsx";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import "./index.css";
import Company from "./Components/Company/Company.jsx";
import Home from "./Components/Home/Home.jsx";
import Employees from "./Components/Employees/Employees.jsx";
import Files from "./Components/Files/Files.jsx";

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
      <Routes>
        <Route path="" element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/files" element={<Files />} />
        </Route>
        <Route path="/loginRegister" element={<LoginRegister />} />
        <Route path="/createCompany" element={<Company />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
