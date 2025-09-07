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
import CommonModal from "../../../common/atoms/CommonModal";
import CustomFormControl from "../../../common/atoms/CustomFormControl";
import CustomSkeleton from "../../../common/atoms/CustomSkeleton";

const OptionButton: React.FC<{
  label: string;
  text: string;
  selected: boolean;
  correct: boolean;
  onClick: () => void;
}> = ({ label, text, selected, correct, onClick }) => {
  return (
    <CustomButton
      variant={selected ? "contained" : "outlined"}
      color={selected ? (correct ? "success" : "error") : "secondary"}
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

const QuizesDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { quizDetails , contentLoading} = useSelector((state) => state.content);
  const quiz = quizDetails || {};
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const onClose = () => {
    setOpen(false);
  };
  const handleOnAIExplaination = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  if(contentLoading?.getQuizDetails === "pending"){
    return (
      <Div p={2}>
        <CustomSkeleton variant="text" width="100%" height="100px" />
      </Div>
    );
  }

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
            <Div display="flex" justifyContent="space-between" alignItems="center">

            

            <Text variant="h6">{current?.question}</Text>
            <CustomButton
              variant="contained"
              color="primary"
              sx={{
                width: "150px",
                whiteSpace: "nowrap",
              }}
              onClick={handleOnAIExplaination}
            >
              AI Explaination
            </CustomButton>
            </Div>

            <Div display="flex" flexDirection="column" gap="16px">
              {current?.options &&
                current?.options.map((opt) => (
                  <OptionButton
                    key={opt.label}
                    label={opt.label}
                    text={opt.text}
                    selected={answers[current.id] === opt.label}
                    correct={opt.label === current?.correct_answer}
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

      {open && (
        <CommonModal
          open={open}
          onBackdropClick={onClose}
          onClose={onClose}
          maxWidth="512px"
        >
          <Div display="flex" gap="16px" flexDirection={"column"}>
            {loading ? (
              <CustomSkeleton variant="text" width="80%" height="50px" />
            ) : (
              <Text variant="h3Bold" color="primary.main">
                Answer: {current?.correct_answer}
              </Text>
            )}
            {loading ? (
              <CustomSkeleton variant="text" width="100%" height="100px" />
            ) : (
              <Text variant="body1">{current?.explanation}</Text>
            )}

            <Div display="flex" justifyContent="flex-end" gap="8px">
              <CustomButton variant="contained" size="large" onClick={onClose}>
                Close
              </CustomButton>
            </Div>
          </Div>
        </CommonModal>
      )}
    </Div>
  );
};

export default QuizesDetails;
