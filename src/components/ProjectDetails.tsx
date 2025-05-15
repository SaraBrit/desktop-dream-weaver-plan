
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock project data - in a real app, you would fetch this data based on projectId
const mockProjectDetails = {
  id: "1",
  name: "Projet Construction Immeuble A",
  client: "Société Immobilière XYZ",
  amount: "1,250,000 €",
  status: "in-progress",
  startDate: "2024-09-01",
  endDate: "2025-08-15",
  advancement: 45,
  monthlyBilling: "85,000 €",
  description: "Construction d'un immeuble de 5 étages avec 20 appartements et 2 niveaux de parking souterrain.",
  location: "123 Avenue Principale, 75001 Paris",
  manager: "Jean Dupont"
};

interface ProjectDetailsProps {
  projectId: string;
  onBack: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectId, onBack }) => {
  // In a real app, you would fetch project details based on projectId
  const project = mockProjectDetails;
  
  // Calculate days remaining
  const today = new Date();
  const endDate = new Date(project.endDate);
  const daysRemaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">{project.name}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations Générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Maître d'Ouvrage</p>
                <p className="text-lg">{project.client}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Chef de Projet</p>
                <p className="text-lg">{project.manager}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Montant Total</p>
                <p className="text-lg">{project.amount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Facturation Mensuelle</p>
                <p className="text-lg">{project.monthlyBilling}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground">Localisation</p>
              <p className="text-lg">{project.location}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground">Description</p>
              <p className="text-base">{project.description}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Avancement & Délais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm font-medium">Avancement du projet</p>
                <p className="text-sm font-medium">{project.advancement}%</p>
              </div>
              <Progress value={project.advancement} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date de début</p>
                <p className="text-lg">{new Date(project.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date de fin prévue</p>
                <p className="text-lg">{new Date(project.endDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            <Card className={`${daysRemaining < 30 ? 'border-red-500' : ''} border`}>
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-center">Jours restants avant la date limite</p>
                <p className={`text-3xl font-bold text-center ${daysRemaining < 30 ? 'text-red-500' : ''}`}>
                  {daysRemaining}
                </p>
                {daysRemaining < 30 && (
                  <p className="text-red-500 text-center mt-2 text-sm">
                    Attention: Date limite approchant!
                  </p>
                )}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetails;
