import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import { useState } from "react";
import { useEffect } from "react";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const fetchDate = async () => {
    await fetch("http://127.0.0.1:8000/api/posts", {
      method: "GET",
    }).then((response) =>
      response.json().then((x) => {
        setPosts(x.data);
      })
    );
  };
  useEffect(() => {
    fetchDate();
  }, []);

  const [users, setUsers] = useState([]);
  const fetchDate2 = async () => {
    await fetch("http://127.0.0.1:8000/api/ShowUserProfile", {
      method: "GET",
    }).then((response) =>
      response.json().then((y) => {
        setUsers(y.data);
      })
    );
  };
  useEffect(() => {
    fetchDate2();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "title",
      headerName: "Product Name",
    },

    {
      field: "name",
      headerName: "Product User",
    },
  ];

  return (
    <Box m="20px">
      <Header title="POSTS" subtitle="Managing the Posts " />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
        <DataGrid checkboxSelection rows={users } columns={columns} />
      </Box>
    </Box>
  );
};

export default Posts;
