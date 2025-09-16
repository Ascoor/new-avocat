import React from "react";
import { useLegalCases, useDeleteLegalCase } from "@/hooks/useLegalCases";
import { AiFillDelete } from "react-icons/ai";
import LegalCasesTable from "./LegalCasesTable"; // الجدول اللي كتبته

const LegalCasesContainer: React.FC = () => {
  const { data: cases = [], isLoading, error } = useLegalCases();
  const deleteCase = useDeleteLegalCase();

  if (isLoading) return <p>جار التحميل...</p>;
  if (error) return <p className="text-red-500">حدث خطأ أثناء جلب القضايا</p>;

  return (
    <LegalCasesTable
      cases={cases}
      onDelete={(id) => deleteCase.mutate(id)}
    />
  );
};

export default LegalCasesContainer;
