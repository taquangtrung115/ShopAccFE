import React, { useState } from "react";
import Card from "@mui/material/Card";
import * as XLSX from 'xlsx';
// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// Authentication layout components
import authorsTableData from "layouts/tables/data/authorsTableData";
// Images
import { API_URL } from "../../utils/constant";
import FileUpload from "react-mui-fileuploader"
import toast from 'react-hot-toast';
import axios from "axios";

const HomeComponent = () => {

    const [filesToUpload, setFilesToUpload] = useState([])
    const [dataUpload, setDataUpload] = useState([])
    const [loading, setLoading] = useState(false);
    const [loadData, setLoadData] = useState(false);

    const handleFilesChange = (files) => {
        setFilesToUpload([...files])
    };

    const handleUpload = (e) => {
        e.preventDefault();
        setLoadData(true);
        setLoading(true);
        if (filesToUpload && filesToUpload.length > 0) {
            var f = filesToUpload[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                let readedData = XLSX.read(data, { type: 'binary' });
                const wsname = readedData.SheetNames[0];
                const ws = readedData.Sheets[wsname];
                const dataParse = XLSX.utils.sheet_to_json(ws, { header: 2 });
                if (dataParse && dataParse.length > 0) {
                    setDataUpload(dataParse);
                }
                setLoadData(false);
                setLoading(false);
                toast.success("Nhập thành công");
            };
            reader.readAsBinaryString(f)
        }
        else {
            toast.error("Vui lòng tải file");
            setLoadData(false);
            setLoading(false);
        }
    }
    const handleSave = () => {
        setLoadData(true);
        setLoading(true);

        if (dataUpload.length > 0) {

            axios
                .post(`${API_URL}/product/import`, dataUpload)
                .then((response) => {
                    debugger
                    if (response && response.data && response.data.status === "E_SUCCESSED") {
                        toast.success("Lưu thành công");
                    }
                    else {
                        toast.error("Lỗi lưu. Vui lòng thử lại");
                    }
                    setLoadData(false);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoadData(false);
                    setLoading(false);
                    toast.error("Lỗi Server. Vui lòng thử lại");
                });
        }
        else {
            toast.error("Vui lòng nhập file trước khi lưu");
            setLoadData(false);
            setLoading(false);
        }
    }
    const handleFileUploadError = (error) => {
        toast.error("Lỗi tải file");
    }

    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Card>
                                <MDBox
                                    mx={2}
                                    mt={-3}
                                    py={3}
                                    px={2}
                                    variant="gradient"
                                    bgColor="info"
                                    borderRadius="lg"
                                    coloredShadow="info"
                                >
                                    <MDTypography variant="h6" color="white">
                                        Import Acc
                                    </MDTypography>

                                </MDBox>
                                <MDBox pt={3}>
                                    <FileUpload
                                        id='files'
                                        maxUploadFiles={1}
                                        disabled={loading}
                                        multiFile={false}
                                        onFilesChange={handleFilesChange}
                                        onContextReady={(context) => { }}
                                        onError={handleFileUploadError}
                                        title=""
                                        header="[Kéo thả]"
                                        leftLabel=""
                                        rightLabel=""
                                        buttonLabel="Tải File"
                                        buttonRemoveLabel="Xóa tất cả"
                                        BannerProps={{ elevation: 0, variant: "outlined" }}
                                        showPlaceholderImage={true}
                                        PlaceholderGridProps={{ md: 1 }}
                                        LabelsGridProps={{ md: 4 }}
                                        errorSizeMessage={'Không hỗ trợ định dạng file'}
                                        ContainerProps={{
                                            elevation: 0,
                                            variant: "outlined",
                                            sx: { p: 1 }
                                        }}
                                        PlaceholderImageDimension={{
                                            sm: { width: 128, height: 128 },
                                        }}
                                    />
                                    <MDBox pt={4} pb={3} px={3}>
                                        <MDButton
                                            variant="gradient"
                                            color="secondary"
                                            fullWidth
                                            onClick={handleUpload}>
                                            {loading ? "Loading..." : "Nhập dữ liệu"}
                                        </MDButton>
                                        <MDButton
                                            disabled={loadData}
                                            variant="gradient"
                                            color="primary"
                                            fullWidth
                                            onClick={handleSave}>
                                            {loadData ? "Loading..." : "Lưu"}
                                        </MDButton>
                                    </MDBox>
                                </MDBox>
                            </Card>
                        </Grid>
                    </Grid>
                </MDBox>
                <Footer />
            </DashboardLayout>
        </>

    );
};

export default HomeComponent;
