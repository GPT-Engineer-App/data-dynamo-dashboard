import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import DataUpload from './DataUpload';
import StatisticalAnalysis from './StatisticalAnalysis';
import DataVisualization from './DataVisualization';
import DataPreprocessing from './DataPreprocessing';
import MachineLearning from './MachineLearning';
import DataExport from './DataExport';
import DataFiltering from './DataFiltering';
import DataSorting from './DataSorting';
import DataTransformation from './DataTransformation';
import CorrelationAnalysis from './CorrelationAnalysis';

const DataInsightHub = () => {
  const [data, setData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.body.classList.toggle('dark', savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.body.classList.toggle('dark', newDarkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Data Insight Hub</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={toggleDarkMode} variant="outline" size="icon">
                  {darkMode ? <SunIcon className="h-[1.2rem] w-[1.2rem]" /> : <MoonIcon className="h-[1.2rem] w-[1.2rem]" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle dark mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-4">
                  <TabsTrigger value="upload">Upload Data</TabsTrigger>
                  <TabsTrigger value="preprocessing">Data Preprocessing</TabsTrigger>
                  <TabsTrigger value="analysis">Statistical Analysis</TabsTrigger>
                  <TabsTrigger value="visualization">Data Visualization</TabsTrigger>
                  <TabsTrigger value="ml">Machine Learning</TabsTrigger>
                </TabsList>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="export">Data Export</TabsTrigger>
                  <TabsTrigger value="filtering">Data Filtering</TabsTrigger>
                  <TabsTrigger value="sorting">Data Sorting</TabsTrigger>
                  <TabsTrigger value="transformation">Data Transformation</TabsTrigger>
                  <TabsTrigger value="correlation">Correlation Analysis</TabsTrigger>
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
                  <DataVisualization data={data} darkMode={darkMode} />
                </TabsContent>
                <TabsContent value="ml">
                  <MachineLearning data={data} />
                </TabsContent>
                <TabsContent value="export">
                  <DataExport data={data} />
                </TabsContent>
                <TabsContent value="filtering">
                  <DataFiltering data={data} setData={setData} />
                </TabsContent>
                <TabsContent value="sorting">
                  <DataSorting data={data} setData={setData} />
                </TabsContent>
                <TabsContent value="transformation">
                  <DataTransformation data={data} setData={setData} />
                </TabsContent>
                <TabsContent value="correlation">
                  <CorrelationAnalysis data={data} />
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
