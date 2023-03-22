import { useTheme } from "flowbite-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
// import Chart from "react-apexcharts";

export default function SalesChart(): JSX.Element {
  const { mode } = useTheme();
  const [theme, setTheme] = useState({
    borderColor: "#F3F4F6",
    labelColor: "#6B7280",
    opacityFrom: 1,
    opacityTo: 1,
  });

  useEffect(() => {
    const isDarkTheme = mode === "dark";
    const borderColor = isDarkTheme ? "#374151" : "#F3F4F6";
    const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";
    const opacityFrom = isDarkTheme ? 0 : 1;
    const opacityTo = isDarkTheme ? 0 : 1;
    setTheme({ borderColor, labelColor, opacityFrom, opacityTo });
  }, [mode]);

  const { borderColor, labelColor, opacityFrom, opacityTo } = theme;
  const options: ApexCharts.ApexOptions = {
    stroke: {
      curve: "smooth",
    },
    chart: {
      type: "area",
      fontFamily: "Inter, sans-serif",
      foreColor: labelColor,
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom,
        opacityTo,
        type: "vertical",
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
      },
    },
    grid: {
      show: true,
      borderColor: borderColor,
      strokeDashArray: 1,
      padding: {
        left: 35,
        bottom: 15,
      },
    },
    markers: {
      size: 5,
      strokeColors: "#ffffff",
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    xaxis: {
      categories: [
        "01 Feb",
        "02 Feb",
        "03 Feb",
        "04 Feb",
        "05 Feb",
        "06 Feb",
        "07 Feb",
      ],
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "14px",
          fontWeight: 500,
        },
      },
      axisBorder: {
        color: borderColor,
      },
      axisTicks: {
        color: borderColor,
      },
      crosshairs: {
        show: true,
        position: "back",
        stroke: {
          color: borderColor,
          width: 1,
          dashArray: 10,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "14px",
          fontWeight: 500,
        },
        formatter: function (value) {
          return "$" + value;
        },
      },
    },
    legend: {
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: "Inter, sans-serif",
      labels: {
        colors: [labelColor],
      },
      itemMargin: {
        horizontal: 10,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          xaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
  };
  const series = [
    {
      name: "Revenue",
      data: [6356, 6218, 6156, 6526, 6356, 6256, 6056],
      color: "#1A56DB",
    },
  ];

  //   return <div>PPPPPP</div>;
  return (
    <Chart
      height={420}
      width={"100%"}
      options={options}
      series={series}
      type="area"
    />
  );
}
