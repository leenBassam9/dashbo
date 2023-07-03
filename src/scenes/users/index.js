import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  };
  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/ShowAllUsersProfile",
        config
      );
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUser = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://127.0.0.1:8000/api/destroy/${id}`, config);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
    setConfirmDeleteOpen(false);
  };

  const handleDeleteClick = (id) => {
    setSelectedUser(id);
    setConfirmDeleteOpen(true);
  };

  const handleCancelDelete = () => {
    setSelectedUser(null);
    setConfirmDeleteOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "average_rating",
      headerName: "Rate number",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton
          color="secondary"
          size="small"
          onClick={() => handleDeleteClick(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="  Manage Users" />
      <Box m="7px 0 0 0" height="60vh">
        <DataGrid
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      <Dialog open={confirmDeleteOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
