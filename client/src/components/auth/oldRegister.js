import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
// icons
import PersonIcon from "@material-ui/icons/Person";
import SaveIcon from "@material-ui/icons/Save";
// withStyles
import {
  BoxAlignLeft,
  TextPrimary,
  ButtonPrimary,
} from "../../widgets/withStyles/withStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  inner: {
    width: "95%",
    maxWidth: 400,
    margin: "16px auto",
    padding: 8,
    filter: "drop-shadow(1px 1px 2px black)",
  },
  linkText: {
    marginLeft: 4,
  },
  valid: {
    boxShadow: "-2px 2px 0px 0px springgreen",
  },
  invalid: {
    boxShadow: "-2px 2px 0px 0px lightcoral",
  },
}));

const formData = [
  {
    name: "username",
    type: "text",
    value: "",
    placeholder: "Username",
    required: true,
    minLength: 4,
    options: {
      valid: false,
      touched: false
    },
  },
  {
    name: "email",
    type: "email",
    value: "",
    placeholder: "Email Address",
    required: true,
    minLength: 6,
    info:
      "This site uses Gravatar so if you want a profile image, use a Gravatar email",
    options: {
      valid: false,
      touched: false
    },
  },
  {
    name: "password",
    type: "password",
    value: "",
    placeholder: "Enter your password",
    required: true,
    minLength: 6,
    options: {
      valid: false,
      touched: false
    },
  },
  {
    name: "password2",
    type: "password",
    value: "",
    placeholder: "Confirm password",
    required: true,
    minLength: 6,
    options: {
      valid: false,
      touched: false
    },
  },
];

const OldRegister = () => {
  const classes = useStyles();
  const [formStatus, setFormStatus] = useState(false);
  // const [formData, setFormData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   password2: "",
  // });

  // const { username, email, password, password2 } = formData;

  const [formSchema, setFormSchema] = useState(formData);

  const cleanFormState = () => {
    // setFormData({
    //   username: "",
    //   email: "",
    //   password: "",
    //   password2: "",
    // });

    setFormSchema(
      [...formSchema].map((field) => ({
        ...field,
        value: "",
        options: { valid: false },
      }))
    );

    setFormStatus(false);
  };

  const formValidation = (schema) => {
    let invalids = schema.filter((item) => !item.options.valid);
    if (invalids.length === 0) {
      setFormStatus(true);
    } else {
      setFormStatus(false);
    }
  };

  const handleTouch = (e) => {
    // touched here
  }

  const handleBlur = (e) => {
    // untouched here
  }

  const handleChange = (e) => {
    // console.log("event value: ", e.target.value);
    let updatedSchema = formSchema.map((field, index) => {
      if (field.name === e.target.name) {
        field.value = e.target.value;

        if (field.minLength <= e.target.value.length) {
          field.options.valid = true;
        } else {
          field.options.valid = false;
        }
        return field;
      } else {
        return field;
      }
    });

    // console.log("updatedScema: ", updatedSchema);

    setFormSchema(updatedSchema);
    formValidation(updatedSchema);
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    // fieldValidation((name = e.target.name), (value = e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.persist();

    let dataToSend = {};
    // form dataToSend
    formSchema.forEach((field) => (dataToSend[field.name] = field.value));
    // passwords match check
    if (dataToSend["password"] !== dataToSend["password2"]) {
      return;
    } else {
      delete dataToSend.password2;
    }

    // send request
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(dataToSend);

      const res = await axios.post("/api/users", body, config);

      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }

    // clean form DOM & form state
    cleanFormState();
    e.target.reset();

    // alert("Sumitted successufully: " + JSON.stringify(dataToSend));
  };

  // console.log("form state: ", formSchema);

  const renderFormFields = () => {
    return formSchema.map((field, index) => {
      return (
        <div key={index} className="form-group">
          <input {...field}          
           onFocus={(e) => handleTouch(e)}
           onBlur={(e) => handleBlur(e)}
           onChange={(e) => handleChange(e)} />
          {field.info && <small className="form-text">{field.info}</small>}
        </div>
      );
    });
  };

  return (
    <div className={classes.root}>
      <Paper
        elevation={0}
        classes={{
          root: classes.inner,
        }}
      >
        <TextPrimary variant="h4" color="primary" gutterBottom={true}>
          Sign Up
        </TextPrimary>

        <BoxAlignLeft>
          <PersonIcon size="small" />
          <TextPrimary variant="subtitle1">Create Your Account</TextPrimary>
        </BoxAlignLeft>

        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          {renderFormFields()}
          <ButtonPrimary
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            disabled={!formStatus}
          >
            Register
          </ButtonPrimary>
        </form>

        <BoxAlignLeft>
          <TextPrimary variant="subtitle1">
            Already have an account?
          </TextPrimary>
          <TextPrimary
            className={classes.linkText}
            variant="subtitle1"
            color="primary"
            component={Link}
            to="/login"
          >
            Sign In
          </TextPrimary>
        </BoxAlignLeft>
      </Paper>
    </div>
  );
};

export default OldRegister;
