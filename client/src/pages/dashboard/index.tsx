import { useUser } from "@clerk/clerk-react";
import { RecordForm } from "./record-form";
import { RecordList } from "./record-list";
import "./record-form.css"
import { useFinRecords } from "../../contexts/fin-record-context";
import { useMemo } from "react";
export const Dashboard = () => {

  const { user } = useUser();
  const { records } = useFinRecords();

  const totalMonthly = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record => {
      totalAmount += record.amount
    })) ;

    return totalAmount;

  }, [records]);
  return (
  <div className="dashboard-container">
    <h1> <span>Welcome {user?.firstName}!</span> Here Are Your Finances:</h1>
    <RecordForm/>
      <div>Total: ${totalMonthly}</div>
    <RecordList/>
  </div>
  );
};