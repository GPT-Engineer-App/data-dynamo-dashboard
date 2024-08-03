import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const MachineLearning = ({ data }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [targetColumn, setTargetColumn] = useState('');
  const [featureColumns, setFeatureColumns] = useState([]);
  const [results, setResults] = useState(null);
  const [testSize, setTestSize] = useState(0.2);
  const [hyperparameters, setHyperparameters] = useState({});

  const handleTrain = () => {
    // Simulating ML training and prediction
    setResults({
      accuracy: Math.random().toFixed(2),
      precision: Math.random().toFixed(2),
      recall: Math.random().toFixed(2),
      f1Score: Math.random().toFixed(2),
    });
  };

  const handleHyperparameterChange = (param, value) => {
    setHyperparameters(prev => ({ ...prev, [param]: value }));
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
          <SelectItem value="svm">Support Vector Machine</SelectItem>
          <SelectItem value="knn">K-Nearest Neighbors</SelectItem>
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

      <div className="space-y-2">
        <Label>Test Size</Label>
        <Slider
          min={0.1}
          max={0.5}
          step={0.1}
          value={[testSize]}
          onValueChange={([value]) => setTestSize(value)}
        />
        <div>Test Size: {testSize}</div>
      </div>

      {selectedAlgorithm === 'random_forest' && (
        <div className="space-y-2">
          <Label>Number of Trees</Label>
          <Input
            type="number"
            value={hyperparameters.n_estimators || 100}
            onChange={(e) => handleHyperparameterChange('n_estimators', e.target.value)}
          />
        </div>
      )}

      {selectedAlgorithm === 'knn' && (
        <div className="space-y-2">
          <Label>Number of Neighbors</Label>
          <Input
            type="number"
            value={hyperparameters.n_neighbors || 5}
            onChange={(e) => handleHyperparameterChange('n_neighbors', e.target.value)}
          />
        </div>
      )}

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
