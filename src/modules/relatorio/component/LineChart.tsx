import {Chart, CategoryScale, LinearScale, Legend, Tooltip, PointElement, LineElement} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(PointElement, LineElement, CategoryScale, LinearScale, Legend, Tooltip);

type GraficoArgs = {
  labels: Array<string|number>,
  dados: Array<any>,
}

const LineChart = ({labels, dados}: GraficoArgs) => {
  let data = {
    labels: labels,
    datasets: dados
  };
  
  let options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      }
    },
    scales: {
      y: {
        min: 0,
        max: 10,
      }
    }
  }
  
  return (
    <Line options={options} data={data} style={{maxHeight:"400px"}}/>
  );
}

export default LineChart;