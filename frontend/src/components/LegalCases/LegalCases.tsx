import React from "react";
import { Link } from "react-router-dom";
import { AiFillCheckCircle, AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { cn } from "@/lib/utils";

// ---- Types ---- //
interface Client {
  id: string;
  name: string;
}

interface CaseSubType {
  id: string;
  name: string;
}

export interface LegalCase {
  id: string;
  slug: string;
  title: string;
  status?: string;
  client_capacity?: string;
  case_sub_type?: CaseSubType;
  clients?: Client[];
}

interface LegalCasesProps {
  cases: LegalCase[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const statusColors: Record<string, string> = {
  "جارى التنفيذ": "text-yellow-500",
  "قيد التنفيذ": "text-orange-500",
  منتهية: "text-green-600",
  متداولة: "text-blue-500",
  استيفاء: "text-purple-500",
};

const statusIcons: Record<string, JSX.Element> = {
  "جارى التنفيذ": <AiFillCheckCircle className="mr-1" />,
  "قيد التنفيذ": <AiFillCheckCircle className="mr-1" />,
  منتهية: <AiFillCheckCircle className="mr-1" />,
  متداولة: <AiFillCheckCircle className="mr-1" />,
  استيفاء: <AiFillCheckCircle className="mr-1" />,
};

const LegalCases: React.FC<LegalCasesProps> = ({ cases, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto border border-border rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-border text-sm">
        <thead className="bg-muted/40">
          <tr>
            <th className="px-4 py-2 text-right font-semibold">#</th>
            <th className="px-4 py-2 text-right font-semibold">رقم الملف</th>
            <th className="px-4 py-2 text-right font-semibold">الموكل</th>
            <th className="px-4 py-2 text-right font-semibold">صفة الموكل</th>
            <th className="px-4 py-2 text-right font-semibold">الموضوع</th>
            <th className="px-4 py-2 text-right font-semibold">نوع القضية</th>
            <th className="px-4 py-2 text-right font-semibold">الحالة</th>
            <th className="px-4 py-2 text-right font-semibold">إجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {cases.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-6 text-muted-foreground">
                لا توجد قضايا مسجلة
              </td>
            </tr>
          ) : (
            cases.map((legCase, index) => {
              const statusText = legCase.status || "غير محدد";
              const textColor = statusColors[statusText] || "text-gray-400";
              const statusIcon = statusIcons[statusText] || null;

              return (
                <tr key={legCase.id} className="hover:bg-muted/20">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 font-mono">{legCase.slug}</td>
                  <td className="px-4 py-2">
                    {legCase.clients && legCase.clients.length > 0 ? (
                      <div className="flex flex-col">
                        {legCase.clients[0].name}
                        {legCase.clients.length > 1 && (
                          <span className="text-xs text-muted-foreground">
                            + {legCase.clients.length - 1} آخرين
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">لا يوجد</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{legCase.client_capacity || "غير محدد"}</td>
                  <td className="px-4 py-2">{legCase.title}</td>
                  <td className="px-4 py-2">{legCase.case_sub_type?.name || "غير محدد"}</td>
                  <td className={cn("px-4 py-2 flex items-center", textColor)}>
                    {statusIcon} {statusText}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Link
                        to={`/legcases/show/${legCase.id}`}
                        className="text-orange-500 hover:text-orange-700"
                        title="عرض"
                      >
                        <AiFillEye size={18} />
                      </Link>
                      {onEdit && (
                        <button
                          onClick={() => onEdit(legCase.id)}
                          className="text-blue-500 hover:text-blue-700"
                          title="تعديل"
                        >
                          <AiFillEdit size={18} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(legCase.id)}
                          className="text-red-500 hover:text-red-700"
                          title="حذف"
                        >
                          <AiFillDelete size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LegalCases;
