import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { Hour, Weekday } from "../../src/config";
import { TABLET_BG } from "./TabletSVG";
import { TopDay } from "./TopDay";

type ProductivityPerHour = {
  time: number;
  productivity: number;
};

type Props = {
  graphData: Array<ProductivityPerHour>;
  weekday: Weekday;
  hour: Hour;
};

const Bar = (props: { productivity: number }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const height = spring({
    fps,
    frame,
    from: 0,
    to: 100,
    config: {
      mass: props.productivity * 10 + 0.1,
      damping: 200,
    },
  });

  return (
    <div
      style={{
        width: 30,
        height: `${height}%`,
        display: "flex",
        alignItems: "flex-end",
        borderRadius: 4,
      }}
    >
      <div
        style={{
          width: "100%",
          height: `${props.productivity * 100}%`,
          borderRadius: 4,
          backgroundColor: "#181B28",
          border: "3px solid rgba(255, 255, 255, 0.1)",
        }}
      />
    </div>
  );
};

const ProductivityGraph = (props: {
  productivityPerHour: Array<ProductivityPerHour>;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 10,
        height: 480,
        ...props.style,
      }}
    >
      {props.productivityPerHour.map((productivityPerHour) => {
        return (
          <div
            key={productivityPerHour.time}
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <Bar productivity={productivityPerHour.productivity} />
            <div
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: 700,
                fontFamily: "Mona Sans",
              }}
            >
              {productivityPerHour.time}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Productivity: React.FC<Props> = ({ graphData, weekday }) => {
  return (
    <AbsoluteFill
      style={{
        background: TABLET_BG,
        display: "flex",
      }}
    >
      {/**
       * TODO: Top hour
       */}
      <TopDay
        values={[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ]}
        label="Most productive day"
        day={weekday}
      />
      <TopDay
        values={[
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
        ]}
        label="Most productive time"
        day={weekday}
      />
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ProductivityGraph productivityPerHour={graphData} />
      </div>
    </AbsoluteFill>
  );
};
