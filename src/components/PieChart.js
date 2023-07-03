import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { tokens } from "../theme";
import axios from "axios";
const PieChart = () => {
  const [chartData, setChartData] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    axios
      .get("http://127.0.0.1:8000/api/percentage_of_locations", config)
      .then((response) => response.data)
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
  return (
    <ResponsivePie
      data={chartData}
      margin={{ top: 20, right: 150, bottom: 150, left: 150 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: "color" }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor={colors.grey[100]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default PieChart;
