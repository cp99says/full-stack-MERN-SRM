import * as React from "react";
import "./Login.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
var axios = require("axios");

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const [open, setOpen] = React.useState(false);

  const moveBackToLoginFromSignup = () => {
    setOpen(true);
    var gend;
    if (document.getElementById("male").checked) {
      gend = document.getElementById("male").value;
    } else {
      gend = document.getElementById("female").value;
    }
    var data = JSON.stringify({
      full_name: document.getElementById("nameSignup").value,
      username: document.getElementById("usernameSignup").value,
      email: document.getElementById("emailSignup").value,
      contact_number: document.getElementById("numberSignup").value,
      gender: gend,
      password: document.getElementById("password1Signup").value,
    });

    var config = {
      method: "post",
      url: "http://3.108.42.38:3000/api/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status == "success") {
          window.alert("Account Successfully Created!");
          setTimeout(function () {
            document.querySelector(".bg-modal-signup").style.display = "none";
          }, 3000);
        } else {
          window.alert("Credential already exitsts!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  async function goToHomepage() {
    var loginUserNameInput = document.getElementById("userNameLogin").value;
    var loginPasswordInput = document.getElementById("passwordLogin").value;
    var data = JSON.stringify({
      email: loginUserNameInput,
      password: loginPasswordInput,
    });

    var config = {
      method: "post",
      url: "http://3.108.42.38:3000/api/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status == "success") {
          window.location.href = "http://localhost:3000/ChooseCity";
        } else {
          window.alert("Incorrect Credentials!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async function openSignUp() {
    document.querySelector(".bg-modal-signup").style.display = "flex";
  }
  async function closeSignUp() {
    document.querySelector(".bg-modal-signup").style.display = "none";
  }

  return (
    <div>
      <div className="square">
        <p
          style={{
            fontSize: 40,
            fontWeight: "bold",
            fontFamily: "Times New Roman, Times, serif",
          }}
          align="center"
        >
          LOGIN
        </p>
        <input
          id="userNameLogin"
          className="loginInput"
          placeholder="Email"
          type="text"
        ></input>
        <br />
        <br />
        <input
          id="passwordLogin"
          className="loginInput"
          placeholder="Password"
          type="password"
        ></input>
        <br />
        <br />
        <Stack spacing={2.2} direction="row">
          <Button
            variant="contained"
            onClick={goToHomepage}
            style={{
              maxWidth: "250px",
              maxHeight: "50px",
              minWidth: "250px",
              minHeight: "30px",
            }}
          >
            Continue
          </Button>

          <Button
            onClick={openSignUp}
            variant="contained"
            style={{
              maxWidth: "250px",
              maxHeight: "50px",
              minWidth: "250px",
              minHeight: "30px",
            }}
          >
            New User
          </Button>
        </Stack>
      </div>
      <div class="bg-modal-signup">
        <div class="modal-content-signup">
          <p
            style={{
              fontSize: 40,
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
            align="center"
          >
            SIGN UP
          </p>
          <Stack
            style={{ paddingLeft: 20, paddingRight: 20 }}
            spacing={5}
            direction="row"
          >
            <input
              id="nameSignup"
              className="signupInput"
              placeholder="Name"
              type="text"
            ></input>
            <input
              id="usernameSignup"
              className="signupInput"
              placeholder="Username"
              type="text"
            ></input>
          </Stack>
          <br />
          <Stack
            style={{ paddingLeft: 20, paddingRight: 20 }}
            spacing={5}
            direction="row"
          >
            <input
              id="emailSignup"
              className="signupInput"
              placeholder="Email Address"
              type="email"
            ></input>
            <input
              id="numberSignup"
              className="phoneNumber"
              placeholder="Phone No"
              type="number"
            ></input>
          </Stack>
          <br />
          <Stack
            style={{ paddingLeft: 20, paddingRight: 20 }}
            spacing={5}
            direction="row"
          >
            <input
              id="password1Signup"
              className="signupInput"
              placeholder="Password"
              type="password"
            ></input>
            <input type="radio" id="male" name="gender" value="Male"></input>
            <label for="male">MALE</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
            ></input>
            <label for="female">FEMALE</label>
          </Stack>
          <br />
          <Stack
            style={{ paddingLeft: 20, paddingRight: 20 }}
            spacing={2}
            direction="row"
          >
            <Button
              onClick={moveBackToLoginFromSignup}
              variant="contained"
              color="primary"
              style={{
                maxWidth: "322px",
                maxHeight: "50px",
                minWidth: "322px",
                minHeight: "30px",
              }}
            >
              CREATE ACCOUNT
            </Button>
            <Button
              onClick={closeSignUp}
              variant="contained"
              color="error"
              style={{
                maxWidth: "322px",
                maxHeight: "50px",
                minWidth: "322px",
                minHeight: "30px",
              }}
            >
              CANCEL
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}
