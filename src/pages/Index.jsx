import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataUpload from './DataUpload';
import StatisticalAnalysis from './StatisticalAnalysis';
import DataVisualization from './DataVisualization';

const Index = () => {
  const [data, setData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Real-Time Data Analysis and Visualization Tool</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload">Upload Data</TabsTrigger>
              <TabsTrigger value="analysis">Statistical Analysis</TabsTrigger>
              <TabsTrigger value="visualization">Data Visualization</TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <DataUpload setData={setData} />
            </TabsContent>
            <TabsContent value="analysis">
              <StatisticalAnalysis data={data} />
            </TabsContent>
            <TabsContent value="visualization">
              <DataVisualization data={data} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;