// Import necessary dependencies
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { tokens } from "../theme";

// Define the BarChart component
const BarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from API endpoint
    fetch("http://127.0.0.1:8000/api/percentage_of_locations")
      .then((response) => response.json())
      .then((jsonData) => {
        try {
          if (
            jsonData.status === "success" &&
            typeof jsonData.data === "object"
          ) {
            // Parse the fetched data and update the chartData state
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
      margin={{ top: 100, right: 200, bottom: 200, left: 200 }}
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
        // Customize style for x-axis keys
        // You can modify the fill and fontWeight properties as needed
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
        // Customize style for y-axis keys
        // You can modify the fill and fontWeight properties as needed
        tickTextColor: "#FFFFFF ",
        tickTextFontWeight: "bold",
      }}
      enableGridY={false}
      // colors={{ scheme: colors }} // Use 'scheme' property for colors
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default BarChart;
