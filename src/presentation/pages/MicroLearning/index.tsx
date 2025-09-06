import React from "react";
import Div from "../../../common/atoms/Div";
import Text from "../../../common/atoms/Text";
import CustomButton from "../../../common/atoms/CustomButton";
import CustomCard from "../../../common/atoms/CustomCard";
import CustomTable from "../../../common/molecules/CustomTable";
import { contentData } from "../../../mocks/contentData";
import CustomPagination from "../../../common/molecules/CustomPagination";
import FlipCard from "../../../common/components/FlipCard";

const MicroLearning: React.FC = () => {
  return (
    <Div display="flex" gap="24px" flexDirection="column">
      <Div
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap={"wrap"}
        gap="24px"
      >
        <Text variant="h2Bold" color="primary" whiteSpace={"nowrap"}>
          Micro Learning (Notes)
        </Text>
      </Div>
      
      <Div display="flex" gap="24px" flexDirection="row" flexWrap={"wrap"}>
        {contentData.map((card) => (
          <FlipCard
            title={card.contentTitle}
            summary={card.contentSummary}
            sx={{
              width: "300px",
              height: "300px",
              alignContent: "center",
              justifyContent: "center",
            }}
          ></FlipCard>
        ))}
      </Div>
    </Div>
  );
};

export default MicroLearning;
