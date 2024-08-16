import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DeviceStats({ stats }) {
  const deviceCount = stats.reduce((acc, item) => {
    acc[item.device] = (acc[item.device] || 0) + 1;
    return acc;
  }, {});

  const result = Object.entries(deviceCount).map(([device, count]) => ({
    device,
    count,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={result}
            dataKey="count"
            nameKey="device"
            label={({ device, percent }) =>
              `${device}:${(percent * 100).toFixed(0)}%`
            }
          >
            {result.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
