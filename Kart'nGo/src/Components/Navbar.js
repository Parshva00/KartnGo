import React from "react";
import { Toolbar, AppBar, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const navigate = useNavigate();

  

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="toolbar">
        <div className="logo-container">
          <img
            alt="Logo"
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="search-container">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            className="search-field"
          />
          <Button variant="contained" color="primary" className="search-button">
            Search
          </Button>
        </div>
        {/* <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddItem}
            className="add-button"
          >
            Add Item
          </Button>
        </div> */}
        <div className="signup-container">
          <Button
            variant="contained"
            color="primary"
            className="profile-button"
            onClick={() => {
              navigate("/signup");
            }}
          >
            SignUp <CgProfile />
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
