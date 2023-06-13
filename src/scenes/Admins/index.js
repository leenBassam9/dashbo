import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"; // import GridToolbarContainer and GridToolbarExport for export functionality
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import { IconButton } from "@material-ui/core"; // import Checkbox and FormControlLabel from Material-UI
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const Admins = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const history = useNavigate();

  const [users, getUsers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]); // add state for selected row IDs

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/ShowUserProfile"
      );
      getUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleRowSelection = (selectedRowIds) => {
    setSelectedIds(selectedRowIds);
  };

  const handleDeleteSelectedRows = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/destroy`, {
        data: { ids: selectedIds },
      });
      getUsers((prevUsers) =>
        prevUsers.filter((user) => !selectedIds.includes(user.id))
      );
      setSelectedIds([]);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      minWidth: 50,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      minWidth: 200,
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Join date",
      width: 150,
      minWidth: 100,
      flex: 1,
      valueGetter: (params) => {
        const dateObj = new Date(params.value);
        return `${dateObj.toLocaleString("default", {
          month: "long",
        })} ${dateObj.getFullYear()}`;
      },
    },
    {
      field: "action",
      headerName: "Delete",
      width: 100,
      minWidth: 50,
      flex: 0.5,
      sortable: false,
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
      await axios.delete(`http://127.0.0.1:8000/api/destroy/${id}`);
      getUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box m="20px" height="60%">
      <Header title="Admins" subtitle="Managing the Admins " />
      <Box
        m="40px 0"
        height="100%"
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
          // adjust column widths for small screens
          [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
            "& .MuiDataGrid-columnsContainer": {
              flexWrap: "nowrap",
            },
            "& .MuiDataGrid-colCellTitle": {
              fontSize: "0.875rem",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "0.875rem",
            },
            "& .MuiDataGrid-row": {
              height: 52,
            },
          },
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          //   disableSelectionOnClick
          disableColumnMenu
          hideFooterRowCount
        />
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/form"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#F5F5DC !important",
            color: "#000000 !important",
            margin: "8px !important",
            borderRadius: "30px !important",
            fontSize: "12px",  
            padding: "2px 5px !important", 
          }}
        >
          Add Admin
        </Button>
      </Box>
    </Box>
  );
};

export default Admins;
