import React, { useEffect, useMemo, useState } from "react";
import Div from "../../../common/atoms/Div";
import Text from "../../../common/atoms/Text";
import CustomCard from "../../../common/atoms/CustomCard";
import CustomButton from "../../../common/atoms/CustomButton";
import { useParams } from "react-router";
import { CardHeader } from "@mui/material";
import BackgroundShapes from "../../../common/components/BackgroundShaps";
import { getQuizDetailsAction } from "../../../store/slices/contentSlice";
import useSelector from "../../../domain/useCase/common/selectorUseCase";
import { useDispatch } from "../../../domain/useCase/common/dispatchUseCase";

const OptionButton: React.FC<{
  label: string;
  text: string;
  selected: boolean;
  onClick: () => void;
}> = ({ label, text, selected, onClick }) => {
  return (
    <CustomButton
      variant={selected ? "contained" : "outlined"}
      color={selected ? "primary" : "secondary"}
      onClick={onClick}
      sx={{ justifyContent: "flex-start", width: "100%", padding: "8px 16px" }}
    >
      <Div display="flex" alignItems="center" gap="12px">
        <Text variant="body1" sx={{ fontWeight: 700 }}>
          {label}.
        </Text>
        <Text variant="body1">{text}</Text>
      </Div>
    </CustomButton>
  );
};

export type QuizOption = {
  label: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
  correct_answer: string;
  explanation?: string;
};

export type QuizPayload = {
  quizId: string;
  title: string;
  questions: QuizQuestion[];
};

// Map the Hindi quiz to an id so we can route to it (use any id you prefer)
export const quizzesById: Record<string, QuizPayload> = {
  "QZ-HI-001": {
    quizId: "QZ-HI-001",
    title: "कृत्रिम बुद्धिमत्ता पर परीक्षा",
    questions: [
      {
        id: "q1",
        question: "कृत्रिम बुद्धिमत्ता का मुख्य कार्य क्या है?",
        options: [
          { label: "A", text: "स्वचालित कार्यों को करना" },
          { label: "B", text: "डेटा को विश्लेषित करना" },
          { label: "C", text: "निर्णय लेना" },
          { label: "D", text: "संचार करना" },
        ],
        correct_answer: "A",
        explanation:
          "कृत्रिम बुद्धिमत्ता का मुख्य कार्य स्वचालित कार्यों को करना है, जैसे कि डेटा को विश्लेषित करना, निर्णय लेना, और संचार करना।",
      },
      {
        id: "q2",
        question: "कृत्रिम बुद्धिमत्ता का उपयोग किस क्षेत्र में किया जाता है?",
        options: [
          { label: "A", text: "व्यापार और वित्त" },
          { label: "B", text: "शिक्षा और स्वास्थ्य" },
          { label: "C", text: "संचार और मनोरंजन" },
          { label: "D", text: "सभी क्षेत्रों में" },
        ],
        correct_answer: "D",
        explanation:
          "कृत्रिम बुद्धिमत्ता का उपयोग व्यापार और वित्त, शिक्षा और स्वास्थ्य, संचार और मनोरंजन, और सभी क्षेत्रों में किया जाता है।",
      },
      {
        id: "q3",
        question: "कृत्रिम बुद्धिमत्ता का भविष्य क्या है?",
        options: [
          { label: "A", text: "यह पूरी तरह से विकसित हो जाएगा" },
          { label: "B", text: "यह सीमित ही रहेगा" },
          { label: "C", text: "यह विकसित होगा लेकिन सीमित रहेगा" },
          { label: "D", text: "यह पूरी तरह से विकसित नहीं होगा" },
        ],
        correct_answer: "C",
        explanation:
          "कृत्रिम बुद्धिमत्ता का भविष्य यह है कि यह विकसित होगा लेकिन सीमित रहेगा, क्योंकि यह एक जटिल और विकसित क्षेत्र है।",
      },
    ],
  },
};

const QuizesDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { quizDetails } = useSelector((state) => state.content);
  const quiz = quizDetails || {};
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getQuizDetailsAction(id));
    }
  }, [id]);
  const current = quiz?.questions?.[idx];

  const goPrev = () => {
    setIdx((i) => Math.max(i - 1, 0));
  };

  const goNext = () => {
    setIdx((i) => Math.min(i + 1, quiz?.questions.length - 1));
  };
  const finishQuiz = () => {
    setDone(true);
  };

  const restartQuiz = () => {
    setIdx(0);
    setDone(false);
    setAnswers({});
  };

  const handleSelect = (label: string) => {
    setAnswers((prev) => ({ ...prev, [current.id]: label }));
  };

  if (!Object.keys(quiz).length) {
    return (
      <Div p={2}>
        <Text>Quiz not found.</Text>
      </Div>
    );
  }

  return (
    <Div display="flex" flexDirection="column" gap="16px">
      <Div
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap="12px"
      >
        <Text variant="h5" color="primary">
          {quiz?.title}
        </Text>
        <Text variant="body2">
          Question {Math.min(idx + 1, quiz.questions?.length)} /{" "}
          {quiz?.questions?.length}
        </Text>
      </Div>

      <CustomCard sx={{ padding: "24px", position: "relative" }}>
        {/* <BackgroundShapes/> */}
        {!done ? (
          <Div display="flex" flexDirection="column" gap="16px">
            <Text variant="h6">{current?.question}</Text>

            <Div display="flex" flexDirection="column" gap="16px">
              {current?.options &&
                current?.options.map((opt) => (
                  <OptionButton
                    key={opt.label}
                    label={opt.label}
                    text={opt.text}
                    selected={answers[current.id] === opt.label}
                    onClick={() => handleSelect(opt.label)}
                  />
                ))}
            </Div>
          </Div>
        ) : (
          <Div
            display="flex"
            flexDirection="column"
            gap="16px"
            alignItems="center"
            justifyContent="center"
          >
            <Text variant="h6" className="text-xl font-semibold">
              🎉 Quiz Completed!
            </Text>
            <Text variant="body1">You have completed the quiz.</Text>
          </Div>
        )}
      </CustomCard>
      <Div display="flex" justifyContent="flex-end" gap="16px">
        {done ? null : (
          <CustomButton
            variant="contained"
            color="primary"
            disabled={idx === 0}
            onClick={goPrev}
          >
            Previous
          </CustomButton>
        )}
        {done ? null : (
          <CustomButton
            variant="contained"
            color="primary"
            onClick={goNext}
            disabled={idx === quiz?.questions?.length - 1}
          >
            Next
          </CustomButton>
        )}

        <CustomButton variant="contained" color="primary" onClick={restartQuiz}>
          Restart Quiz
        </CustomButton>
      </Div>
    </Div>
  );
};

export default QuizesDetails;
