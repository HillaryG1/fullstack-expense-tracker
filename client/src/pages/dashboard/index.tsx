import { useUser } from "@clerk/clerk-react";
import { RecordForm } from "./record-form";
import { RecordList } from "./record-list";
import "./record-form.css"
export const Dashboard = () => {

  const { user } = useUser();
  return (
  <div className="dashboard-container">
    <h1> <span>Welcome {user?.firstName}!</span> Here Are Your Finances:</h1>
    <RecordForm/>
    <RecordList/>
  </div>
  );
};