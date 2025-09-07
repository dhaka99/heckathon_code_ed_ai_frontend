import { useEffect } from "react";
import Div from "../../../common/atoms/Div"
import Text from "../../../common/atoms/Text";
import HtmlString from "../../../common/components/HtmlString";
import { useDispatch } from "../../../domain/useCase/common/dispatchUseCase";
import useSelector from "../../../domain/useCase/common/selectorUseCase";
import { getContentDetailsAction } from "../../../store/slices/contentSlice";
import { useParams } from "react-router";

const ContentDetails: React.FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { contentDetails } = useSelector((state) => state.content);
    useEffect(() => {
        if(id){
            dispatch(getContentDetailsAction(id));
        }
    }, [id]);
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
          Content Details
        </Text>

        </Div>
        <HtmlString text={contentDetails?.data || ""} />
    </Div>
  );
};

export default ContentDetails;