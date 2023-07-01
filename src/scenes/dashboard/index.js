import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, useTheme } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import { tokens } from "../../theme";

const Dashboard = () => {
  const [transactionList, getTransactionList] = useState([]);
  const [postCount, getPostCount] = useState("");
  const [visitors, getVisitors] = useState("");
  const [messagesCount, getMessageCount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          transactionsResponse,
          postCountResponse,
          visitorsResponse,
          messageCountResponse,
        ] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/RecentTransactions"),
          axios.get("http://127.0.0.1:8000/api/countPosts"),
          axios.get("http://127.0.0.1:8000/api/visitors"),
          axios.get("http://127.0.0.1:8000/api/CountMsg"),
        ]);

        getTransactionList(transactionsResponse.data.data);
        getPostCount(postCountResponse.data.data);
        getVisitors(visitorsResponse.data);
        getMessageCount(messageCountResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="35px">
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
            title="Messages Sent"
            progress="0.90"
            icon={
              <MessageIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
            value={messagesCount}
          />
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
            title="Today Transactions"
            icon={
              <CalendarTodayIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
            value={postCount}
          />
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
            title="New Visitors"
            icon={
              <SentimentSatisfiedAltIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "30px",
                }}
              />
            }
            value={visitors}
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          // display="flex"
          // flexDirection="column"
          // justifyContent="center"
          // alignItems="center"
        >
          {" "}
          <Typography
            variant="h5"
            fontWeight="600"
            color={colors.grey[100]}
            ml={"10px"}
          >
            Item Exchanged By Month
          </Typography>
          <Box>
            <Box width="100%" maxWidth="1000px" height="45vh">
              <LineChart />
            </Box>
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
          {transactionList.map((transaction, i) => (
            <Box
              key={`${transaction.id}-${i}`} // to put ids to each transaction
              //(its id-uniques new "i")
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
      </Box>
    </Box>
  );
};

export default Dashboard;
