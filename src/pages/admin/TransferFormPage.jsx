import TransferTable from "../../components/admin/TransferTable";
import TransferForm from "../../components/admin/TransferForm";
import React,{useState} from 'react'

export default function TransferFormPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleFormSubmit = () => {
      setRefreshTrigger(prev => !prev);
  };
  return (

    <div className="flex">
      <div className="flex-1 p-7">
        <TransferForm onSubmitSuccess={handleFormSubmit}/>
        <TransferTable refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}

