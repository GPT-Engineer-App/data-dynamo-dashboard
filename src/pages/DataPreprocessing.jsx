import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const DataPreprocessing = ({ data, setData }) => {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [fillMethod, setFillMethod] = useState('');
  const [customValue, setCustomValue] = useState('');

  const handleMissingValues = () => {
    if (!data || !selectedColumn || !fillMethod) return;

    const columnIndex = data[0].indexOf(selectedColumn);
    let newData = [...data];

    if (fillMethod === 'remove') {
      newData = newData.filter((row, index) => index === 0 || row[columnIndex] !== '');
    } else {
      let fillValue = customValue;
      if (fillMethod === 'mean' || fillMethod === 'median' || fillMethod === 'mode') {
        const columnData = newData.slice(1).map(row => parseFloat(row[columnIndex])).filter(val => !isNaN(val));
        if (fillMethod === 'mean') {
          fillValue = columnData.reduce((sum, val) => sum + val, 0) / columnData.length;
        } else if (fillMethod === 'median') {
          const sorted = [...columnData].sort((a, b) => a - b);
          fillValue = sorted[Math.floor(sorted.length / 2)];
        } else if (fillMethod === 'mode') {
          fillValue = columnData.reduce((a, b, i, arr) =>
            (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b), columnData[0]);
        }
      }
      newData = newData.map((row, index) => {
        if (index === 0 || row[columnIndex] !== '') return row;
        let newRow = [...row];
        newRow[columnIndex] = fillValue.toString();
        return newRow;
      });
    }

    setData(newData);
  };

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

      <Select onValueChange={setFillMethod}>
        <SelectTrigger>
          <SelectValue placeholder="Select fill method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="remove">Remove rows</SelectItem>
          <SelectItem value="mean">Fill with mean</SelectItem>
          <SelectItem value="median">Fill with median</SelectItem>
          <SelectItem value="mode">Fill with mode</SelectItem>
          <SelectItem value="custom">Fill with custom value</SelectItem>
        </SelectContent>
      </Select>

      {fillMethod === 'custom' && (
        <Input
          type="text"
          placeholder="Enter custom value"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
        />
      )}

      <Button onClick={handleMissingValues}>Process Missing Values</Button>
    </div>
  );
};

export default DataPreprocessing;
