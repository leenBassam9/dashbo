import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import axios from "axios";

const BarChartExample = () => {
  const [data, getData] = useState([]);
  useEffect(() => {
    axios
      .get(" http://127.0.0.1:8000/api/countPostsByMonth")
      .then((response) => {
        getData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart width={400} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </Box>
    </Box>
  );
};

export default BarChartExample;
