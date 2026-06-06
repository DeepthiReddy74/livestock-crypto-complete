import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const fmt = (ts) => {
  const d = new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px' }}>
      <div style={{ fontSize: '0.75rem', color: '#8892a4', marginBottom: 4 }}>{fmt(d.payload.time)}</div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: '#00e5ff' }}>
        ${Number(d.value).toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </div>
    </div>
  );
};

export default function PriceChart({ data }) {
  const chartData = useMemo(() => {
    if (!data?.length) return [];
    return data.map(([time, price]) => ({ time, price: parseFloat(price.toFixed(4)) }));
  }, [data]);

  if (!chartData.length) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 260, color: '#4a5568' }}>
      No chart data available
    </div>
  );

  const isUp = chartData[chartData.length - 1]?.price >= chartData[0]?.price;
  const color = isUp ? '#00d68f' : '#ff4d6d';

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.2} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="time" tickFormatter={fmt} tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} minTickGap={60} />
        <YAxis domain={['auto', 'auto']} tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} width={70}
          tickFormatter={v => `$${v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v.toFixed(2)}`} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="price" stroke={color} strokeWidth={2} fill="url(#chartGrad)" dot={false} activeDot={{ r: 4, fill: color }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
