import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const MachineLearning = ({ data }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [targetColumn, setTargetColumn] = useState('');
  const [featureColumns, setFeatureColumns] = useState([]);
  const [results, setResults] = useState(null);
  const [testSize, setTestSize] = useState(0.2);
  const [hyperparameters, setHyperparameters] = useState({});
  const [trainedModel, setTrainedModel] = useState(null);
  const [predictionInputs, setPredictionInputs] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [featureImportance, setFeatureImportance] = useState([]);

  useEffect(() => {
    if (featureColumns.length > 0) {
      const initialInputs = {};
      featureColumns.forEach(feature => {
        initialInputs[feature] = '';
      });
      setPredictionInputs(initialInputs);
    }
  }, [featureColumns]);

  const handleTrain = () => {
    // Simulating ML training and prediction
    setTrainingProgress(0);
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setResults({
        accuracy: Math.random().toFixed(2),
        precision: Math.random().toFixed(2),
        recall: Math.random().toFixed(2),
        f1Score: Math.random().toFixed(2),
      });

      // Simulating feature importance
      const importance = featureColumns.map(feature => ({
        feature,
        importance: Math.random().toFixed(2)
      }));
      setFeatureImportance(importance.sort((a, b) => b.importance - a.importance));

      // Simulating a trained model (in reality, this would be the actual trained model)
      setTrainedModel({
        predict: (inputs) => {
          // This is a dummy prediction function
          // In a real scenario, this would use the actual trained model to make predictions
          return Math.random().toFixed(2);
        }
      });
    }, 5000);
  };

  const handlePredictionInputChange = (feature, value) => {
    setPredictionInputs(prev => ({ ...prev, [feature]: value }));
  };

  const handlePredict = () => {
    if (trainedModel) {
      const predictionResult = trainedModel.predict(predictionInputs);
      setPrediction(predictionResult);
    }
  };

  const handleHyperparameterChange = (param, value) => {
    setHyperparameters(prev => ({ ...prev, [param]: value }));
  };

  if (!data) return <div>Please upload data first.</div>;

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">How does it work?</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How Machine Learning Works</DialogTitle>
              <DialogDescription>
                1. Select a machine learning algorithm.<br/>
                2. Choose the target column (what you want to predict).<br/>
                3. Select feature columns (data used for prediction).<br/>
                4. Adjust hyperparameters if available.<br/>
                5. Train the model on your data.<br/>
                6. View model performance metrics.<br/>
                7. Use the trained model to make predictions on new data.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

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

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleTrain}>Train Model</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Train the selected machine learning model on your data</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {trainingProgress > 0 && trainingProgress < 100 && (
        <div className="mt-4">
          <Label>Training Progress</Label>
          <Progress value={trainingProgress} className="w-full" />
        </div>
      )}

      {results && (
        <div className="mt-4 grid grid-cols-2 gap-4">
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

      {featureImportance.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Feature Importance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={featureImportance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="feature" />
              <YAxis />
              <RechartsTooltip />
              <Bar dataKey="importance" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {trainedModel && (
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold">Make Predictions</h3>
          {featureColumns.map(feature => (
            <div key={feature} className="space-y-2">
              <Label>{feature}</Label>
              <Input
                type="number"
                value={predictionInputs[feature]}
                onChange={(e) => handlePredictionInputChange(feature, e.target.value)}
                placeholder={`Enter ${feature} value`}
              />
            </div>
          ))}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handlePredict}>Predict</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Make a prediction using the trained model</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {prediction !== null && (
            <Card>
              <CardHeader>
                <CardTitle>Prediction Result</CardTitle>
              </CardHeader>
              <CardContent>{prediction}</CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default MachineLearning;
