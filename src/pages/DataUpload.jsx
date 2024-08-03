import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DataUpload = ({ setData }) => {
  const [parsedData, setParsedData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split('\n').map(row => row.split(','));
      setParsedData(rows);
      setData(rows);
    };

    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <Input type="file" accept=".csv" onChange={handleFileUpload} />
      {parsedData && (
        <Table>
          <TableHeader>
            <TableRow>
              {parsedData[0].map((header, index) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {parsedData.slice(1).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {parsedData && (
        <Button onClick={() => { setParsedData(null); setData(null); }}>Clear Data</Button>
      )}
    </div>
  );
};

export default DataUpload;