import {Chart, CategoryScale, LinearScale, Legend, BarElement, Tooltip} from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

type GraficoArgs = {
  labels: Array<string>,
  dados: Array<any>,
}

const BarChart = ({labels, dados}: GraficoArgs) => {
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
    }
  }
  
  return (
    <Bar options={options} data={data} style={{maxHeight:"400px"}}/>
  );
}

export default BarChart;