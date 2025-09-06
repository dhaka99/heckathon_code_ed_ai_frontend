import { useNavigate } from "react-router";
import NotFoundImg from "../../../assets/404.png";
import CustomButton from "../../../common/atoms/CustomButton/index.tsx";
import Div from "../../../common/atoms/Div/index.tsx";
import Text from "../../../common/atoms/Text/index.tsx";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Div
      component='section'
      width='100vw'
      height='100vh'
      p={3}
      display='flex'
      alignItems='center'
      justifyContent='center'
      bgcolor='#EEEEEE'
    >
      <Div display='flex' flexDirection='column' alignItems='center'>
        <Div component='img' src={NotFoundImg} height={176} mb={2.25} />
        <Text variant='h2Medium' color='neutral.700' mb={1}>
          Page not found
        </Text>
        <Text variant='body1' color='neutral.700' mb={2.25}>
          We're sorry, the page you're looking for could not be found.
        </Text>
        <CustomButton
          variant='contained'
          size='large'
          sx={{ width: "fit-content" }}
          onClick={() => navigate(-1)}
        >
          Go back
        </CustomButton>
      </Div>
    </Div>
  );
};

export default NotFoundPage;
