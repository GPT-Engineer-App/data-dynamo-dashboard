import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DataVisualization = ({ data }) => {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && selectedColumn) {
      const columnIndex = data[0].indexOf(selectedColumn);
      const frequencyMap = data.slice(1).reduce((acc, row) => {
        const value = row[columnIndex];
        acc[value] = (acc[value] || 0) + 1;
        return acc;
      }, {});

      const newChartData = Object.entries(frequencyMap).map(([value, count]) => ({
        value,
        count
      }));

      setChartData(newChartData);
    }
  }, [data, selectedColumn]);

  if (!data) return <div>Please upload data first.</div>;

  return (
    <div className="space-y-4">
      <Select onValueChange={setSelectedColumn}>
        <SelectTrigger>
          <SelectValue placeholder="Select a column" />
        </SelectTrigger>
        <SelectContent>
          {data[0].map((header, index) => (
            <SelectItem key={index} value={header}>{header}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="value" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DataVisualization;