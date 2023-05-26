import { Box, Button, TextField, ImageList } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="New Admin" subtitle="Create a New Admin Profile" />

      <Formik onSubmit={handleFormSubmit}>
       <TextField> name </TextField>
      </Formik>
    </Box>
  );
};

export default Form;
