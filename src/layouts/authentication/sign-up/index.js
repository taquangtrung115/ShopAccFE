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

// react-router-dom components
import { useNavigate, Link } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";
import React, { useState } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { API_URL } from "../../../utils/constant";
// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import toast from 'react-hot-toast';
function Cover() {
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
  const passwordConfirm = useFormInput("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleRegister = () => {
    debugger
    var userName = username.value;
    var passWord = password.value;
    var passWordConfirm = passwordConfirm.value;
    setError(null);
    setLoading(true);
    if (userName === "") {
      toast.error("Vui lòng nhập Tài Khoản");
      setLoading(false);
    }
    else if (passWord === "") {
      toast.error("Vui lòng nhập Mật Khẩu");
      setLoading(false);
    }
    else if (passWordConfirm === "") {
      toast.error("Vui lòng nhập Xác Nhận Mật Khẩu");
      setLoading(false);
    }
    else if (passWordConfirm != passWord) {
      toast.error("Mật khẩu và Xác nhận Mật khẩu phải giống nhau");
      setLoading(false);
    }
    else {
      axios
        .post(`${API_URL}/auth/register`, {
          UserLogin: userName,
          Password: passWord,
        })
        .then((response) => {
          debugger
          if (response && response.data && response.data.status === "E_SUCCESSED") {
            toast.success("Tạo tài khoản thành công");
            history("/authentication/sign-in");
          }
          else if (response && response.data && response.data.status === "E_FAILED") {
            toast.error(`${response.data.data[0].userLogin} đã tồn tại trong hệ thống`);
          }
          else {
            setError("Lỗi Server. Vui lòng thử lại");
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 401) setError(error.response.data.message);
          else setError("Lỗi Server. Vui lòng thử lại");
        });
    }
  }
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={1}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Đăng ký tài khoản
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Nhập tên đăng nhập và mật khẩu để đăng ký
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput id='username' {...username} type="text" label="Tên đăng nhập" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput id='password' {...password} type="password" label="Mật khẩu" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput id='passwordConfirm' {...passwordConfirm} type="password" label="Xác Nhận Mật khẩu" variant="standard" fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1}>
              {error && (
                <>
                  <small style={{ color: "red" }}>{error}</small>
                  <br />
                </>
              )}
              <br />
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                disabled={loading}
                onClick={handleRegister}>
                {loading ? "Loading..." : "Đăng ký"}
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Bạn đã có tài khoản?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Đăng nhập
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
