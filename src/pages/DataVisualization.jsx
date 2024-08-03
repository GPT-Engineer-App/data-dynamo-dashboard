import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DataVisualization = ({ data }) => {
  const [chartType, setChartType] = useState('bar');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [selectedColumnX, setSelectedColumnX] = useState('');
  const [selectedColumnY, setSelectedColumnY] = useState('');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && chartType === 'bar' && selectedColumn) {
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
    } else if (data && chartType === 'scatter' && selectedColumnX && selectedColumnY) {
      const columnIndexX = data[0].indexOf(selectedColumnX);
      const columnIndexY = data[0].indexOf(selectedColumnY);
      const newChartData = data.slice(1).map(row => ({
        x: parseFloat(row[columnIndexX]),
        y: parseFloat(row[columnIndexY])
      })).filter(point => !isNaN(point.x) && !isNaN(point.y));

      setChartData(newChartData);
    }
  }, [data, chartType, selectedColumn, selectedColumnX, selectedColumnY]);

  if (!data) return <div>Please upload data first.</div>;

  return (
    <div className="space-y-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Select onValueChange={setChartType}>
              <SelectTrigger>
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="scatter">Scatter Plot</SelectItem>
              </SelectContent>
            </Select>
          </TooltipTrigger>
          <TooltipContent>
            <p>Choose the type of chart to visualize your data</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {chartType === 'bar' && (
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
      )}

      {chartType === 'scatter' && (
        <>
          <Select onValueChange={setSelectedColumnX}>
            <SelectTrigger>
              <SelectValue placeholder="Select X-axis column" />
            </SelectTrigger>
            <SelectContent>
              {data[0].map((header, index) => (
                <SelectItem key={index} value={header}>{header}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedColumnY}>
            <SelectTrigger>
              <SelectValue placeholder="Select Y-axis column" />
            </SelectTrigger>
            <SelectContent>
              {data[0].map((header, index) => (
                <SelectItem key={index} value={header}>{header}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}

      {chartData.length > 0 && chartType === 'bar' && (
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

      {chartData.length > 0 && chartType === 'scatter' && (
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" name={selectedColumnX} />
            <YAxis dataKey="y" name={selectedColumnY} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name={`${selectedColumnX} vs ${selectedColumnY}`} data={chartData} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DataVisualization;
