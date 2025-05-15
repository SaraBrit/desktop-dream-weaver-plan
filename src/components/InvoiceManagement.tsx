
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { toast } from "sonner";

interface InvoiceManagementProps {
  projectId: string | null;
}

// Mock invoices data
const mockInvoices = [
  { id: "1", project: "Projet Construction Immeuble A", date: "2025-04-15", amount: "85,000 €", status: "paid" },
  { id: "2", project: "Projet Construction Immeuble A", date: "2025-03-15", amount: "85,000 €", status: "paid" },
  { id: "3", project: "Projet Construction Immeuble A", date: "2025-02-15", amount: "85,000 €", status: "paid" },
  { id: "4", project: "Projet Construction Immeuble A", date: "2025-01-15", amount: "85,000 €", status: "paid" }
];

// Mock work hours data
const mockWorkHours = [
  { id: "1", date: "2025-04-10", hours: 45, employee: "Équipe A", task: "Fondations" },
  { id: "2", date: "2025-04-03", hours: 38, employee: "Équipe B", task: "Électricité" },
  { id: "3", date: "2025-03-27", hours: 42, employee: "Équipe A", task: "Plomberie" },
  { id: "4", date: "2025-03-20", hours: 40, employee: "Équipe C", task: "Maçonnerie" }
];

const InvoiceManagement: React.FC<InvoiceManagementProps> = ({ projectId }) => {
  const [activeTab, setActiveTab] = useState<"invoices" | "hours">("invoices");
  const [showDelayWarning, setShowDelayWarning] = useState(true);

  const handleCreateInvoice = () => {
    toast.success("Facture créée avec succès");
  };

  const handleAddWorkHours = () => {
    toast.success("Heures de travail ajoutées");
  };

  const dismissWarning = () => {
    setShowDelayWarning(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Button 
            variant={activeTab === "invoices" ? "default" : "outline"} 
            onClick={() => setActiveTab("invoices")}
          >
            Factures
          </Button>
          <Button 
            variant={activeTab === "hours" ? "default" : "outline"} 
            onClick={() => setActiveTab("hours")}
          >
            Durée de Travail
          </Button>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              {activeTab === "invoices" ? "Nouvelle Facture" : "Ajouter des Heures"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {activeTab === "invoices" ? "Créer une nouvelle facture" : "Enregistrer des heures de travail"}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-center text-muted-foreground">
                Formulaire pour {activeTab === "invoices" ? "créer une facture" : "ajouter des heures de travail"}
              </p>
              <Button 
                className="w-full mt-4" 
                onClick={activeTab === "invoices" ? handleCreateInvoice : handleAddWorkHours}
              >
                {activeTab === "invoices" ? "Créer la facture" : "Enregistrer les heures"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {showDelayWarning && (
        <Card className="border-red-500 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <p className="font-medium text-red-600">
                ATTENTION: Retard de livraison détecté sur ce projet! 
                Veuillez ajuster la planification ou contacter le client.
              </p>
              <Button variant="outline" size="sm" onClick={dismissWarning}>
                Fermer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {activeTab === "invoices" ? (
        <Card>
          <CardHeader>
            <CardTitle>Factures</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° Facture</TableHead>
                  <TableHead>Projet</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>FACT-{invoice.id.padStart(4, '0')}</TableCell>
                    <TableCell>{invoice.project}</TableCell>
                    <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      {invoice.status === "paid" ? (
                        <span className="text-green-600 font-medium">Payée</span>
                      ) : (
                        <span className="text-amber-600 font-medium">En attente</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Détails</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Heures de Travail</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Employé/Équipe</TableHead>
                  <TableHead>Tâche</TableHead>
                  <TableHead>Heures</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockWorkHours.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                    <TableCell>{entry.employee}</TableCell>
                    <TableCell>{entry.task}</TableCell>
                    <TableCell>{entry.hours}h</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Modifier</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InvoiceManagement;
