
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import axios from "axios";
// Images
import { API_URL } from "../../utils/constant";
import React, { useState, useEffect } from 'react'

export default function ShiftData() {
    const Author = ({ image, name, email }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDAvatar src={image} name={name} size="sm" />
            <MDBox ml={2} lineHeight={1}>
                <MDTypography display="block" variant="button" fontWeight="medium">
                    {name}
                </MDTypography>
                <MDTypography variant="caption">{email}</MDTypography>
            </MDBox>
        </MDBox>
    );
    const Job = ({ title, description }) => (
        <MDBox lineHeight={1} textAlign="left">
            <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
                {title}
            </MDTypography>
            <MDTypography variant="caption">{description}</MDTypography>
        </MDBox>
    );

    const getAllShift = async () => {
        try {
            const fetchQuery = await axios.get(`${API_URL}/shift`);
            return fetchQuery.data
        }
        catch (error) {
            console.log(error)
        }
    }
    const [shift, setShift] = useState([])
    useEffect(() => {
        const initShift = async () => {
            const data = await getAllShift();
            if (data && data.status == "E_SUCCESSED") {
                setShift(data.data);
            }
        }
        initShift()
    }, [])

    let dataTemp = [];
    let objTemp = {
        Code: "",
        ShiftName: "",
        InTime: "",
        CoOut: "",
        WorkHours: "",
        BreakInTime: "",
        BreakOutTime: "",
        IsNightShift: "",
    };
    debugger;
    shift && shift.length > 0 ?
        shift.forEach(item => {
            objTemp.Code = (
                <MDBox ml={-1} color="success" variant="gradient" size="medium">
                    {item.Code}
                </MDBox>
            );
            objTemp.ShiftName = <Job title={item.ShiftName} description={item.description} />;
            objTemp.InTime = (
                <MDBox ml={-1} color="success" variant="gradient" size="medium">
                    {item.InTime}
                </MDBox>
            );
            objTemp.CoOut = (
                <MDTypography component="a" href="#" variant="caption" color="error" fontWeight="medium">
                    {item.CoOut}
                </MDTypography>
            );
            objTemp.WorkHours = (
                <MDTypography component="a" href="#" variant="caption" color="error" fontWeight="medium">
                    {item.WorkHours}
                </MDTypography>
            );
            objTemp.BreakInTime = (
                <MDTypography component="a" href="#" variant="caption" color="error" fontWeight="medium">
                    {item.BreakInTime}
                </MDTypography>
            );
            objTemp.BreakOutTime = (
                <MDTypography component="a" href="#" variant="caption" color="error" fontWeight="medium">
                    {item.BreakOutTime}
                </MDTypography>
            );
            objTemp.IsNightShift = (
                <MDTypography component="a" href="#" variant="caption" color="error" fontWeight="medium">
                    {item.IsNightShift}
                </MDTypography>

            );
            objTemp.action = (
                <MDTypography component="a" href="#" variant="caption" color="success" fontWeight="medium">
                    <MDBadge badgeContent="Chỉnh Sửa" color="info" variant="gradient" size="md" />
                </MDTypography>
            );
            dataTemp.push(objTemp);
        })
        :
        dataTemp.push(objTemp);
    return {
        columns: [
            { Header: "Mã", accessor: "Code", align: "left" },
            { Header: "Tên Ca", accessor: "ShiftName", align: "left" },
            { Header: "Giờ Vào", accessor: "InTime", align: "center" },
            { Header: "Giờ Ra", accessor: "CoOut", align: "center" },
            { Header: "Giờ Công", accessor: "WorkHours", align: "center" },
            { Header: "Giờ Bắt Đầu Nghỉ", accessor: "BeakInTime", align: "center" },
            { Header: "Giờ Kết Thúc Nghỉ", accessor: "BeakOutTime", align: "center" },
            { Header: "Ca Đêm", accessor: "IsNightShift", align: "center" },
            { Header: "", accessor: "action", align: "center" },
        ],
        rows: dataTemp
    };
}
