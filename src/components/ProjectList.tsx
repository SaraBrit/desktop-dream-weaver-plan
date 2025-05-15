
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  name: string;
  client: string;
  amount: string;
  status: "in-progress" | "completed" | "delayed";
  endDate: string;
}

// Sample mock data
const mockProjects: Project[] = [
  {
    id: "1",
    name: "Projet Construction Immeuble A",
    client: "Société Immobilière XYZ",
    amount: "1,250,000 €",
    status: "in-progress",
    endDate: "2025-08-15",
  },
  {
    id: "2",
    name: "Rénovation Site Industriel",
    client: "Industries Métallurgiques",
    amount: "750,000 €",
    status: "delayed",
    endDate: "2025-07-20",
  },
  {
    id: "3",
    name: "Construction Centre Commercial",
    client: "Groupe Commercial ABC",
    amount: "2,800,000 €",
    status: "completed",
    endDate: "2025-04-30",
  }
];

interface ProjectListProps {
  onSelectProject: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ onSelectProject }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Liste des Projets</span>
          <Button size="sm">Nouveau Projet</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom du Projet</TableHead>
              <TableHead>Maître d'Ouvrage</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date de fin</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>{project.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      project.status === "in-progress" ? "default" :
                      project.status === "completed" ? "secondary" : "destructive"
                    }
                  >
                    {project.status === "in-progress" ? "En cours" :
                     project.status === "completed" ? "Terminé" : "En retard"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(project.endDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => onSelectProject(project.id)}>
                    Détails
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProjectList;
