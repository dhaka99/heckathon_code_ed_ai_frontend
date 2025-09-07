import React, { useMemo, useState } from "react";
import Div from "../../../common/atoms/Div";
import Text from "../../../common/atoms/Text";
import CustomCard from "../../../common/atoms/CustomCard";
import CustomButton from "../../../common/atoms/CustomButton";
import Snackbar from "../../../common/atoms/Snackbar";
import InfoIcon from "@mui/icons-material/Info";
import ImageCarousel from "../../../common/components/ImageCarousel";

const videoReels = [
  {
    src: "/reels_output/reel_01/reel_01.mp4",
  },
  {
    src: "/reels_output/reel_02/reel_02.mp4",
  },
  {
    src: "/reels_output/reel_03/reel_03.mp4",
  },
  {
    src: "/reels_output/reel_04/reel_04.mp4",
  },
  {
    src: "/reels_output/reel_05/reel_05.mp4",
  },
];
const pdfReels = [
  {
    src: "/pdf_reels_output/reel_01/reel_01.mp4",
  },
  {
    src: "/pdf_reels_output/reel_02/reel_02.mp4",
  },
  {
    src: "/pdf_reels_output/reel_03/reel_03.mp4",
  },
];

const ContentToReel: React.FC = () => {
  const [contentType, setContentType] = useState<"video" | "pdf">("video");
  const reels = useMemo(
    () => (contentType === "video" ? videoReels : pdfReels),
    [contentType]
  );

  return (
    <Div display="flex" gap="24px" flexWrap="wrap" flexDirection="column">
      
      <Div display="flex" gap="24px" flexWrap="wrap">
        {/* Left: Source Content (Video or PDF) */}
        <Div flex="1 1 60%" display="flex" flexDirection="column" gap="12px">
          <Div
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap="12px"
          >
            <Text variant="h5" color="primary">
              Edu Reels
            </Text>
            <Div display="flex" gap="8px">
              <CustomButton
                variant={contentType === "video" ? "contained" : "outlined"}
                onClick={() => setContentType("video")}
              >
                Video
              </CustomButton>
              <CustomButton
                variant={contentType === "pdf" ? "contained" : "outlined"}
                onClick={() => setContentType("pdf")}
              >
                PDF
              </CustomButton>
            </Div>
          </Div>

          <CustomCard>
            <Div sx={{ position: "relative", width: "100%", height: "70vh" }}>
              {contentType === "video" ? (
                <Div
                  component="video"
                  src="lecture1.mp4"
                  controls
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    backgroundColor: "#000",
                  }}
                />
              ) : (
                <Div
                  component="iframe"
                  src="/test_pdf_file.pdf"
                  sx={{
                    width: "100%",
                    height: "100%",
                    border: 0,
                    objectFit: "contain",
                    backgroundColor: "#f7f7f7",
                  }}
                />
              )}
            </Div>
          </CustomCard>
        </Div>

        {/* Right: Reels-like Preview */}
        <Div flex="1 1 30%" display="flex" flexDirection="column" gap="12px">
          <Div
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            flexWrap="wrap"
            gap="12px"
          >
            <Text variant="h5" color="primary">
              Reels Preview
            </Text>
          </Div>

          <CustomCard
            sx={{
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
            }}
          >
            <Div
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="12px"
              p="12px"
            >
              <Div
                sx={{
                  width: "100%",
                  maxWidth: "380px",
                  aspectRatio: "9 / 16",
                  borderRadius: "24px",
                  overflow: "hidden",
                  backgroundColor: "#000",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  position: "relative",
                }}
              >
                {reels.length > 0 ? (
                  <ImageCarousel
                    images={reels}
                    interval={3500}
                    loop
                  />
                ) : (
                  <Div
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ color: "#fff", width: "100%", height: "100%" }}
                  >
                    <Text variant="body1" color="white">
                      No reels found
                    </Text>
                  </Div>
                )}
              </Div>
            </Div>
          </CustomCard>
        </Div>
      </Div>
      <Snackbar open={true} sx={{ position: "static" }}>
        <Div
          width={"95%"}
          padding={1.5}
          border={1}
          borderRadius="12px"
          bgcolor={"info.100"}
          borderColor={"info.main"}
          position="relative"
          display="flex"
          alignItems="center"
          gap="8px"
        >
          <InfoIcon color="info" />
          <Text variant="body2" color="primary.main">
            <span style={{ fontWeight: "700", color: "dark-blue" }}>Note</span>{" "}
            : We have built this feature in-house, and all the reels visible
            above are created locally. We could not deploy the solution on
            cloud, since the free credits would exhaust quickly to run models
            that deal with videos. A suitable demo of this for any type of
            content can be provided if needed
          </Text>
        </Div>
      </Snackbar>
    </Div>
  );
};

export default ContentToReel;
