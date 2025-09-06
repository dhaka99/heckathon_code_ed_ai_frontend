import React from "react";
import { StyledAppBar } from "./index.style";
import Div from "../../../../common/atoms/Div";
import Text from "../../../../common/atoms/Text";

const AppBar: React.FC = () => {
  return (
    <StyledAppBar
      position="relative"
      color="primary"
      sx={{
        height: "55px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Div display="flex" alignItems="center">
        <Text sx={{ fontSize: "24px", fontWeight: "700" }}>
          AI Content Management System by Fantastic Four
        </Text>
      </Div>
    </StyledAppBar>
  );
};

export default AppBar;
