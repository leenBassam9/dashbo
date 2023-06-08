import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";

const Users = () => {
  const [users, setUser] = useState([]);
  const fetchDate = async () => {
    await fetch("http://127.0.0.1:8000/api/ShowUserProfile", {
      method: "GET",
    }).then((response) =>
      response.json().then((res) => {
        setUser(res.data);
      })
    );
  };
  useEffect(() => {
    fetchDate();
  }, []);

  // const { id } = useParams();

  // const [users, getUsers] = useState([]);

  // useEffect(() => {
  //   getallstudents();
  // }, []);

  // const getallstudents = () => {
  //   axios.get("http://127.0.0.1:8000/api/ShowUserProfile").then((response) => {
  //     getUsers(response.data);
  //   });
  //   axios.get("http://127.0.0.1:8000/api/ShowUserProfile").catch((error) => {
  //     console.log(error);
  //   });
  // };
  //  try{
  // const deleteUser = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:8000/api/ShowUserProfile/${id}`);
  //     getallstudents();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
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
  ];

  return (
    <Box m="20px">
      <Header title=" Our Users" />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Users;
