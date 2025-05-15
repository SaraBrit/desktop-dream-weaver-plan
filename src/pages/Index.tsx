
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectList from "@/components/ProjectList";
import ProjectDetails from "@/components/ProjectDetails";
import InvoiceManagement from "@/components/InvoiceManagement";
import WorkTracking from "@/components/WorkTracking";
import RequestManagement from "@/components/RequestManagement";
import TechnicalFinance from "@/components/TechnicalFinance";
import { toast } from "sonner";

const Index = () => {
  const [activePhase, setActivePhase] = useState("projects");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActivePhase("details");
    toast.success("Projet sélectionné");
  };

  const handleBackToProjects = () => {
    setActivePhase("projects");
    setSelectedProjectId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gestion de Projets</h1>
      
      <Tabs value={activePhase} onValueChange={setActivePhase} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="projects">Clôtures de Projets</TabsTrigger>
          <TabsTrigger value="details">Fiche de Projet</TabsTrigger>
          <TabsTrigger value="invoicing">Facture et Durée</TabsTrigger>
          <TabsTrigger value="requests">Demandes</TabsTrigger>
          <TabsTrigger value="technical">Métreur et Finance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="space-y-4">
          <ProjectList onSelectProject={handleProjectSelect} />
        </TabsContent>
        
        <TabsContent value="details" className="space-y-4">
          {selectedProjectId ? (
            <ProjectDetails projectId={selectedProjectId} onBack={handleBackToProjects} />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">Veuillez sélectionner un projet</p>
                <Button onClick={() => setActivePhase("projects")} className="mt-4 mx-auto block">
                  Retourner aux projets
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="invoicing" className="space-y-4">
          <InvoiceManagement projectId={selectedProjectId} />
        </TabsContent>
        
        <TabsContent value="requests" className="space-y-4">
          <RequestManagement projectId={selectedProjectId} />
        </TabsContent>
        
        <TabsContent value="technical" className="space-y-4">
          <TechnicalFinance projectId={selectedProjectId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
