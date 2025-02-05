import React, { useEffect, useState } from "react";
import addIcon from "../../../Assets/HrTas/addIcon.svg";
import filterIcon from "../../../Assets/HrTas/filterIcon.svg";
import deleteIcon from "../../../Assets/HrTas/delete.svg";
import downloadIco from "../../../Assets/HrTas/documentsPage/downloadIcon.svg";
import greenTick from "../../../Assets/HrTas/documentsPage/greenTick.svg";
import xMark from "../../../Assets/HrTas/documentsPage/xMark.svg";
import addPurple from "../../../Assets/HrTas/documentsPage/addPurple.svg";
import arrowLeft from "../../../Assets/HrTas/documentsPage/arrowLeft.svg";
import arrowRight from "../../../Assets/HrTas/documentsPage/arrowRight.svg";
import CloseBtn from "../../../Assets/HrTas/close.svg";
import Api from "../../../Services/Api";
import { ClipLoader } from "react-spinners";

const token = localStorage.getItem('token')

function Document() {

  const [searchTerm, setSearchTerm] = useState('')

  const [documentsData, setDocumentsData] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isStatusUpdating, setIsStatusUpdating] = useState(false)

  const [refreshKey, setRefreshKey] = useState(0)

  
  const filteredDocuments = documentsData.filter((document) =>
    document.documentType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const decodeHexToUrl = (hexString) => {
    try {
      const hex = hexString.replace(/\\x/g, '');
      const url = hex.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
      return url.startsWith('http') ? url : null;
    } catch (error) {
      console.error("Error decoding hex string:", error);
      return null;
    }
  };

  const handleDocumentClick = (fileContent) => {
    const fileUrl = decodeHexToUrl(fileContent);
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
      alert("Invalid file URL.");
    }
  };

  
  const handleDownload = (hexString, fileName = "downloaded_file") => {
    try {
      // Convert Hex String to Binary Data
      const hex = hexString.replace(/\\x/g, '');
      const binaryData = hex.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
  
      // Detect file type (Magic Numbers - first bytes of the file)
      let mimeType = "application/octet-stream"; // Default binary file
      if (binaryData.startsWith("%PDF-")) {
        mimeType = "application/pdf";
        fileName += ".pdf";
      } else if (binaryData.startsWith("\xFF\xD8\xFF")) {
        mimeType = "image/jpeg";
        fileName += ".jpg";
      } else if (binaryData.startsWith("\x89PNG")) {
        mimeType = "image/png";
        fileName += ".png";
      } else if (binaryData.startsWith("GIF87a") || binaryData.startsWith("GIF89a")) {
        mimeType = "image/gif";
        fileName += ".gif";
      }
  
      // Convert to Blob
      const blob = new Blob([binaryData], { type: mimeType });
  
      // Create a Download Link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;  // Dynamic file name based on content
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
  
      console.log("Download successful!");
    } catch (error) {
      console.error("Download error:", error);
      alert("Download failed. Invalid file content.");
    }
  };
  
  
  
  

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleApprove = (id) => {
    setIsStatusUpdating(true)
    Api.post(`api/document/approveReject/${id}`, {
      "status": "Approved"
    }, { 'Authorization': `Bearer ${token}` })
      .then(response => {
        setIsStatusUpdating(false)
        setRefreshKey(prev => prev + 1)
        if (response && response.data) {
          console.log('stattttssAP:', response.data.data)
        } else {
          console.log('Failed to Approve. Please try again.')
        }
      })
  }

  const handleReject = (id) => {
    setIsStatusUpdating(true)
    Api.post(`api/document/approveReject/${id}`, {
      "status": "Rejected"
    }, { 'Authorization': `Bearer ${token}` })
      .then(response => {
        setIsStatusUpdating(false)
        setRefreshKey(prev => prev + 1)
        if (response && response.data) {
          console.log('statssssRj:', response.data.data)
        } else {
          console.log('Failed to Reject. Please try again.')
        }
      })
  }

  useEffect(() => {
    Api.get('api/document/uploads', {
      'Authorization': `Bearer ${token}`
    })
      .then(response => {
        if (response && response?.data?.data) {
          console.log('documents: ', response.data?.data)
          setDocumentsData(response.data?.data)
        } else {
          console.error('Invalid response data:', response)
        }
      })
  }, [refreshKey])
  

  return (
    <div className="p-6">
      <div className="bg-white w-full min-h-screen px-6 py-[24px] shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-[20px] text-[#232E42] font-medium mt-[40px]">
            Document Request
          </h1>
          <button
            onClick={toggleModal}
            className="bg-[#2B2342] flex items-center w-[115px] h-[48px] font-normal text-sm mt-[24px] text-white px-4 py-2 rounded-lg"
          >
            <img src={addIcon} className="mr-[8px]" alt="Create" />
            Create
          </button>
        </div>

        <div className="flex items-center mt-[34px]">
          <input
            type="text"
            placeholder="Search Document"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              // setCurrentPage(1); 
            }}
            className="border border-[#E6E6E7] focus:outline-none text-[#696A70] text-sm font-normal rounded-lg p-2 w-[584px] h-[48px]"
          />
          {/* <button className="border border-[#E6E6E7] flex items-center font-normal text-sm text-[#2C2B2B] p-2 ml-2 rounded-lg w-[87px] h-[48px]">
            <img src={filterIcon} className="mr-2" alt="Filter" />
            Filter
          </button> */}
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="w-full table-auto">
            <tbody>
              {filteredDocuments.map((doc, index) => {

                return (
                  <tr
                    key={index}
                    className={`w-full h-[64px] border-[#D9CDFF] ${index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"}`}
                  >
                    {/* <td className="text-center align-middle">
                      <input
                        type="checkbox"
                        className="h-[16px] w-[16px] rounded-full cursor-pointer border-[#AFAFAF] focus:outline-none accent-[#373737]"
                        checked={isSelected}
                        onChange={() => toggleDocumentSelection(globalIndex)}
                      />
                    </td> */}
                    <td className="ml-[32px] align-middle cursor-pointer" onClick={() => handleDocumentClick(doc.fileContent)}>
                    <div className="flex items-center">
                        <img src={addPurple} alt="Icon" className="mr-4 ml-2" />
                        <div>
                          <div className="text-sm font-medium text-[#373737]">
                            {doc.documentType}
                          </div>
                          <div className="text-xs font-medium text-[#9D9D9D]">
                            {doc.requestDocument.createdBy  }
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle text-right">
                      <div className="flex justify-end mr-8">
                        <button className={`mr-8 ${doc.status === "Approved" ? "cursor-not-allowed" : "opacity-50"}`} onClick={() => handleApprove(doc.id)} title="Approve">
                          <img src={greenTick} alt="Approve" />
                        </button>
                        <button className={`mr-8 ${doc.status === "Rejected" ? "cursor-not-allowed" : "opacity-50"}`} onClick={() => handleReject(doc.id)} title="Reject">
                          <img src={xMark} alt="Reject" />
                        </button>
                         <button className="mr-4" onClick={() => handleDownload(doc.fileContent, doc.documentType)} title="Download">
                        <img src={downloadIco} alt="Download" />
                      </button>
                        {/* <button>
                          <img src={deleteIcon1} alt="Delete" />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isStatusUpdating && (
        <div className="fixed inset-0 bg-black bg-opacity-[57%] flex justify-center items-center">
          <div className="bg-white p-8 shadow-lg">
            <div>
              <ClipLoader
                color={'#465062'}
                loading={true}
                size={35}
                aria-label="Loading Spinner"
                data-testid="Loader"
              />
            </div>
            <div className='mt-2'>Updating status. Please wait..</div>
          </div>
        </div>
      )}

      {/* Modal Implementation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-[57%] flex justify-center items-center">
          <div className="bg-white p-8 shadow-lg w-[834px] h-[524px]">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-medium text-[#6C55B2]">
                Document Request
              </h2>
              <button onClick={toggleModal} className="">
                <img src={CloseBtn} alt="" />
              </button>
            </div>

            {/* Form inside modal */}
            <form>
              <div className="mt-8">
                <div className="flex">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm text-[#373737] font-normal"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="w-[373px] h-[48px] mt-2 border border-[#E6E6E7] rounded-lg focus:outline-none px-4 py-[14px] text-[#696A70] text-sm font-normal"
                      placeholder="Title"
                    />
                  </div>

                  <div className="ml-6">
                    <label
                      htmlFor="employee"
                      className="block text-sm text-[#373737] font-normal"
                    >
                      Employee
                    </label>
                    <input
                      type="text"
                      id="employee"
                      className="w-[373px] h-[48px] mt-2 border border-[#E6E6E7] rounded-lg focus:outline-none px-4 py-[14px] text-[#696A70] text-sm font-normal"
                      placeholder="Enter"
                    />
                  </div>
                </div>

                <div className="flex mt-4">
                  <div>
                    <label
                      htmlFor="format"
                      className="block text-sm text-[#373737] font-normal"
                    >
                      Format
                    </label>
                    <input
                      type="text"
                      id="format"
                      className="w-[373px] h-[48px] mt-2 border border-[#E6E6E7] rounded-lg focus:outline-none px-4 py-[14px] text-[#696A70] text-sm font-normal"
                      placeholder="Title"
                    />
                  </div>

                  <div className="ml-6">
                    <label
                      htmlFor="maxSize"
                      className="block text-sm text-[#373737] font-normal"
                    >
                      Max Size (In MB)
                    </label>
                    <input
                      type="text"
                      id="maxSize"
                      className="w-[373px] h-[48px] mt-2 border border-[#E6E6E7] rounded-lg focus:outline-none px-4 py-[14px] text-[#696A70] text-sm font-normal"
                      placeholder="Max Size"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="description"
                  className="block text-sm text-[#373737] font-normal"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="3"
                  className="w-[770px] h-[120px] mt-2 border border-[#E6E6E7] rounded-lg focus:outline-none px-4 py-[14px] text-[#696A70] text-sm font-normal"
                  placeholder="Add description"
                ></textarea>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  className="w-[74px] h-[40px] rounded-lg border-[#E6E6E7] border text-center bg-white px-4 py-3 text-sm text-[#2C2B2B] font-normal  "
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-[74px] ml-[16px] h-[40px] rounded-lg  text-center bg-[#6C55B2] px-4 py-3 text-sm text-white font-medium"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Document;
