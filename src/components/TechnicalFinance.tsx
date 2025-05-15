
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface TechnicalFinanceProps {
  projectId: string | null;
}

// Mock measurements data
const measurements = [
  { id: "1", category: "Fondations", quantity: "150 m²", unit: "m²", unitPrice: "120 €", totalPrice: "18,000 €" },
  { id: "2", category: "Murs", quantity: "500 m²", unit: "m²", unitPrice: "85 €", totalPrice: "42,500 €" },
  { id: "3", category: "Toiture", quantity: "300 m²", unit: "m²", unitPrice: "95 €", totalPrice: "28,500 €" },
  { id: "4", category: "Électricité", quantity: "45", unit: "points", unitPrice: "75 €", totalPrice: "3,375 €" }
];

// Mock financial data
const financeEntries = [
  { id: "1", date: "2025-04-01", category: "Main d'œuvre", amount: "25,000 €", type: "expense" },
  { id: "2", date: "2025-03-15", category: "Paiement client", amount: "85,000 €", type: "income" },
  { id: "3", date: "2025-03-10", category: "Matériaux", amount: "32,500 €", type: "expense" },
  { id: "4", date: "2025-02-15", category: "Paiement client", amount: "85,000 €", type: "income" }
];

const TechnicalFinance: React.FC<TechnicalFinanceProps> = ({ projectId }) => {
  const [activeTab, setActiveTab] = useState<"technical" | "finance">("technical");

  const handleAddEntry = () => {
    toast.success(
      activeTab === "technical" 
        ? "Mesure technique ajoutée" 
        : "Transaction financière enregistrée"
    );
  };

  // Calculate totals for measurements
  const totalMeasurementAmount = measurements.reduce((sum, item) => {
    const amount = parseFloat(item.totalPrice.replace(/[^\d.-]/g, ''));
    return sum + amount;
  }, 0);

  // Calculate financial summary
  const income = financeEntries
    .filter(entry => entry.type === "income")
    .reduce((sum, entry) => {
      const amount = parseFloat(entry.amount.replace(/[^\d.-]/g, ''));
      return sum + amount;
    }, 0);
    
  const expenses = financeEntries
    .filter(entry => entry.type === "expense")
    .reduce((sum, entry) => {
      const amount = parseFloat(entry.amount.replace(/[^\d.-]/g, ''));
      return sum + amount;
    }, 0);
    
  const balance = income - expenses;

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "technical" | "finance")}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="technical">Métreur (Bulletin Technique)</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
          </TabsList>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                {activeTab === "technical" ? "Ajouter une mesure" : "Ajouter une transaction"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {activeTab === "technical" ? "Ajouter une nouvelle mesure" : "Enregistrer une transaction financière"}
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-center text-muted-foreground mb-4">
                  Formulaire pour {activeTab === "technical" ? "ajouter une mesure technique" : "enregistrer une transaction"}
                </p>
                <Button 
                  className="w-full" 
                  onClick={handleAddEntry}
                >
                  Enregistrer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <TabsContent value="technical">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mesures Techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Unité</TableHead>
                      <TableHead>Prix unitaire</TableHead>
                      <TableHead>Prix total</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {measurements.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>{item.unitPrice}</TableCell>
                        <TableCell>{item.totalPrice}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Modifier</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium">Montant Total des Mesures</p>
                  <p className="text-xl font-bold">{totalMeasurementAmount.toLocaleString()} €</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="finance">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transactions Financières</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financeEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                        <TableCell>{entry.category}</TableCell>
                        <TableCell>{entry.amount}</TableCell>
                        <TableCell>
                          <span className={entry.type === "income" ? "text-green-600" : "text-red-600"}>
                            {entry.type === "income" ? "Revenu" : "Dépense"}
                          </span>
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <p className="text-green-800 font-medium">Revenus Totaux</p>
                  <p className="text-2xl font-bold text-green-700">{income.toLocaleString()} €</p>
                </CardContent>
              </Card>
              
              <Card className="bg-red-50 border-red-200">
                <CardContent className="pt-6">
                  <p className="text-red-800 font-medium">Dépenses Totales</p>
                  <p className="text-2xl font-bold text-red-700">{expenses.toLocaleString()} €</p>
                </CardContent>
              </Card>
              
              <Card className={`${balance >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'}`}>
                <CardContent className="pt-6">
                  <p className={`${balance >= 0 ? 'text-blue-800' : 'text-amber-800'} font-medium`}>Balance</p>
                  <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-700' : 'text-amber-700'}`}>
                    {balance.toLocaleString()} €
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TechnicalFinance;
