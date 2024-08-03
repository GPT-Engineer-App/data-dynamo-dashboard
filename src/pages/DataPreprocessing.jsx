import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const DataPreprocessing = ({ data, setData }) => {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [preprocessingMethod, setPreprocessingMethod] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [normalizationRange, setNormalizationRange] = useState([0, 1]);
  const [removeOutliers, setRemoveOutliers] = useState(false);

  const handlePreprocessing = () => {
    if (!data || !selectedColumn || !preprocessingMethod) return;

    const columnIndex = data[0].indexOf(selectedColumn);
    let newData = [...data];

    switch (preprocessingMethod) {
      case 'remove_missing':
        newData = newData.filter((row, index) => index === 0 || row[columnIndex] !== '');
        break;
      case 'fill_mean':
      case 'fill_median':
      case 'fill_mode':
        const columnData = newData.slice(1).map(row => parseFloat(row[columnIndex])).filter(val => !isNaN(val));
        let fillValue;
        if (preprocessingMethod === 'fill_mean') {
          fillValue = columnData.reduce((sum, val) => sum + val, 0) / columnData.length;
        } else if (preprocessingMethod === 'fill_median') {
          const sorted = [...columnData].sort((a, b) => a - b);
          fillValue = sorted[Math.floor(sorted.length / 2)];
        } else if (preprocessingMethod === 'fill_mode') {
          fillValue = columnData.reduce((a, b, i, arr) =>
            (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b), columnData[0]);
        }
        newData = newData.map((row, index) => {
          if (index === 0 || row[columnIndex] !== '') return row;
          let newRow = [...row];
          newRow[columnIndex] = fillValue.toString();
          return newRow;
        });
        break;
      case 'fill_custom':
        newData = newData.map((row, index) => {
          if (index === 0 || row[columnIndex] !== '') return row;
          let newRow = [...row];
          newRow[columnIndex] = customValue;
          return newRow;
        });
        break;
      case 'normalize':
        const [min, max] = normalizationRange;
        const values = newData.slice(1).map(row => parseFloat(row[columnIndex]));
        const minVal = Math.min(...values);
        const maxVal = Math.max(...values);
        newData = newData.map((row, index) => {
          if (index === 0) return row;
          let newRow = [...row];
          const normalizedValue = (parseFloat(row[columnIndex]) - minVal) / (maxVal - minVal) * (max - min) + min;
          newRow[columnIndex] = normalizedValue.toFixed(2);
          return newRow;
        });
        break;
    }

    if (removeOutliers) {
      const values = newData.slice(1).map(row => parseFloat(row[columnIndex]));
      const q1 = values[Math.floor(values.length / 4)];
      const q3 = values[Math.floor(values.length * 3 / 4)];
      const iqr = q3 - q1;
      const lowerBound = q1 - 1.5 * iqr;
      const upperBound = q3 + 1.5 * iqr;
      newData = newData.filter((row, index) => 
        index === 0 || (parseFloat(row[columnIndex]) >= lowerBound && parseFloat(row[columnIndex]) <= upperBound)
      );
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

      <Select onValueChange={setPreprocessingMethod}>
        <SelectTrigger>
          <SelectValue placeholder="Select preprocessing method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="remove_missing">Remove missing values</SelectItem>
          <SelectItem value="fill_mean">Fill with mean</SelectItem>
          <SelectItem value="fill_median">Fill with median</SelectItem>
          <SelectItem value="fill_mode">Fill with mode</SelectItem>
          <SelectItem value="fill_custom">Fill with custom value</SelectItem>
          <SelectItem value="normalize">Normalize</SelectItem>
        </SelectContent>
      </Select>

      {preprocessingMethod === 'fill_custom' && (
        <Input
          type="text"
          placeholder="Enter custom value"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
        />
      )}

      {preprocessingMethod === 'normalize' && (
        <div className="space-y-2">
          <Label>Normalization Range</Label>
          <Slider
            min={0}
            max={1}
            step={0.1}
            value={normalizationRange}
            onValueChange={setNormalizationRange}
          />
          <div>Range: {normalizationRange[0]} - {normalizationRange[1]}</div>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Switch
          id="remove-outliers"
          checked={removeOutliers}
          onCheckedChange={setRemoveOutliers}
        />
        <Label htmlFor="remove-outliers">Remove outliers</Label>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handlePreprocessing}>Process Data</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Apply selected preprocessing method to the data</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default DataPreprocessing;
