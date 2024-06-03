import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, setDoc, doc, onSnapshot, deleteDoc } from "../service/firebaseservice";
import { auth } from "../service/firebaseservice";
import { FaEdit, FaTrash, FaSearch, FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const editRecord = (record) => {
    setEditMode(true);
    setNewRecord(record.record);
    setEditId(record.id);
  };

  const deleteRecord = async (id) => {
    try {
      await deleteDoc(doc(collection(db, 'healthRecords'), id));
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Health Records</h2>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center w-2/3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search records"
            className="border border-gray-300 rounded-lg py-2 px-3 w-full"
          />
          <button className="ml-2 bg-blue-500 text-white p-2 rounded-lg text-sm"><FaSearch /></button>
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
              <button onClick={() => editRecord(record)} className="bg-yellow-500 text-white px-3 py-2 rounded-md text-sm mr-2"><FaEdit /></button>
              <button onClick={() => deleteRecord(record.id)} className="bg-red-500 text-white px-3 py-2 rounded-md text-sm"><FaTrash /></button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-8">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm"><FaArrowLeft /></button>
        <span className="text-lg">{`Page ${currentPage} of ${Math.ceil(filteredRecords.length / recordsPerPage)}`}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredRecords.length / recordsPerPage)} className="bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm"><FaArrowRight /></button>
      </div>
      <div className="flex items-center mt-8">
        <input
          type="text"
          value={newRecord}
          onChange={(e) => setNewRecord(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-3 w-3/4 mr-4"
          placeholder="Enter new record"
        />
        <button onClick={addRecord} className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">{editMode ? 'Update Record' : 'Add Record'} <FaPlus /></button>
      </div>
    </div>
  );
};

export default HealthRecordsComponent;
