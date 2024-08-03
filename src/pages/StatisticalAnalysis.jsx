import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatisticalAnalysis = ({ data }) => {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    if (data && selectedColumn) {
      const columnData = data.slice(1).map(row => parseFloat(row[data[0].indexOf(selectedColumn)])).filter(val => !isNaN(val));
      
      const mean = columnData.reduce((sum, val) => sum + val, 0) / columnData.length;
      const sortedData = [...columnData].sort((a, b) => a - b);
      const median = sortedData[Math.floor(sortedData.length / 2)];
      const mode = columnData.reduce((a, b, i, arr) =>
        (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b), columnData[0]);
      const variance = columnData.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / columnData.length;
      const stdDev = Math.sqrt(variance);

      setStatistics({ mean, median, mode, stdDev });
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

      {statistics && (
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Mean</CardTitle>
            </CardHeader>
            <CardContent>{statistics.mean.toFixed(2)}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Median</CardTitle>
            </CardHeader>
            <CardContent>{statistics.median.toFixed(2)}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mode</CardTitle>
            </CardHeader>
            <CardContent>{statistics.mode.toFixed(2)}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Standard Deviation</CardTitle>
            </CardHeader>
            <CardContent>{statistics.stdDev.toFixed(2)}</CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StatisticalAnalysis;