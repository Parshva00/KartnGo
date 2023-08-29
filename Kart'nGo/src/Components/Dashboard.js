import React, { useState, useEffect } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import { Toolbar, AppBar, TextField, Button,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { getUser, getToken, resetUserSession } from "../utils/authToken";
import { CgProfile } from "react-icons/cg";
import itemsData from "./Itemsdata";
import axios from "axios";

import "../CSS/Dashboard.css";

const Dashboard = () => {
  const token = getToken();
  const user = getUser();

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [sellingItems, setSellingItems] = useState(itemsData);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      // If nothing is searched, display all selling items
      setFilteredItems(sellingItems);
    } else {
      // Filter the selling items based on the search term
      const filtered = sellingItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleItemClick = (item) => {
    // Toggle item selection
    setSelectedItems((prevItems) =>
      prevItems.some((selectedItem) => selectedItem.id === item.id)
        ? prevItems.filter((selectedItem) => selectedItem.id !== item.id)
        : [...prevItems, item]
    );
  };

  const handleBuyNow = () => {
    // Place the order or perform any necessary actions
    setSuccessMessage("Kartn'Go Order Status");
    setDialogOpen(true); 
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="dashboard">
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              className="search-button"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              className="profile-button signup-button"
              onClick={() => {
                navigate("/signup");
              }}
            >
              SignUp
              <CgProfile />
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="profile-button logout-button"
              onClick={() => {
                resetUserSession();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <h1 className="title">Welcome to Kart'nGo</h1>
      <div className="item-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className={`item-card ${
                selectedItems.some(
                  (selectedItem) => selectedItem.id === item.id
                )
                  ? "selected"
                  : ""
              }`}
              onClick={() => token && handleItemClick(item)}
            >
              <img src={item.image} alt={item.name} className="item-image" />
              <h2 className="item-name">{item.name}</h2>
              <p className="item-price">${item.price}</p>
            </div>
          ))
        ) : (
          <p>No matching products found.</p>
        )}
      </div>
      {token && (
        <div className="add-item-container">
          <Button
            variant="contained"
            color="primary"
            onClick={handleBuyNow}
            className="buy-now-button"
            disabled={selectedItems.length === 0}
          >
            Buy Now
          </Button>
        </div>
      )}
      {/* The Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Kart'nGo Order Status:</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your order has been placed successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};



export default Dashboard;
