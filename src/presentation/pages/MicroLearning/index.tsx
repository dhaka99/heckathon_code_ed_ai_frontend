import React, { useEffect } from "react";
import Div from "../../../common/atoms/Div";
import Text from "../../../common/atoms/Text";
import CustomButton from "../../../common/atoms/CustomButton";
import CustomCard from "../../../common/atoms/CustomCard";
import CustomTable from "../../../common/molecules/CustomTable";
import { contentData } from "../../../mocks/contentData";
import CustomPagination from "../../../common/molecules/CustomPagination";
import FlipCard from "../../../common/components/FlipCard";
import { useDispatch } from "../../../domain/useCase/common/dispatchUseCase";
import useSelector from "../../../domain/useCase/common/selectorUseCase";
import { getSummaryListAction } from "../../../store/slices/contentSlice";
import CustomSkeleton from "../../../common/atoms/CustomSkeleton";

const MicroLearning: React.FC = () => {
  const dispatch = useDispatch();
  const { summaryList, contentLoading } = useSelector((state) => state.content);
  useEffect(() => {
    dispatch(getSummaryListAction());
  }, []);
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
      <Div display="flex" gap="34px" flexDirection="row" flexWrap={"wrap"}>
        {contentLoading?.getSummaryList === "pending" ? (
          <>
            <CustomSkeleton
              variant="ractangle"
              width="300px"
              height="300px"
              sx={{ borderRadius: "10px" }}
            />
            <CustomSkeleton
              variant="ractangle"
              width="300px"
              height="300px"
              sx={{ borderRadius: "10px" }}
            />
            <CustomSkeleton
              variant="ractangle"
              width="300px"
              height="300px"
              sx={{ borderRadius: "10px" }}
            />
          </>
        ) : (
          <>
            {summaryList?.length > 0
              ? summaryList?.map((card) => (
                  <FlipCard
                    key={card.id}
                    title={card.title}
                    summary={card.summary}
                    sx={{
                      width: "300px",
                      height: "300px",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  ></FlipCard>
                ))
              : null}
          </>
        )}
      </Div>
    </Div>
  );
};

export default MicroLearning;
