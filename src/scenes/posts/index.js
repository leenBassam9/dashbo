import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(
          "http://127.0.0.1:8000/api/ShowUserProfile"
        );
        console.log(usersResponse.data); // Log API response
        setUsers(usersResponse.data);

        const postsResponse = await axios.get(
          "http://127.0.0.1:8000/api/posts"
        );
        console.log(postsResponse.data); // Log API response
        setPosts(postsResponse.data);

        const reportsResponse = await axios.get(
          "http://127.0.0.1:8000/api/report_count/1"
        );
        console.log(reportsResponse.data); // Log API response
        setReports(reportsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("users:", users);
  console.log("posts:", posts);
  console.log("reports:", reports);

  if (loading) {
    console.log("Loading...");
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    console.log("Error:", error.message); //
    return <Typography>Error: {error.message}</Typography>;
  }

  const usersData = Array.isArray(users)
    ? users.map((user) => ({ name: user.name }))
    : [];

  const postsData = Array.isArray(posts)
    ? posts.map((post) => ({ title: post.title }))
    : [];

  const reportsData = Array.isArray(reports)
    ? reports.map((report) => ({ post_id: report.post_id }))
    : [];

  const mergedData = usersData.concat(postsData, reportsData);
  console.log("data:", mergedData); // Log combined array data

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "title",
      headerName: "Title",
      width: 250,
    },
    {
      field: "post_id",
      headerName: "Reported Post ID",
      width: 200,
    },
  ];

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
        <DataGrid checkboxSelection rows={usersData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Posts;
