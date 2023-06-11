import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";

const Form = () => {
  const [responseMessage, setResponseMessage] = useState("");

  const handleFormSubmit = (values) => {
    console.log(values);
    axios
      .post("http://127.0.0.1:8000/api/register", values)
      .then((response) => {
        console.log(response.data);
        setResponseMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        setResponseMessage("An error occurred while adding the admin.");
      });
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m="20px">
      <Header title="New Admin" subtitle="Add New Admin" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            {responseMessage && <div>{responseMessage}</div>}
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email} // update this line
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 3" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 3" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add New Admin
              </Button>
              {/* {isSubmitting ? "" : "Add New Admin"} */}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export default Form;
