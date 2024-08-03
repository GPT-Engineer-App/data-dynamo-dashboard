import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const DataFiltering = ({ data, setData, addToHistory }) => {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const applyFilter = () => {
    if (!data || !selectedColumn || !filterValue) return;

    const columnIndex = data[0].indexOf(selectedColumn);
    const filteredData = [
      data[0],
      ...data.slice(1).filter(row => row[columnIndex].toString().includes(filterValue))
    ];

    addToHistory(filteredData);
    setData(filteredData);
  };

  return (
    <div className="space-y-4">
      <Select onValueChange={setSelectedColumn}>
        <SelectTrigger>
          <SelectValue placeholder="Select a column to filter" />
        </SelectTrigger>
        <SelectContent>
          {data && data[0].map((header, index) => (
            <SelectItem key={index} value={header}>{header}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="text"
        placeholder="Enter filter value"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
      <Button onClick={applyFilter}>Apply Filter</Button>
    </div>
  );
};

export default DataFiltering;
