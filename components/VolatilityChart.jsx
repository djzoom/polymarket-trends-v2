import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function VolatilityChart({ markets }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current || markets.length === 0) return;
    const chart = echarts.init(ref.current);
    const option = {
      title: { text: "Volatility Index (|ΔP| × log Volume)", textStyle: { color: "#fff" } },
      xAxis: { type: "category", data: markets.map(m => m.title.slice(0, 15) + "..."), axisLabel:{color:"#aaa"} },
      yAxis: { type: "value", axisLabel:{color:"#aaa"} },
      series: [{
        type: "bar",
        data: markets.map(m => Math.abs(m.deltaP) * Math.log(m.volume || 1)),
        itemStyle: { color: "#00ffa3" }
      }]
    };
    chart.setOption(option);
    return () => chart.dispose();
  }, [markets]);

  return (
    <section className="p-4">
      <h2 className="text-2xl mb-4">Volatility Index</h2>
      <div ref={ref} style={{ width: "100%", height: "300px" }} />
    </section>
  );
}