import {
  ResponsiveContainer,
  BarChart,
  Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

export default function MiniSparkline({ data }) {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="quantity" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
