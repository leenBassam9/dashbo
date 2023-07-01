import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { tokens } from "../theme";

const PieChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/percentage_of_locations")
      .then((response) => response.json())
      .then((jsonData) => {
        try {
          if (
            jsonData.status === "success" &&
            typeof jsonData.data === "object"
          ) {
            const parsedData = Object.entries(jsonData.data).map(
              ([location, value]) => ({
                id: location,
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
    <ResponsivePie
      data={chartData}
      margin={{ top: 50, right: 200, bottom: 200, left: 200 }} // Adjust the margin values to change the spacing around the chart
      innerRadius={0.5} // Adjust the inner radius to make the chart smaller
      padAngle={0.7}
      cornerRadius={3}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: "color" }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default PieChart;
