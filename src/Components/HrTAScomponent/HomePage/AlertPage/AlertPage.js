import React, { useEffect, useState } from 'react';
import Notification from "../../../../Assets/HrTas/notifications_active.svg";
import "../AlertPage/Alert.css"
import editIcon from '../../../../Assets/Superadmin/edit-svgrepo-com.svg'
import deleteIcon from '../../../../Assets/Superadmin/delete.svg'
import AddBtn from "../../../../Assets/HrTas/add.svg";
import CloseBtn from "../../../../Assets/HrTas/close.svg";
import Api from '../../../../Services/Api';
import { ClipLoader } from 'react-spinners';



function AlertPage() {

    const [alerts, setAlerts] = useState([]);
    const [alertsError, setAlertsError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertDescription, setAlertDescription] = useState('');
    const [alertDate, setAlertDate] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [updatedAlert, setUpdatedAlert] = useState(null);
    const [deleteId, setDeleteId] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const token = localStorage.getItem('token');
    const today = new Date().toISOString().split('T')[0];

    const isValid = alertTitle && alertDescription && alertDate;

    const handleCreateAlert = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setUpdatedAlert(null);
        setAlertTitle('');
        setAlertDescription('');
        setAlertDate('');
    }

    const handleEditClick = (id) => {
        const alertTobeUpdated = alerts.find(alert => alert.id === id);
        setUpdatedAlert(alertTobeUpdated);
        setIsModalOpen(true);
        setAlertTitle(alertTobeUpdated.title);
        setAlertDescription(alertTobeUpdated.description);
        setAlertDate(alertTobeUpdated.date);
    }

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setDeleteModal(true);
    }

    const handleDeleteModalCancel = () => {
        setDeleteModal(false);
    }

    const handleDeleteModalConfirm = () => {
        setIsDeleting(true);
        console.log('Deleting alert id :', deleteId);
        Api.delete(`api/alert/${deleteId}`, {
            'Authorization': `Bearer ${token}`
        })
        .then(response => {
            setIsDeleting(false);
            if(response && response.data) {
                console.log(response.data.message);
                setRefreshKey(prev => prev + 1);
                setDeleteModal(false);
            } else {
                console.error('Invalid response data :', response);
                alert('Can not delete alert. Please try again.');
            }
        })
    }

    const handleUpdate = (e) => {
        setIsAdding(true);
        Api.put('api/alert', {
            "id": updatedAlert.id,
            "title": alertTitle,
            "description": alertDescription,
            "date": alertDate
        }, { 'Authorization': `Bearer ${token}` })
            .then(response => {
                setIsAdding(false);
                setUpdatedAlert(null);
                setAlertTitle('');
                setAlertDescription('');
                setAlertDate('');
                setRefreshKey(prev => prev + 1);
                setIsModalOpen(false);
                console.log('Updated alert stats :', response);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsAdding(true);
        Api.post('api/alert', {
            "title": alertTitle,
            "description": alertDescription,
            "date": alertDate
        }, { 'Authorization': `Bearer ${token}` })
            .then(response => {
                setIsAdding(false);
                setAlertTitle('');
                setAlertDescription('');
                setAlertDate('');
                setIsModalOpen(false);
                if (response && response.data) {
                    console.log('New alert added :', response.data);
                    setRefreshKey(prev => prev + 1);
                } else {
                    console.log('Failed to add alert :', response);
                    alert('Alert not added. Please try again.');
                }
            })
    }

    useEffect(() => {
        Api.get('api/alert', {
            'Authorization': `Bearer ${token}`
        })
            .then(response => {
                if (response && response.data) {
                    console.log('alertss:', response.data.content);
                    setAlerts(response.data.content);
                } else {
                    console.error('Invalid response data :', response);
                    setAlertsError('Failed to fetch alerts')
                }
            })
    }, [refreshKey])

    return (
        <div>

            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start'>
                    <img className='w-5 h-5' src={Notification} alt="Notification" />
                    <h1 className='text-[20px] font-medium text-[#1255D0] ml-1'>Alerts</h1>
                </div>
                <button
                    onClick={handleCreateAlert}
                    className='border text-[12px] font-normal flex items-center px-4 py-2 rounded-lg ml-2'
                >
                    <img className='w-4 h-4 mr-1' src={AddBtn} alt="" /> Create New
                </button>
            </div>


            <div className='h-[224px] overflow-y-auto custom-scrollbar mr-6 mt-[20px]  '>
                {alerts.map((alert, index) => (
                    <div key={index} className={`flex items-center ${index > 0 ? 'mt-6' : ''}`}>
                        <div className='w-10 h-10 bg-[#EAE4FF] rounded-md text-[12px] leading-4 text-[#685899] text-center p-1'>
                            <h1 className='font-semibold'>{alert.day}</h1>
                            <h1 className='font-normal'>{alert.date}</h1>
                        </div>
                        <div className='text-[14px] leading-[18px] ml-2'>
                            <h1 className='font-medium text-[#373737]'>{alert.title}</h1>
                            <h1 className='font-normal text-[#696A70]'>{alert.description}</h1>
                        </div>

                        <div className='flex items-center justify-center gap-4 ml-auto'>
                            <img src={editIcon} className='h-3 w-3 hover:cursor-pointer' onClick={() => handleEditClick(alert.id)}></img>
                            <img src={deleteIcon} className='hover:cursor-pointer' onClick={() => handleDeleteClick(alert.id)}></img>
                        </div>

                    </div>
                ))}
            </div>

            {deleteModal && (
                <div className="fixed inset-0 bg-neutral-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-auto p-10  shadow-lg">
                        {isDeleting ?
                            <div className='flex gap-4 px-4'>
                                <div>
                                    <ClipLoader
                                        color={'#465062'}
                                        loading={true}
                                        size={35}
                                        aria-label="Loading Spinner"
                                        data-testid="Loader"
                                    />
                                </div>
                                <div className='mt-2'>Deleing Please wait..</div>
                            </div> :
                            <div>
                                <div className='text-[18px] text-[#373737]'>Are you sure to delete this Alert ?</div>
                                <div className='flex gap-4 mt-8 w-fit ml-auto'>
                                    <button className='bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]' onClick={handleDeleteModalCancel}>Cancel</button>
                                    <button className='bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]' onClick={handleDeleteModalConfirm}>Delete</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-[57%] flex justify-center items-center">
                    <div className="bg-white p-6  w-[504px]">
                        <div className='flex items-center justify-between'>
                            <h2 className="text-[16px] font-medium">Add an Alert</h2>
                            <img
                                onClick={closeModal}
                                src={CloseBtn} alt="" />
                        </div>

                        <input
                            type="text"
                            value={alertTitle}
                            onChange={(e) => setAlertTitle(e.target.value)}
                            placeholder="Enter To-Do Task"
                            className="border px-6 py-2 w-full mt-6 h-[88px] placeholder:mt-2"
                        />

                        <input
                            type="text"
                            value={alertDescription}
                            onChange={(e) => setAlertDescription(e.target.value)}
                            placeholder="Enter To-Do Task"
                            className="border px-6 py-2 w-full mt-6 h-[88px] placeholder:mt-2"
                        />

                        <input
                            type="date"
                            name="alertDate"
                            value={alertDate}
                            min={today}
                            onChange={(e) => setAlertDate(e.target.value)}
                            className="w-[251px] h-[48px] p-2 text-[#696A70] text-sm font-normal focus:outline-[#A4A4E5] mt-2 rounded-lg border-[#E6E6E7] border "
                        />

                        <div className="flex justify-end mt-8">
                            <button
                                onClick={closeModal}
                                className="bg-[#ffffff] text-[#2C2B2B] border px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={updatedAlert ? handleUpdate : handleSubmit}
                                className="bg-[#6C55B2] ml-4 text-white px-4 py-2 rounded-lg"
                            >
                                {isAdding ?
                                    <div>
                                        <ClipLoader
                                            color={'#ffffff'}
                                            loading={true}
                                            size={20}
                                            aria-label="Loading Spinner"
                                            data-testid="Loader"
                                        />
                                    </div> :
                                    <div className={isValid ? '' : ''}>{updatedAlert ? 'Update' : 'Add'}</div>
                                }

                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AlertPage;