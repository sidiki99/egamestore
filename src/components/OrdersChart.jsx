import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const OrdersChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const dailyOrders = {};
    orders.forEach((order) => {
      const date = new Date(order.orderDate);

      const day = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      dailyOrders[day] = (dailyOrders[day] || 0) + 1;
    });

    const data = Object.entries(dailyOrders).map(
      ([day, orders]) => ({
        day,
        orders,
      })
    );

    setChartData(data);
  }, []);

  return (
    <div className="w-full h-[350px] rounded-xl p-5 shadow bg-input border  border-gray-700">
      <h2 className="text-xl font-semibold mb-5">
        Orders Over Time
      </h2>
  
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={chartData}>
          <CartesianGrid   stroke="#3A3F47"
          strokeDasharray="3 3" />

          <XAxis dataKey="day" stroke="#D1D5DB"/>

          <YAxis allowDecimals={false}  stroke="#D1D5DB" />

          <Tooltip
              contentStyle={{
                backgroundColor: "#20242B",
                border: "1px solid #FF641C",
                borderRadius: "8px",
                color: "#FFFFFF",
              }}
              labelStyle={{
                color: "#FFFFFF",
              }}
              itemStyle={{
                color: "#FF641C",
              }}
            />

                    <Line
            type="monotone"
            dataKey="orders"
            stroke="#FF641C"
            strokeWidth={3}
            dot={{
              fill: "#FF641C",
              stroke: "#FFFFFF",
              strokeWidth: 2,
              r: 4,
            }}
              activeDot={{
              fill: "#FF641C",
              stroke: "#FFFFFF",
              strokeWidth: 2,
              r: 7,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
     </div> 
  
  );
};

export default OrdersChart;