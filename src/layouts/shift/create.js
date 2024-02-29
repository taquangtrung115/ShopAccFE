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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import axios from "axios";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import toast from 'react-hot-toast';
import { API_URL } from "../../utils/constant";
import React, { useState, useEffect, useRef } from 'react'
// Data
import dataShift from "layouts/shift/dataShift";
function CreateShift() {
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
    const code = useFormInput("");
    const shiftName = useFormInput("");
    const inTime = useFormInput("");
    const outTime = useFormInput("");
    const workHours = useFormInput("");
    const breakInTime = useFormInput("");
    const breakOutTime = useFormInput("");
    const isNightShift = useFormInput("");

    const history = useNavigate();
    const handleSave = (event) => {
        debugger;
        event.preventDefault();
        var codeSave = code.value;
        var shiftNameSave = shiftName.value;
        var inTimeSave = inTime.value;
        var outTimeSave = outTime.value;
        var workHoursSave = workHours.value;
        var breakInTimeSave = breakInTime.value;
        var breakOutTimeSave = breakOutTime.value;
        var isNightShiftSave = isNightShift.value;
        var modelSave = {
            Code: codeSave,
            ShiftName: shiftNameSave,
            InTime: inTimeSave,
            OutTime: outTimeSave,
            WorkHours: workHoursSave,
            BreakInTime: breakInTimeSave,
            BreakOutTime: breakOutTimeSave,
            IsNightShift: isNightShiftSave,
        }
        axios
            .post(`${API_URL}/shift/Add`, modelSave)
            .then((response) => {
                if (response && response.data) {

                }
            })
            .catch((error) => {
            });
    }
    return (
        <DashboardLayout>
            <DashboardNavbar />

            <MDBox
                mt={-3}
                py={3}
                px={2}
            >
                <MDButton onClick={handleSave}
                    variant="gradient"
                    color="success"
                    type="submit"
                >
                    Save
                </MDButton>
                <MDBox
                    mx={0}
                    py={2}
                    px={1}
                >
                    <MDInput id="Code" variant="outlined" type="text" label="Code" {...code} />
                    <MDInput id="ShiftName" variant="outlined" type="text" label="Shift name" {...shiftName} />
                    <MDInput id="InTime" variant="outlined" type="time" label="In time" {...inTime} />
                    <MDInput id="OutTime" variant="outlined" type="time" label="Out time" {...outTime} />
                    <MDInput id="WorkHours" variant="outlined" type="number" label="Work hours" {...workHours} />
                    <MDInput id="BreakInTime" variant="outlined" type="time" label=" Break in time" {...breakInTime} />
                    <MDInput id="BreakOutTime" variant="outlined" type="time" label="Break out time" {...breakOutTime} />
                    <MDInput id="IsNightShift" variant="outlined" type="checkbox" label="Is night Shift" {...isNightShift} />
                </MDBox>

            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default CreateShift;
