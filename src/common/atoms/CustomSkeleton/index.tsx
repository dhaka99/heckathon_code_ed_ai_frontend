import Skeleton, { type SkeletonProps } from "@mui/material/Skeleton";

const CustomSkeleton: React.FC<SkeletonProps> = (props) => (
  <Skeleton {...props} />
);

export default CustomSkeleton;
