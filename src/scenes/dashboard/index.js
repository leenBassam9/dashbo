import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, useTheme } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import CategoryIcon from "@mui/icons-material/Category";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import StatBox from "../../components/StatBox";
import { tokens } from "../../theme";
import PieChart from "../../components/PieChart";

const Dashboard = () => {
  const [transactionList, getTransactionList] = useState([]);
  const [visitors, getVisitors] = useState("");
  const [postCount, getPostCount] = useState("");
  const [messagesCount, getMessageCount] = useState("");

  useEffect(() => {
    // Fetch data when component mounts
    const fetchData = async () => {
      try {
        // Make multiple API requests in parallel using Promise.all()
        const [
          transactionsResponse,
          visitorsResponse,
          categoryCountResponse,
          messageCountResponse,
        ] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/NewUsers"),
          axios.get("http://127.0.0.1:8000/api/CountAllUsers"),
          axios.get("http://127.0.0.1:8000/api/CountAllCategories"),
          axios.get("http://127.0.0.1:8000/api/CountMsg"),
        ]);

        // Update state with the fetched data
        getTransactionList(transactionsResponse.data);
        getVisitors(visitorsResponse.data.data);
        getPostCount(categoryCountResponse.data.data);
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
    <Box m="50px">
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
            icon={
              <MessageIcon
                sx={{
                  color: colors.grey[100],
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
            title="Category"
            icon={
              <CategoryIcon
                sx={{
                  color: colors.grey[100],
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
            title="Users Count"
            icon={
              <SentimentSatisfiedAltIcon
                sx={{
                  color: colors.grey[100],
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
        >
          <Typography
            variant="h4"
            color={colors.grey[100]}
            ml={"15px"}
            mt={"15px"}
          >
            Users in Governorates
            <Typography color={colors.grey[100]}>
              This chart displays the distribution of users across different
              governorates.
            </Typography>
          </Typography>
          <Box>
            <Box
              width="60%"
              maxWidth="500px"
              height="45vh"
              ml="90px"
              mt={"50px"}
            >
              <PieChart />
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
              Recent Users
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
                  {transaction.name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>
                {new Date(transaction.created_at).toLocaleString("en-US", {
                  month: "long",
                })}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
