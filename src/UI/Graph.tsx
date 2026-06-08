import "./Graph.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

export const Graph = (props: any) => {
  var borderColor = "";
  if (props.color === "purple") {
    var borderColor = "#4200FD";
    var bgColor = ["rgb(66, 0, 253, 0.2)", "rgb(66, 0, 253, 0)"];
  } else if (props.color === "orange") {
    var borderColor = "#FB9130";
    var bgColor = ["rgb(251, 145, 48, 0.2)", "rgb(251, 145, 48, 0)"];
  } else if (props.color === "green") {
    var borderColor = "#25B800";
    var bgColor = ["rgb(37, 184, 0, 0.2)", "rgb(37, 184, 0, 0)"];
  }

  var labels: string[] = [];
  for (var i = 0; i<props.arrayVals.length; i++) {
    labels.push("x");
  }

  const data = {
    labels: labels,
    datasets: [
      {
        data: props.arrayVals,
        fill: true,
        backgroundColor: (context: any) => {
          if (!context.chart.chartArea) {
            return;
          }

          const {
            ctx,
            data,
            chartArea: { top, bottom },
          } = context.chart;
          const gradientBackground = ctx.createLinearGradient(
            0,
            top,
            0,
            bottom
          );
          gradientBackground.addColorStop(0, bgColor[0]);
          gradientBackground.addColorStop(1, bgColor[1]);

          return gradientBackground;
        },
        borderColor: borderColor,
        tension: 0,
      },
    ],
  };

  return (
    <div className="graph">
      <div className="title">
        <p style={{ color: "#484848", backgroundColor:"rgb(255, 255, 255, 0.75)",  borderRadius: "8px", }}>{props.title}</p>
      </div>
      <div className="dollar-amount">
        <p style={{ fontSize: "24px", color: "#484848" }}>$</p>
        <p
          style={{
            fontSize: "40px",
            marginLeft: "8px",
            marginTop: "-2px",
            backgroundColor:"rgb(255, 255, 255, 0.75)",
            borderRadius: "8px",
          }}
        >
          {props.amount}
        </p>
      </div>
      <div className="line-chart">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              point: {
                radius: 0,
              },
            },
            scales: {
              x: {
                display: false,
                grid: {
                  display: false,
                },
              },
              y: {
                display: false,
                grid: {
                  display: false,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
