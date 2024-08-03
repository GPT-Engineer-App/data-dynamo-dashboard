import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, Heatmap, XAxis, YAxis, Tooltip } from 'recharts';

const CorrelationAnalysis = ({ data }) => {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [correlationData, setCorrelationData] = useState([]);

  useEffect(() => {
    if (data && selectedColumns.length > 1) {
      const correlationMatrix = calculateCorrelationMatrix();
      setCorrelationData(correlationMatrix);
    }
  }, [data, selectedColumns]);

  const calculateCorrelationMatrix = () => {
    const matrix = [];
    for (let i = 0; i < selectedColumns.length; i++) {
      const row = [];
      for (let j = 0; j < selectedColumns.length; j++) {
        if (i === j) {
          row.push({ x: selectedColumns[i], y: selectedColumns[j], value: 1 });
        } else {
          const correlation = calculateCorrelation(selectedColumns[i], selectedColumns[j]);
          row.push({ x: selectedColumns[i], y: selectedColumns[j], value: correlation });
        }
      }
      matrix.push(...row);
    }
    return matrix;
  };

  const calculateCorrelation = (col1, col2) => {
    const index1 = data[0].indexOf(col1);
    const index2 = data[0].indexOf(col2);
    const values1 = data.slice(1).map(row => parseFloat(row[index1])).filter(val => !isNaN(val));
    const values2 = data.slice(1).map(row => parseFloat(row[index2])).filter(val => !isNaN(val));

    const mean1 = values1.reduce((sum, val) => sum + val, 0) / values1.length;
    const mean2 = values2.reduce((sum, val) => sum + val, 0) / values2.length;

    const deviation1 = values1.map(val => val - mean1);
    const deviation2 = values2.map(val => val - mean2);

    const sum1 = deviation1.reduce((sum, val) => sum + val * val, 0);
    const sum2 = deviation2.reduce((sum, val) => sum + val * val, 0);

    const correlation = deviation1.reduce((sum, val, i) => sum + val * deviation2[i], 0) / Math.sqrt(sum1 * sum2);

    return correlation;
  };

  return (
    <div className="space-y-4">
      <Select
        multiple
        value={selectedColumns}
        onValueChange={setSelectedColumns}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select columns for correlation analysis" />
        </SelectTrigger>
        <SelectContent>
          {data && data[0].map((header, index) => (
            <SelectItem key={index} value={header}>{header}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {correlationData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <Heatmap
            data={correlationData}
            dataKey="value"
            xDataKey="x"
            yDataKey="y"
          >
            <XAxis dataKey="x" type="category" />
            <YAxis dataKey="y" type="category" />
            <Tooltip />
          </Heatmap>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CorrelationAnalysis;
