import React from "react";
import Div from "../../../common/atoms/Div";
import Text from "../../../common/atoms/Text";
import CustomCard from "../../../common/atoms/CustomCard";
import CustomButton from "../../../common/atoms/CustomButton";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../constants";

const HowToUse: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    
    {
      title: "1) Upload content",
      bullets: [
        "Go to Content Creation to upload a file (.pdf, .doc, .txt, .json, .csv, .dt, .mp4, .mov, .mp3, .wav).",
        "After upload, your content appears in the Content list.",
      ],
      cta: { label: "Create content", to: ROUTES.CONTENT_CREATION },
    },
    {
        title: "2) Create Edu Reels",
        bullets: [
          "Use Edu Reels to generate short, captioned clips from long lectures.",
          "Review and download your reels.",
        ],
        cta: { label: "Edu Reels", to: ROUTES.CONTENT_TO_REEL },
      },
    {
      title: "3) Manage content",
      bullets: [
        "Open Content to view your uploaded items.",
        "Use the action buttons to view details, create notes, or generate quizzes.",
      ],
      cta: { label: "Go to Content", to: ROUTES.CONTENT },
    },
    {
      title: "4) Generate notes (Micro Learning)",
      bullets: [
        "From Content, click Create Notes on an item.",
        "Pick a language and generate concise notes.",
        "Notes appear under Micro Learning (Notes).",
      ],
      cta: { label: "Micro Learning", to: ROUTES.MICRO_LEARNING },
    },
    {
      title: "5) Generate quizzes",
      bullets: [
        "From Content, click Create Quiz.",
        "Choose language, type, number of questions.",
        "Find generated quizzes under Quizzes.",
      ],
      cta: { label: "Quizzes", to: ROUTES.QUIZES },
    },
  ];

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
          How to Use
        </Text>
      </Div>

      <Div display="flex" flexDirection="column" gap="16px">
        {sections.map((s) => (
          <CustomCard
            key={s.title}
            sx={{ padding: "16px 24px", backgroundColor: "secondary" }}
          >
            <Text variant="h3Medium" color="primary">
              {s.title}
            </Text>
            <Div display="flex" flexDirection="column" gap="8px" marginTop={"8px"}>
              {s.bullets.map((b, idx) => (
                <Text key={idx} variant="body1Medium" color="primary" fontSize={"18px"} fontWeight={"500"}>
                  - {b}
                </Text>
              ))}
            </Div>
            {s.cta ? (
              <CustomButton
                variant="outlined"
                size="large"
                sx={{ width: "fit-content", marginTop: "12px" }}
                onClick={() => navigate(s.cta.to)}
              >
                {s.cta.label}
              </CustomButton>
            ) : null}
          </CustomCard>
        ))}
      </Div>
    </Div>
  );
};

export default HowToUse;

