import {Chart, CategoryScale, LinearScale, Legend, BarElement, Tooltip, BarController} from "chart.js";
import { Bar, Chart as ChartJS2 } from "react-chartjs-2";
import {useEffect, useRef} from "react";


Chart.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip, BarController);

type GraficoArgs = {
  labels: Array<string>,
  dados: Array<any>,
  meses?: boolean,
  opcoes?: Object,
}

const BarChart = ({labels, dados, meses = false, opcoes}: GraficoArgs) => {
  const chartRef = useRef<Chart>(null);
  
  useEffect(() => {
    if (chartRef.current && meses) {
      let mes = (new Date().getMonth());
      for (let i = 0; i < 12; i++) {
        if (i !== mes) {
          // @ts-ignore
          chartRef.current.legend.legendItems[i].hidden = true;
          // @ts-ignore
          chartRef.current.hide(i);
        }
      }
      // @ts-ignore
      chartRef.current.update()
    }
    
  }, [chartRef, meses]);
  
  let data = {
    labels: labels,
    datasets: dados
  };
  
  if (!opcoes) {
    opcoes = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        }
      }
    }
  }
  
  return (
    // <Bar ref={chartRef} options={opcoes} data={data} style={{maxHeight:"400px"}}/>
    <ChartJS2 type={"bar"} ref={chartRef} options={opcoes} data={data} style={{maxHeight:"400px"}}/>
  );
}

export default BarChart;