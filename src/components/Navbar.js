import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddEmployee");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?contact=${search}`);
    setSearch("");
  };

  return (
    <div className="header">
      <Link to="/">
        <p className="logo">Employee Details</p>
      </Link>
      <div className="header-right">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="inputfield"
            placeholder="Search contact..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

            <Link to="/">
              <p
                className={`${activeTab === "Home" ? "active" : ""}`}
                onClick={() => setActiveTab("Home")}
              >
                Home
              </p>
            </Link>
            <Link to="/add">
              <p
                className={`${activeTab === "AddEmployee" ? "active" : ""}`}
                onClick={() => setActiveTab("AddEmployee")}
              >
                Add Employee
              </p>
            </Link>
            <Link to="/about">
              <p
                className={`${activeTab === "About" ? "active" : ""}`}
                onClick={() => setActiveTab("About")}
              >
                About us
              </p>
            </Link>
        
        </form>
      </div>
    </div>
  );
};

export default Navbar;
