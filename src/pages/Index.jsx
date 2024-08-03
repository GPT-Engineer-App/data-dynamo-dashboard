import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import DataUpload from './DataUpload';
import StatisticalAnalysis from './StatisticalAnalysis';
import DataVisualization from './DataVisualization';
import DataPreprocessing from './DataPreprocessing';
import MachineLearning from './MachineLearning';

const Index = () => {
  const [data, setData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Advanced Data Analysis and Visualization Tool</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="upload">Upload Data</TabsTrigger>
                  <TabsTrigger value="preprocessing">Data Preprocessing</TabsTrigger>
                  <TabsTrigger value="analysis">Statistical Analysis</TabsTrigger>
                  <TabsTrigger value="visualization">Data Visualization</TabsTrigger>
                  <TabsTrigger value="ml">Machine Learning</TabsTrigger>
                </TabsList>
                <TabsContent value="upload">
                  <DataUpload setData={setData} />
                </TabsContent>
                <TabsContent value="preprocessing">
                  <DataPreprocessing data={data} setData={setData} />
                </TabsContent>
                <TabsContent value="analysis">
                  <StatisticalAnalysis data={data} />
                </TabsContent>
                <TabsContent value="visualization">
                  <DataVisualization data={data} />
                </TabsContent>
                <TabsContent value="ml">
                  <MachineLearning data={data} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
