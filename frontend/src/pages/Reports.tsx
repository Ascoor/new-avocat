import { useEffect, useState, FormEvent } from 'react';
import DOMPurify from 'dompurify';
import {
  fetchSearchCourtData,
  searchCourt,
  fetchProcedureOptions,
  searchProcedures,
  SearchCourtData,
  ProcedureSearchParams,
} from '@/lib/api/reports';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const SearchCourtSection = () => {
  const [data, setData] = useState<SearchCourtData>({
    search_degrees: [],
    search_courts: [],
    search_case_types: [],
  });
  const [degree, setDegree] = useState('');
  const [court, setCourt] = useState('');
  const [caseType, setCaseType] = useState('');
  const [caseYear, setCaseYear] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [results, setResults] = useState<string | null>(null);

  useEffect(() => {
    fetchSearchCourtData()
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  const handleDegreeChange = (value: string) => {
    setDegree(value);
    setCourt('');
    setCaseType('');
  };

  const handleCourtChange = (value: string) => {
    setCourt(value);
    setCaseType('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const html = await searchCourt({
        degree,
        court,
        caseType,
        caseYear,
        caseNumber,
      });
      const sanitized = DOMPurify.sanitize(html);
      setResults(sanitized);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle>بحث المحكمة</CardTitle>
        <CardDescription>ابحث عن القضايا في المحاكم</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Select value={degree} onValueChange={handleDegreeChange}>
              <SelectTrigger>
                <SelectValue placeholder="إختر الدرجة" />
              </SelectTrigger>
              <SelectContent>
                {data.search_degrees.map((d) => (
                  <SelectItem key={d.id} value={d.degree_value}>
                    {d.degree_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {degree && (
            <div className="space-y-2">
              <Select value={court} onValueChange={handleCourtChange}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المحكمة" />
                </SelectTrigger>
                <SelectContent>
                  {data.search_courts
                    .filter((c) => c.degree_value === degree)
                    .map((c) => (
                      <SelectItem key={c.id} value={c.court_value}>
                        {c.court_name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {court && (
            <div className="space-y-2">
              <Select value={caseType} onValueChange={setCaseType}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع القضية" />
                </SelectTrigger>
                <SelectContent>
                  {data.search_case_types
                    .filter(
                      (ct) => ct.degree_value === degree && ct.court_value === court,
                    )
                    .map((ct) => (
                      <SelectItem key={ct.id} value={ct.case_type_value}>
                        {ct.case_type_name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <Input
            type="number"
            placeholder="سنة القضية"
            value={caseYear}
            onChange={(e) => setCaseYear(e.target.value)}
          />
          <Input
            type="number"
            placeholder="رقم القضية"
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
          />
          <Button type="submit" className="md:col-span-2">
            بحث
          </Button>
        </form>
        {results && (
          <div className="mt-6" dangerouslySetInnerHTML={{ __html: results }} />
        )}
      </CardContent>
    </Card>
  );
};

const ProcedureSearchSection = () => {
  const [procedureTypes, setProcedureTypes] = useState<Array<{ id: number; name: string }>>([]);
  const [lawyers, setLawyers] = useState<Array<{ id: number; name: string }>>([]);
  const [courts, setCourts] = useState<Array<{ id: number; name: string }>>([]);
  const [params, setParams] = useState<ProcedureSearchParams>({});
  const [results, setResults] = useState<Array<{
    id: number;
    procedure_type?: { name: string };
    lawyer?: { name: string };
    court?: { name: string };
    date_start: string;
    date_end: string;
    result: string;
    status: string;
  }>>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProcedureOptions()
      .then(({ procedureTypes, lawyers, courts }) => {
        setProcedureTypes(procedureTypes);
        setLawyers(lawyers);
        setCourts(courts);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !params.date_start &&
      !params.date_end &&
      !params.lawyer_id &&
      !params.court_id &&
      !params.procedure_type_id &&
      !params.status
    ) {
      setError('لابد من اختيار أحد العناصر للبحث');
      setResults([]);
      return;
    }
    try {
      const data = await searchProcedures(params);
      setResults(data);
      setError('');
    } catch (err) {
      console.error(err);
    }
  };

  const updateParam = (key: keyof ProcedureSearchParams, value: string) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle>بحث الإجراءات</CardTitle>
        <CardDescription>تصفية الإجراءات حسب المعايير</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            value={params.procedure_type_id || ''}
            onValueChange={(v) => updateParam('procedure_type_id', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="نوع الإجراء" />
            </SelectTrigger>
            <SelectContent>
              {procedureTypes.map((p) => (
                <SelectItem key={p.id} value={String(p.id)}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={params.lawyer_id || ''}
            onValueChange={(v) => updateParam('lawyer_id', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="المحامي" />
            </SelectTrigger>
            <SelectContent>
              {lawyers.map((l) => (
                <SelectItem key={l.id} value={String(l.id)}>
                  {l.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Input
              type="date"
              value={params.date_start || ''}
              onChange={(e) => updateParam('date_start', e.target.value)}
              className="flex-1"
            />
            <Input
              type="date"
              value={params.date_end || ''}
              onChange={(e) => updateParam('date_end', e.target.value)}
              className="flex-1"
            />
          </div>
          <Select
            value={params.court_id || ''}
            onValueChange={(v) => updateParam('court_id', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="المحكمة" />
            </SelectTrigger>
            <SelectContent>
              {courts.map((c) => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={params.status || ''}
            onValueChange={(v) => updateParam('status', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="منتهي">منتهي</SelectItem>
              <SelectItem value="لم ينفذ">لم ينفذ</SelectItem>
              <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="md:col-span-2">
            بحث
          </Button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {results.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>نوع الإجراء</TableHead>
                  <TableHead>المحامي</TableHead>
                  <TableHead>جهة الإجراء</TableHead>
                  <TableHead>تاريخ البدء</TableHead>
                  <TableHead>تاريخ الانتهاء</TableHead>
                  <TableHead>نتيجة الإجراء</TableHead>
                  <TableHead>حالة الإجراء</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((p) => (
                  <TableRow key={p.id} className="hover:bg-gray-50">
                    <TableCell>{p.procedure_type?.name || ''}</TableCell>
                    <TableCell>{p.lawyer?.name || ''}</TableCell>
                    <TableCell>{p.court?.name || ''}</TableCell>
                    <TableCell>{p.date_start}</TableCell>
                    <TableCell>{p.date_end}</TableCell>
                    <TableCell>{p.result}</TableCell>
                    <TableCell>{p.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const Reports = () => (
  <div className="space-y-6">
    <SearchCourtSection />
    <ProcedureSearchSection />
  </div>
); 
export default Reports;
