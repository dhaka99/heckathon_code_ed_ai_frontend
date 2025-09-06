import React from "react";
// import Sidebar from "../../../common/orgransims/Sidebar";
import { Outlet } from "react-router";
import Div from "../../../common/atoms/Div";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
// import AlertComponent from "../../molecules/AlertComponent";

const Layout: React.FC = () => {
  return (
    <Div
      bgcolor='primary.100'
      height='100vh'
      display='flex'
      flexDirection='column'
      overflow='hidden'
    >
      {/* <AlertComponent /> */}
      {/* <Sidebar /> */}
      <AppBar />
      <Div
        display='flex'
        flex='1 1 100%'
        flexDirection='row'
        position='relative'
        sx={{
            overflowY: "auto",
        }}
      >
        <Drawer />
        <Div
          component='main'
          sx={{ overflow: "auto" }}
          padding='20px'
          width={"100%"}
        >
          <Outlet />
        </Div>
      </Div>
    </Div>
  );
};

export default Layout;
