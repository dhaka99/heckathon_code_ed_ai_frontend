import { useTheme } from "@mui/material";
import Div from "../../atoms/Div";
import { useMemo } from "react";

const BackgroundShapes: React.FC = () => {
    const theme = useTheme();
  
    const shapes = useMemo(() => {
      const count = 5;
      const arr: { cx: number; cy: number; r: number; opacity: number }[] = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          cx: Math.random() * 100,
          cy: Math.random() * 100,
          r: 8 + Math.random() * 26,
          opacity: 0.05 + Math.random() * 0.06,
        });
      }
      return arr;
    }, []);
  
    const fill = theme.palette.primary.main;
  
    return (
      <Div
        component="svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={0}
        sx={{ pointerEvents: "none" }}
      >
        {shapes.map((c, idx) => (
          <circle key={idx} cx={c.cx} cy={c.cy} r={c.r} fill={fill} opacity={c.opacity} />
        ))}
      </Div>
    );
  };

  export default BackgroundShapes;