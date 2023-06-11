import { Box, useTheme } from "@mui/material";
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

  const [users, getUser] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/report_count"
      );
      getUser(response.data.data);
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
      headerName: " ID",
      width: 50,
    },
    {
      field: "user_name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },

    {
      field: "report_count",
      headerName: "report count",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton
          color="secondary"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            deletePost(params.row.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  const deletePost = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`);
      getUser((prevUsers) => prevUsers.filter((post) => post.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box m="20px">
      <Header title="POSTS" subtitle="Managing the Posts " />
      <Box
        m="40px 0 0 0"
        height="500px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={users} columns={columns} />
      </Box>
    </Box>
  );
};

export default Posts;
