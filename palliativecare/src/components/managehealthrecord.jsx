import { useState, useEffect } from 'react';
import { db, collection, getDocs, setDoc, doc, onSnapshot, deleteDoc } from "../service/firebaseservice";
import { auth } from "../service/firebaseservice";
import { FaEdit, FaTrash, FaSearch, FaPlus, FaArrowLeft, FaArrowRight, FaDownload } from 'react-icons/fa';
import Header from './hearder';
import jsPDF from 'jspdf';


const HealthRecordsComponent = () => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [sortType, setSortType] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid);
      }
    };

    fetchUser();

    const fetchRecords = async () => {
      const querySnapshot = await getDocs(collection(db, 'healthRecords'));
      const recordsData = [];
      querySnapshot.forEach((doc) => {
        recordsData.push({ id: doc.id, ...doc.data() });
      });
      setRecords(recordsData);
    };

    const unsubscribe = onSnapshot(collection(db, 'healthRecords'), () => {
      fetchRecords();
    });

    return () => unsubscribe();
  }, []);

  const filteredRecords = records.filter(record => 
    record.userId === userId && 
    record.record && 
    record.record.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const sortedRecords = [...currentRecords].sort((a, b) => {
    if (sortType === 'ascending') {
      return a.record.localeCompare(b.record);
    } else if (sortType === 'descending') {
      return b.record.localeCompare(a.record);
    } else {
      return 0;
    }
  });

  const addRecord = async () => {
    try {
      if (editMode) {
        await setDoc(doc(collection(db, 'healthRecords'), editId), { record: newRecord, userId: userId });
        setEditMode(false);
        setEditId(null);
      } else {
        await setDoc(doc(collection(db, 'healthRecords')), { record: newRecord, userId: userId });
      }
      setNewRecord('');
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const editRecord = (record) => {
    setEditMode(true);
    setNewRecord(record.record);
    setEditId(record.id);
    setIsAdding(true);
  };

  const deleteRecord = async (id) => {
    try {
      await deleteDoc(doc(collection(db, 'healthRecords'), id));
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    let yOffset = 20;
    const lineHeight = 10;
  
   filteredRecords.forEach(record => {
      doc.text('Health Records', 10, 10);
    
      doc.text(`Record: ${record.record}`, 14, yOffset + lineHeight);
     
      yOffset += 3 * lineHeight; // Adjust spacing between records
    });
  
    doc.save('health_records.pdf');
  };

  return (
    <div>
      <Header title={'Health Records'} />
      <div className="bg-white shadow-md rounded-lg mb-3 m-2 mt-20 p-4">
        <div className="items-center mt-8">
          {!isAdding && (
            <div className="flex justify-between items-center">
              <button 
                onClick={() => setIsAdding(true)} 
                className="bg-mypink text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition duration-200 ease-in-out"
              >
                Add New Record <FaPlus className="inline-block ml-2" />
              </button>
             
            </div>
          )}
          {isAdding && (
            <div className="flex flex-col justify-center items-center">
              <input
                type="text"
                value={newRecord}
                onChange={(e) => setNewRecord(e.target.value)}
                className="border border-gray-300 rounded-lg py-2 px-3 w-full"
                placeholder="Enter new record"
              />
              <div className='p-3'>
                <button 
                  onClick={addRecord} 
                  className="bg-mypink w-[100px] text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition duration-200 ease-in-out"
                >
                  {editMode ? 'Update Record' : 'Add'} <FaPlus className="inline-block ml-2" />
                </button>
                <button 
                  onClick={() => {
                    setIsAdding(false);
                    setEditMode(false);
                    setNewRecord('');
                  }} 
                  className="bg-gray-500 w-[100px] text-white px-4 py-2 rounded-lg text-sm ml-2 hover:bg-gray-600 transition duration-200 ease-in-out"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mb-6 flex items-center justify-between mt-4">
          <div className="flex items-center w-2/3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search records"
              className="border border-gray-300 rounded-lg py-2 px-3 w-full"
            />
            <div className='p-2'>
              <button className="ml-2 bg-blue-500 text-white p-2 rounded-lg text-sm hover:bg-blue-600 transition duration-200 ease-in-out"> 
                <FaSearch />
              </button>
            </div>
          </div>
          
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-3 w-1/3 text-sm"
          >
            <option value="">Sort by</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
        <ul>
          {sortedRecords.map(record => (
            <li key={record.id} className="border rounded-lg p-4 mb-4 flex items-center justify-between">
              <span className="text-lg">{record.record}</span>
              <div className="flex items-center">
                <button onClick={() => editRecord(record)} className="bg-yellow-500 text-white px-3 py-2 rounded-md text-sm mr-2 hover:bg-yellow-600 transition duration-200 ease-in-out">
                  <FaEdit />
                </button>
                <button onClick={() => deleteRecord(record.id)} className="bg-red-500 text-white px-3 py-2 rounded-md text-sm hover:bg-red-600 transition duration-200 ease-in-out">
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button 
                onClick={downloadPDF} 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition duration-200 ease-in-out"
              >
                Download Records <FaDownload className="inline-block ml-2" />
              </button>
        <div className="flex justify-between items-center mt-8">
          
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-400 transition duration-200 ease-in-out disabled:opacity-50">
            <FaArrowLeft />
          </button>
          <span className="text-lg">{`Page ${currentPage} of ${Math.ceil(filteredRecords.length / recordsPerPage)}`}</span>

          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredRecords.length / recordsPerPage)} className="bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-400 transition duration-200 ease-in-out disabled:opacity-50">
            <FaArrowRight />
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default HealthRecordsComponent;
