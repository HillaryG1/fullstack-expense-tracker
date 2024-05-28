import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

export interface FinRecord {
  _id?: string;
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
  updateRecord: (id: string, newRecord: FinRecord) => void;
  deleteRecord: (id: string) => void;
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

  const updateRecord = async(id: string, newRecord: FinRecord) => {
    const response = await fetch(`http://localhost:3001/fin-records/${id}`, {method: "PUT", body: JSON.stringify(newRecord),
    headers: {
     "Content-Type": "application/json",
 
    }
   });
   try {
   if (response.ok) {
     const newRecord = await response.json();
     setRecords((prev) => prev.map((record) => {
      if (record._id === id) {
        return newRecord;
      } else {
        return record;
      }

     }));
   }
     } catch(err) {}
   };

   const deleteRecord = async (id: string) => {
    const response = await fetch(`http://localhost:3001/fin-records/${id}`, {
      method: "DELETE", 
 
    }
   );
   try {
   if (response.ok) {
     const deleteRecord = await response.json();
     setRecords((prev) => prev.filter((record) => record._id !== deleteRecord._id));
   }
     } catch(err) {}
   }

  return (<FinRecordsContext.Provider value={{records, addRecord, updateRecord, deleteRecord}}> 
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