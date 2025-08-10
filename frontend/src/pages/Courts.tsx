
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Search, MapPin, Phone, Building, Scale } from 'lucide-react';

const mockCourts = [
  {
    id: '1',
    name: 'Central District Court',
    address: '123 Justice Boulevard',
    city: 'Downtown',
    state: 'NY',
    zipCode: '10001',
    phone: '+1 (555) 123-4567',
    type: 'district',
    jurisdiction: 'Civil and Criminal'
  },
  {
    id: '2',
    name: 'Superior Court of Appeals',
    address: '456 Court Street',
    city: 'Midtown',
    state: 'NY',
    zipCode: '10002',
    phone: '+1 (555) 987-6543',
    type: 'appellate',
    jurisdiction: 'Appeals'
  },
  {
    id: '3',
    name: 'Family Court Division',
    address: '789 Family Way',
    city: 'Uptown',
    state: 'NY',
    zipCode: '10003',
    phone: '+1 (555) 456-7890',
    type: 'circuit',
    jurisdiction: 'Family Law'
  },
  {
    id: '4',
    name: 'Supreme Court Building',
    address: '100 Supreme Plaza',
    city: 'Capital City',
    state: 'NY',
    zipCode: '10004',
    phone: '+1 (555) 321-0987',
    type: 'supreme',
    jurisdiction: 'Constitutional Law'
  }
];

const courtTypeConfig = {
  district: { label: 'District Court', color: 'bg-blue-100 text-blue-800' },
  circuit: { label: 'Circuit Court', color: 'bg-green-100 text-green-800' },
  appellate: { label: 'Appellate Court', color: 'bg-purple-100 text-purple-800' },
  supreme: { label: 'Supreme Court', color: 'bg-red-100 text-red-800' }
};

export const Courts = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourts = mockCourts.filter(court =>
    court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    court.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    court.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase()) ||
    court.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('common.courts')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search and find court information across jurisdictions
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Court Directory</CardTitle>
              <CardDescription>
                {filteredCourts.length} courts found
              </CardDescription>
            </div>
            
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourts.map((court) => (
              <Card
                key={court.id}
                className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                        <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{court.name}</CardTitle>
                        <Badge className={courtTypeConfig[court.type as keyof typeof courtTypeConfig].color}>
                          {courtTypeConfig[court.type as keyof typeof courtTypeConfig].label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-gray-900 dark:text-white">{court.address}</p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {court.city}, {court.state} {court.zipCode}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{court.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">
                        Jurisdiction: {court.jurisdiction}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
