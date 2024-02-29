/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// import { useState } from "react";

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import React, { useState } from "react";
// eslint-disable-next-line import/no-duplicates
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { setUserSession } from "../../../utils/common";
import { API_URL } from "../../../utils/constant";
import toast from 'react-hot-toast';

function Basic() {
  const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
      setValue(e.target.value);
    };
    return {
      value,
      onChange: handleChange,
    };
  };

  const history = useNavigate();
  const username = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    var userName = username.value;
    var passWord = password.value;
    setError(null);
    setLoading(true);
    if (userName == null || userName == "") {
      toast.error("Vui lòng nhập Tài Khoản");
      setLoading(false);
    }
    else if (passWord == null || passWord == "") {
      toast.error("Vui lòng nhập Mật Khẩu");
      setLoading(false);
    }
    else {
      axios
        .post(`${API_URL}/auth/login`, {
          UserLogin: userName,
          Password: passWord,
        })
        .then((response) => {
          if (response && response.data) {
            if (response.data.message == "LoginNotUser") {
              toast.error("Tên đăng nhập không tồn tại !");
            }
            else if (response.data.message == "LoginFailedPassword") {
              toast.error("Sai mật khẩu đăng nhập !");
            }
            else {
              debugger
              let role = "User";
              if (response.data.data[0].isAdmin == true) {
                role = "Admin";
              }
              setUserSession(response.data.message, userName, role);
              history("/dashboard");
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError("Lỗi Server. Vui lòng thử lại");
        });
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput id='username' {...username} type="email" label="Tài khoản" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput id='password' {...password} type="password" label="Mật khẩu" fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1} >
              {error && (
                <>
                  <small style={{ color: "red" }}>{error}</small>
                  <br />
                </>
              )}
              <MDButton onClick={handleLogin}
                variant="gradient"
                disabled={loading}
                color="info"
                fullWidth
              >
                {loading ? "Loading..." : "Đăng nhập"}
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Bạn chưa có tài khoản?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Đăng ký
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
