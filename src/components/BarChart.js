// Import necessary dependencies
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { tokens } from "../theme";
import axios from "axios";

const BarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    axios
      .get("http://127.0.0.1:8000/api/percentage_of_locations", config)
      .then((response) => {
        const jsonData = response.data;
        try {
          if (
            jsonData.status === "success" &&
            typeof jsonData.data === "object"
          ) {
            const parsedData = Object.entries(jsonData.data).map(
              ([location, value]) => ({
                location: location,
                value: value,
              })
            );
            setChartData(parsedData);
          } else {
            console.error("Unexpected API response:", jsonData);
          }
        } catch (error) {
          console.error("Error parsing API response:", error);
        }
      })
      .catch((error) => console.error("Error fetching API:", error));
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveBar
      data={chartData}
      keys={["value"]}
      indexBy="location"
      margin={{ top: 150, right: 300, bottom: 300, left: 300 }}
      padding={0.3}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Location",
        legendPosition: "middle",
        legendOffset: 50,
        tickValues: chartData.map((data) => data.location),
        tickTextColor: "#FFFFFF !important",
        tickTextFontWeight: "bold",
      }}
      axisLeft={{
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Value",
        legendPosition: "middle",
        legendOffset: -70,
        tickTextColor: "#FFFFFF !important",
        tickTextFontWeight: "bold",
      }}
      enableGridY={false}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default BarChart;
