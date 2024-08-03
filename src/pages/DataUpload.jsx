import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const DataUpload = ({ setData }) => {
  const [parsedData, setParsedData] = useState(null);
  const [dataQualityIssues, setDataQualityIssues] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split('\n').map(row => row.split(','));
      setParsedData(rows);
      setData(rows);
      assessDataQuality(rows);
    };

    reader.readAsText(file);
  };

  const assessDataQuality = (data) => {
    const issues = [];
    const headers = data[0];
    const rowCount = data.length;

    // Check for missing values
    headers.forEach((header, index) => {
      const missingCount = data.slice(1).filter(row => !row[index] || row[index].trim() === '').length;
      if (missingCount > 0) {
        issues.push(`Column "${header}" has ${missingCount} missing values (${((missingCount / (rowCount - 1)) * 100).toFixed(2)}%)`);
      }
    });

    // Check for potential outliers (very basic check)
    headers.forEach((header, index) => {
      const values = data.slice(1).map(row => parseFloat(row[index])).filter(val => !isNaN(val));
      if (values.length > 0) {
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const stdDev = Math.sqrt(values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length);
        const outliers = values.filter(val => Math.abs(val - mean) > 3 * stdDev);
        if (outliers.length > 0) {
          issues.push(`Column "${header}" has ${outliers.length} potential outliers`);
        }
      }
    });

    // Check for inconsistent data types
    headers.forEach((header, index) => {
      const types = new Set(data.slice(1).map(row => typeof row[index]));
      if (types.size > 1) {
        issues.push(`Column "${header}" has inconsistent data types`);
      }
    });

    setDataQualityIssues(issues);
  };

  return (
    <div className="space-y-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input type="file" accept=".csv" onChange={handleFileUpload} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload a CSV file to analyze</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TooltipTrigger>
          <TooltipContent>
            <p>Upload a CSV file to analyze</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
            {parsedData.slice(1, 6).map((row, rowIndex) => (
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={() => { setParsedData(null); setData(null); setDataQualityIssues([]); }}>Clear Data</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove the uploaded data</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove the uploaded data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {dataQualityIssues.length > 0 && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Data Quality Issues Detected</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5">
              {dataQualityIssues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DataUpload;
