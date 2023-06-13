import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";

import MessageIcon from "@mui/icons-material/Message";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { tokens } from "../../theme";

const Dashboard = () => {
  const [t, setT] = useState([]);
  const [count, setCount] = useState("");
  const [visitors, setVisitors] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    const fetchRecentTransactions = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/RecentTransactions",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setT(data.data);
    };

    const fetchPostCount = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/countPosts", {
        method: "GET",
      });
      const data = await response.json();
      setCount(data.data);
    };

    const fetchVisitors = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/visitors");
        setVisitors(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMessageCount = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/CountMsg");
        setMessages(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecentTransactions();
    fetchPostCount();
    fetchVisitors();
    fetchMessageCount();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="15px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dakesh Dashboard" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            fontSize: "20px",
            "&:hover": {
              backgroundColor: "primary.dark",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <StatBox
            subtitle="Messages Sent"
            progress="0.90"
            icon={
              <MessageIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />

          <Typography mr={"20px"} fontSize={"20px"}>
            {messages}
          </Typography>
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            fontSize: "20px",
            "&:hover": {
              backgroundColor: "primary.dark",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <StatBox
            subtitle="Today Transactions"
            icon={
              <CalendarTodayIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />

          <Typography mr={"20px"} fontSize={"20px"}>
            {count}
          </Typography>
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            fontSize: "20px",
            "&:hover": {
              backgroundColor: "primary.dark",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <StatBox
            subtitle="New Visitors"
            icon={
              <SentimentSatisfiedAltIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "30px",
                }}
              />
            }
          />

          <Typography mr={"20px"} fontSize={"20px"}>
            {visitors}
          </Typography>
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <div>{/* <BarChartExa /> */}</div>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          flexDirection="column"
          display="flex"
        >
          <Box
            height={"100px"}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {t.map((transaction, i) => (
            <Box
              key={`${transaction.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
              sx={{
                "&:hover": {
                  backgroundColor: "primary.dark",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              height={"fit-content"}
              // width={"fit-content"}
              //
            >
              <Box maxHeight={"80%"}>
                <Typography color={colors.grey[100]}>
                  {transaction.user.name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.title}</Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
      </Box>
    </Box>
  );
};

export default Dashboard;
