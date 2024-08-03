import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MachineLearning = ({ data }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [targetColumn, setTargetColumn] = useState('');
  const [featureColumns, setFeatureColumns] = useState([]);
  const [results, setResults] = useState(null);

  const handleTrain = () => {
    // Simulating ML training and prediction
    setResults({
      accuracy: Math.random().toFixed(2),
      precision: Math.random().toFixed(2),
      recall: Math.random().toFixed(2),
      f1Score: Math.random().toFixed(2),
    });
  };

  if (!data) return <div>Please upload data first.</div>;

  return (
    <div className="space-y-4">
      <Select onValueChange={setSelectedAlgorithm}>
        <SelectTrigger>
          <SelectValue placeholder="Select ML algorithm" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="linear_regression">Linear Regression</SelectItem>
          <SelectItem value="logistic_regression">Logistic Regression</SelectItem>
          <SelectItem value="decision_tree">Decision Tree</SelectItem>
          <SelectItem value="random_forest">Random Forest</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setTargetColumn}>
        <SelectTrigger>
          <SelectValue placeholder="Select target column" />
        </SelectTrigger>
        <SelectContent>
          {data[0].map((header, index) => (
            <SelectItem key={index} value={header}>{header}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => setFeatureColumns([...featureColumns, value])}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select feature columns" />
        </SelectTrigger>
        <SelectContent>
          {data[0].map((header, index) => (
            <SelectItem key={index} value={header}>{header}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div>
        Selected features: {featureColumns.join(', ')}
      </div>

      <Button onClick={handleTrain}>Train Model</Button>

      {results && (
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Accuracy</CardTitle>
            </CardHeader>
            <CardContent>{results.accuracy}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Precision</CardTitle>
            </CardHeader>
            <CardContent>{results.precision}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recall</CardTitle>
            </CardHeader>
            <CardContent>{results.recall}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>F1 Score</CardTitle>
            </CardHeader>
            <CardContent>{results.f1Score}</CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MachineLearning;
