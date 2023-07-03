import {
  Box,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import { IconButton } from "@material-ui/core";

import DeleteIcon from "@mui/icons-material/Delete";

const Posts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const getAllUsers = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/report_count",
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

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "user_name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "report_count",
      headerName: "Report Count",
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
          onClick={() => handleDeleteConfirmation(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const handleDeleteConfirmation = (id) => {
    setSelectedPostId(id);
    setOpenDialog(true);
  };

  const handleDeletePost = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/posts/${selectedPostId}`,
        config
      );
      setUsers((prevUsers) =>
        prevUsers.filter((post) => post.id !== selectedPostId)
      );
      setOpenDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box m="10px">
      <Header title="Manage Posts" />
      <Box m="7px 0 0 0" height="60vh">
        <DataGrid rows={users} columns={columns} />
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this post?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDeletePost} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Posts;
