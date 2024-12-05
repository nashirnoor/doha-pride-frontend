import React,{useState} from 'react'
import TourForm from '../../components/admin/TourForm';
import TourTable from '../../components/admin/TourTable';

const AdminTourPage = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const handleFormSubmit = () => {
        setRefreshTrigger(prev => !prev);
    };

    return (
        <div className="flex">
            <div className="flex-1 p-7">
                <TourForm onSubmitSuccess={handleFormSubmit} />
                <TourTable refreshTrigger={refreshTrigger} />
            </div>
        </div>
    );
}

export default AdminTourPage
