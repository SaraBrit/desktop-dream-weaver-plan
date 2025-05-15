
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface RequestManagementProps {
  projectId: string | null;
}

// Mock employee requests
const employeeRequests = [
  { id: "1", type: "Congés", employee: "Martin Dubois", status: "pending", date: "2025-05-10", details: "Congés annuels" },
  { id: "2", type: "Formation", employee: "Sophie Lefèvre", status: "approved", date: "2025-04-22", details: "Formation sécurité" },
  { id: "3", type: "Déplacement", employee: "Thomas Bernard", status: "rejected", date: "2025-04-15", details: "Visite client" }
];

// Mock material requests
const materialRequests = [
  { id: "1", name: "Béton armé", quantity: "15 tonnes", status: "pending", requestDate: "2025-05-05", requiredDate: "2025-05-12" },
  { id: "2", name: "Câbles électriques", quantity: "500 mètres", status: "approved", requestDate: "2025-04-18", requiredDate: "2025-04-25" },
  { id: "3", name: "Briques", quantity: "2000 unités", status: "delivered", requestDate: "2025-04-05", requiredDate: "2025-04-12" }
];

const RequestManagement: React.FC<RequestManagementProps> = ({ projectId }) => {
  const [requestType, setRequestType] = useState<"employee" | "material">("employee");

  const handleCreateRequest = () => {
    toast.success(
      requestType === "employee" 
        ? "Demande d'employé créée avec succès" 
        : "Demande de matériel soumise avec succès"
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">En attente</Badge>;
      case "approved":
        return <Badge variant="secondary">Approuvée</Badge>;
      case "rejected":
        return <Badge variant="destructive">Refusée</Badge>;
      case "delivered":
        return <Badge className="bg-green-500">Livrée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={requestType} onValueChange={(value) => setRequestType(value as "employee" | "material")}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="employee">Demandes d'Employé</TabsTrigger>
            <TabsTrigger value="material">Demandes de Matériels</TabsTrigger>
          </TabsList>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                {requestType === "employee" ? "Nouvelle Demande d'Employé" : "Nouvelle Demande de Matériel"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {requestType === "employee" ? "Soumettre une demande d'employé" : "Demander du matériel"}
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-center text-muted-foreground mb-4">
                  Formulaire pour créer une {requestType === "employee" ? "demande d'employé" : "demande de matériel"}
                </p>
                <Button 
                  className="w-full" 
                  onClick={handleCreateRequest}
                >
                  Soumettre la demande
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <TabsContent value="employee">
          <Card>
            <CardHeader>
              <CardTitle>Demandes d'Employé</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employé</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Détails</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.employee}</TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell>{new Date(request.date).toLocaleDateString()}</TableCell>
                      <TableCell>{request.details}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Détails</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="material">
          <Card>
            <CardHeader>
              <CardTitle>Demandes de Matériels</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Matériel</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Date de demande</TableHead>
                    <TableHead>Date requise</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materialRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.name}</TableCell>
                      <TableCell>{request.quantity}</TableCell>
                      <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(request.requiredDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Détails</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RequestManagement;
