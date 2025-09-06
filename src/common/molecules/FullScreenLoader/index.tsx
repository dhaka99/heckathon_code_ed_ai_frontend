import Lottie from "react-lottie";
import animationData from "../../../assets/lotties/loading.json";
import Div from "../../atoms/Div/index.tsx";
import Text from "../../atoms/Text/index.tsx";

interface IFullScreenLoader {
  loaderStyles?: object;
  description?: string;
  title?: string;
}
const FullScreenLoader: React.FC<IFullScreenLoader> = ({
  loaderStyles = {},
  description,
  title,
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Div
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100vh'
      sx={{ ...loaderStyles }}
    >
      <Lottie options={defaultOptions} height={100} width={232} />
      <Text variant='h2Bold' color='neutral.700' mb={0.75}>
        {title || "Loading"}
      </Text>
      <Text variant='body1' color='neutral.700'>
        {description || "Retrieving and processing data. Please wait..."}
      </Text>
    </Div>
  );
};

export default FullScreenLoader;
