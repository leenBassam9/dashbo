import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const BarChartExample = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/countPostsByMonth")
      .then((response) => {
        let modifiedData = [];
        if (Array.isArray(response.data)) {
          modifiedData = response.data.map((item) => {
            return {
              month: item.month,
              count: item.count,
            };
          });
        } else if (typeof response.data === "object") {
          modifiedData = Object.keys(response.data).map((key) => {
            return {
              month: key,
              count: response.data[key],
            };
          });
        }
        setData(modifiedData);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Bar Chart</h1>
      <BarChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default BarChartExample;
