import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

export interface FinRecord {
  id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

interface FinRecordsContextType {
  records: FinRecord[];
  addRecord: (record: FinRecord) => void;
  // updateRecord: (id: string, newRecord: FinRecord) => void;
  // deleteRecord: (id: string) => void;
}

export const FinRecordsContext = createContext<
FinRecordsContextType | undefined
>(undefined)

export const FinRecordsProvider = ({
  children,
} : {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinRecord[]>([]);
  const { user } = useUser()

  const fetchRecords = async () => {
    if (!user) return;
    const response = await fetch(`http://localhost:3001/fin-records/getAllByUserID/${user?.id}`);

    if (response.ok) {
      const records = await response.json();
      setRecords(records);
    }

  };

    useEffect(() => {
      fetchRecords()
    }, [user]);

  const addRecord = async(record: FinRecord) => {
   const response = await fetch("http://localhost:3001/fin-records", {method: "POST", body: JSON.stringify(record),
   headers: {
    "Content-Type": "application/json",

   }
  });
  try {
  if (response.ok) {
    const newRecord = await response.json();
    setRecords((prev) => [...prev, newRecord]);
  }
    } catch(err) {}
  };

  return (<FinRecordsContext.Provider value={{records, addRecord}}> 
    {children} 
  </FinRecordsContext.Provider>
  );
};

export const useFinRecords = () => {
  const context = useContext<FinRecordsContextType | undefined>(
    FinRecordsContext
    );

    if (!context) {
      throw new Error(
        "useFinRecords can only be used within a FinRecordsProvider"
      );
    }

    return context;
};