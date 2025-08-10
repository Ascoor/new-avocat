
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Plus, Search, DollarSign, Edit, Trash2, Gavel, FileText, Users, Scale } from 'lucide-react';

const mockServices = [
  {
    id: '1',
    name: 'Personal Injury Consultation',
    description: 'Comprehensive consultation for personal injury cases',
    category: 'Personal Injury',
    hourlyRate: 300,
    isActive: true,
    icon: Gavel
  },
  {
    id: '2',
    name: 'Contract Review & Drafting',
    description: 'Professional contract review and legal document drafting',
    category: 'Contract Law',
    hourlyRate: 250,
    isActive: true,
    icon: FileText
  },
  {
    id: '3',
    name: 'Family Law Mediation',
    description: 'Mediation services for family law disputes',
    category: 'Family Law',
    hourlyRate: 200,
    isActive: true,
    icon: Users
  },
  {
    id: '4',
    name: 'Criminal Defense',
    description: 'Legal representation for criminal cases', 
    category: 'Criminal Law',
    hourlyRate: 400,
    isActive: false,
    icon: Scale
  }
];

export const Services = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = mockServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('common.services')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your legal service offerings and pricing
          </p>
        </div>
        
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Service
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Legal Services</CardTitle>
              <CardDescription>
                {filteredServices.length} services available
              </CardDescription>
            </div>
            
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              
              return (
                <Card
                  key={service.id}
                  className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <Badge 
                            variant="secondary" 
                            className="mt-1"
                          >
                            {service.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <Badge 
                        variant={service.isActive ? 'default' : 'secondary'}
                        className={service.isActive ? 'bg-green-100 text-green-800' : ''}
                      >
                        {service.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-lg font-semibold text-green-600 dark:text-green-400">
                        <DollarSign className="h-4 w-4" />
                        {service.hourlyRate}/hr
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
