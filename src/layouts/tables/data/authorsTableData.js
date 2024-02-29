/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import axios from "axios";
// Images
import { API_URL } from "../../../utils/constant";
import React, { useState, useEffect } from 'react'

export default function useData() {
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

  const getAllProducts = async () => {
    try {
      const fetchQuery = await axios.get(`${API_URL}/product`)
      return fetchQuery.data
    }
    catch (error) {
      console.log(error)
    }
  }
  const [products, setProducts] = useState([])
  useEffect(() => {
    const initProducts = async () => {
      const data = await getAllProducts();
      if (data && data.status == "E_SUCCESSED") {
        setProducts(data.data);
      }
    }
    initProducts()
  }, [])

  let dataTemp = [];
  let objTemp = {
    title: "",
    description: "",
    yearCreate: "",
    price: "",
    action: "",
  };

  products && products.length > 0 ?
    products.forEach(item => {
      // objTemp.title = <Author name={item.productName} />;
      objTemp.title = (
        <MDBox ml={-1} color="success" variant="gradient" size="sm">
          {item.title}
        </MDBox>
      );
      objTemp.description = <Job title={item.title} description={item.description} />;
      objTemp.yearCreate = (
        <MDBox ml={-1} color="success" variant="gradient" size="sm">
          {item.yearCreate}
        </MDBox>
      );
      objTemp.price = (
        <MDTypography component="a" href="#" variant="caption" color="error" fontWeight="medium">
          {item.price}
        </MDTypography>
      );
      objTemp.action = (
        <MDTypography component="a" href="#" variant="caption" color="success" fontWeight="medium">
          <MDBadge badgeContent="Mua Ngay" color="success" variant="gradient" size="md" />
        </MDTypography>

      );
      dataTemp.push(objTemp);
    })
    :
    dataTemp.push(objTemp);
  return {
    columns: [
      { Header: "Tiêu đề", accessor: "title", width: "25%", align: "left" },
      { Header: "Mô tả", accessor: "description", width: "35%", align: "left" },
      { Header: "Năm tạo", accessor: "yearCreate", align: "center" },
      { Header: "Giá", accessor: "price", align: "center" },
      { Header: "", accessor: "action", align: "center" },
    ],
    rows: dataTemp
  };
}
