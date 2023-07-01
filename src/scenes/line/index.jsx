// import { ResponsiveLine } from "@nivo/line";
// import { tokens } from "../../theme";
// import { useTheme } from "@mui/material";
// import { useState, useEffect } from "react";

// const LineChart = () => {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/countPostsByMonth")
//       .then((response) => response.json())
//       .then((jsonData) => {
//         try {
//           if (Array.isArray(jsonData.data)) {
//             const parsedData = jsonData.data.map((item) => ({
//               x: item.month,
//               y: item.count,
//             }));
//             setChartData(parsedData);
//           } else {
//             console.error("API response is not an array:", jsonData);
//           }
//         } catch (error) {
//           console.error("Error parsing API response:", error);
//         }
//       })
//       .catch((error) => console.error("Error fetching API:", error));
//   }, []);

//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   return (
//     <ResponsiveLine
//       data={[{ id: "count", data: chartData }]}
//       margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
//       xScale={{ type: "point" }}
//       yScale={{
//         type: "linear",
//         min: 0,
//         max: "auto",
//         stacked: false,
//         reverse: false,
//       }}
//       axisTop={null}
//       axisRight={null}
//       axisBottom={{
//         orient: "bottom",
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: "Month",
//         legendOffset: 36,
//         legendPosition: "middle",
//       }}
//       axisLeft={{
//         orient: "left",
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: "Count",
//         legendOffset: -60,
//         legendPosition: "middle",
//       }}
//       colors={colors.primary.main}
//       pointSize={10}
//       pointColor={colors.primary.main}
//       pointBorderWidth={2}
//       pointBorderColor={{ from: "serieColor" }}
//       pointLabel="y"
//       pointLabelYOffset={-12}
//       useMesh={true}
//       legends={[
//         {
//           anchor: "bottom",
//           direction: "row",
//           justify: false,
//           translateX: 0,
//           translateY: 56,
//           itemsSpacing: 0,
//           itemWidth: 100,
//           itemHeight: 18,
//           itemTextColor: "#999",
//           itemDirection: "left-to-right",
//           itemOpacity: 1,
//           symbolSize: 18,
//           symbolShape: "circle",
//           effects: [
//             {
//               on: "hover",
//               style: {
//                 itemTextColor: "#000",
//               },
//             },
//           ],
//         },
//       ]}
//     />
//   );
// };

// export default LineChart;
