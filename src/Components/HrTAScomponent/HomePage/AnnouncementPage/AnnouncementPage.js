import React, { useState } from 'react';
import Announcement from "../../../../Assets/HrTas/Announcement.svg";
import AddBtn from "../../../../Assets/HrTas/add.svg";
import BrandAwareness from "../../../../Assets/HrTas/brand_awareness.svg";
import CloseBtn from "../../../../Assets/HrTas/close.svg";

function Modal({ onClose, onSubmit }) {
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (headline && description) {
      onSubmit({ headline, description });
      setHeadline('');
      setDescription('');
      onClose(); 
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6  w-[504px]">
        <div className='flex items-center justify-between'>
          <h2 className="text-[16px] font-medium">Add Announcement</h2>
          <img onClick={onClose} src={CloseBtn} alt="" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-6">
            <input
              id="headline"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none sm:text-sm"
              placeholder="Enter the headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <textarea
              id="description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none h-[104px] sm:text-sm"
              placeholder="Enter the description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border text-gray-800 rounded-lg "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-md ml-4 bg-[#6C55B2]"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AnnouncementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  const handleNewAnnouncement = (announcement) => {
    setAnnouncements([...announcements, announcement]);
  };

  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex items-center justify-start'>
          <img className='w-5 h-5' src={Announcement} alt="Notification" />
          <h1 className='text-[20px] font-medium text-[#1255D0] ml-1'>Announcement</h1>
        </div>
        <div className='flex'>
          <button
            className='border text-[12px] font-normal flex items-center px-4 py-2 rounded-lg ml-2'
            onClick={() => setIsModalOpen(true)}
          >
            <img className='w-4 h-4 mr-1' src={AddBtn} alt="" /> Create New
          </button>
        </div>
      </div>

      <div className='mt-[35px]'>
        {announcements.map((announcement, index) => (
          <div className='flex mb-4' key={index}>
            <img src={BrandAwareness} alt="" />
            <div className='ml-3 text-[14px]'>
              <h1 className='font-medium'>{announcement.headline}</h1>
              <p className='font-normal text-[#696A70]'>{announcement.description}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} onSubmit={handleNewAnnouncement} />}
    </div>
  );
}

export default AnnouncementPage;
