import  { useState, useEffect } from 'react';
import { db, collection, getDocs, setDoc, doc, onSnapshot, deleteDoc, getDoc } from "../service/firebaseservice";
import { auth } from "../service/firebaseservice";
import { FaEdit, FaTrash, FaPlus, FaArrowLeft, FaArrowRight, FaDownload } from 'react-icons/fa';

import Header from './hearder';
import { Input } from "@material-tailwind/react";
import jsPDF from 'jspdf';
const SymptomTracker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [newSymptom, setNewSymptom] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [symptomsPerPage] = useState(5);
  const [sortType, setSortType] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [severity, setSeverity] = useState('Mild');
  const [duration, setDuration] = useState('');
  const [medication, setMedication] = useState('');
  const [triggers, setTriggers] = useState('');
  const [notes, setNotes] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [logEntry, setLogEntry] = useState('');
  const [trackingMode, setTrackingMode] = useState(false);
  const [logDate, setLogDate] = useState('');




 
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Symptom Tracker Records', 10, 10);
    filteredSymptoms.forEach((symptom, index) => {
      const y = 20 + (index * 50); // Adjusted spacing for each symptom
      doc.text(`${index + 1}. ${symptom.name}`, 10, y);
      doc.text(`  Severity: ${symptom.severity}`, 10, y + 10);
      doc.text(`  Duration: ${symptom.duration}`, 10, y + 20);
      doc.text(`  Medication: ${symptom.medication}`, 10, y + 30);
      doc.text(`  Triggers: ${symptom.triggers}`, 10, y + 40);
      doc.text(`  Notes: ${symptom.notes}`, 10, y + 50);
      if (symptom.logs) {
        symptom.logs.forEach((log, logIndex) => {
          doc.text(`    Log ${logIndex + 1} - ${log.date}: ${log.entry}`, 20, y + 60 + (logIndex * 10));
        });
      }
      doc.text('--------------------------------------------', 10, y + 70); // Separator line
    });
    doc.save('symptom-tracker-records.pdf');
  };
  


  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid);
      }
    };

    fetchUser();

    const fetchSymptoms = async () => {
      const querySnapshot = await getDocs(collection(db, 'symptoms'));
      const symptomsData = [];
      querySnapshot.forEach((doc) => {
        symptomsData.push({ id: doc.id, ...doc.data() });
      });
      setSymptoms(symptomsData);
    };

    const unsubscribe = onSnapshot(collection(db, 'symptoms'), () => {
      fetchSymptoms();
    });

    return () => unsubscribe();
  }, []);

  const addSymptom = async () => {
    try {
      if (editMode) {
        await setDoc(doc(collection(db, 'symptoms'), editId), { 
          name: newSymptom, 
          userId: userId, 
          severity: severity, 
          duration: duration, 
          medication: medication, 
          triggers: triggers, 
          notes: notes 
        });
        setEditMode(false);
        setEditId(null);
      } else {
        await setDoc(doc(collection(db, 'symptoms')), { 
          name: newSymptom, 
          userId: userId, 
          severity: severity, 
          duration: duration, 
          medication: medication, 
          triggers: triggers, 
          notes: notes 
        });
      }
      setNewSymptom('');
      setIsAdding(false);
      setSeverity('Mild');
      setDuration('');
      setMedication('');
      setTriggers('');
      setNotes('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const editSymptom = (symptom) => {
    setEditMode(true);
    setNewSymptom(symptom.name);
    setEditId(symptom.id);
    setIsAdding(true);
    setSeverity(symptom.severity);
    setDuration(symptom.duration);
    setMedication(symptom.medication);
    setTriggers(symptom.triggers);
    setNotes(symptom.notes);
  };

  const logSymptom = async (symptomId) => {
    if (!logEntry || !logDate) return;

    const symptomRef = doc(db, 'symptoms', symptomId);
    const symptomDoc = await getDoc(symptomRef);

    if (symptomDoc.exists()) {
      const existingLogs = symptomDoc.data().logs || [];
      await setDoc(symptomRef, {
        logs: [...existingLogs, { date: logDate, entry: logEntry }]
      }, { merge: true });

      setLogEntry('');
      setLogDate('');
      setTrackingMode(false);
    } else {
      console.error("Symptom not found");
    }
  };

  const filteredSymptoms = symptoms.filter(symptom => 
    symptom.userId === userId && 
    symptom.name && 
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedSymptoms = filteredSymptoms.sort((a, b) => {
    if (sortType === 'ascending') {
      return a.name.localeCompare(b.name);
    } else if (sortType === 'descending') {
      return b.name.localeCompare(a.name);
    } else {
      return 0;
    }
  });

  const currentSymptoms = sortedSymptoms.slice((currentPage - 1) * symptomsPerPage, currentPage * symptomsPerPage);

  const deleteSymptom = async (id) => {
    try {
      await deleteDoc(doc(collection(db, 'symptoms'), id));
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShowModal = (symptom) => {
    setSelectedSymptom(symptom);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedSymptom(null);
    setShowModal(false);
  };

  const handleTrackSymptom = (symptomId) => {
    setTrackingMode(true);
    setEditId(symptomId);
  };

  return (
    <div>
      <Header title={'Symptom Tracker'} />
      {showModal && selectedSymptom && (
        <div className=' mt-20 m-4'>
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>&times;</span>
              <h2>{selectedSymptom.name}</h2>
              <p><strong>Severity:</strong> {selectedSymptom.severity}</p>
              <p><strong>Duration:</strong> {selectedSymptom.duration}</p>
              <p><strong>Medication:</strong> {selectedSymptom.medication}</p>
              <p><strong>Triggers:</strong> {selectedSymptom.triggers}</p>
              <p><strong>Notes:</strong> {selectedSymptom.notes}</p>
              <h3>Logs:</h3>
              <ul>
                {selectedSymptom.logs && selectedSymptom.logs.map((log, index) => (
                  <li key={index}><strong>{log.date}:</strong> {log.entry}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg mb-3 m-2 mt-20 p-4">
        <div className="items-center mt-8">
          {!isAdding && !trackingMode && (
            <button 
              onClick={() => setIsAdding(true)} 
              className="bg-mypink text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition duration-200 ease-in-out"
            >
              Add New Symptom <FaPlus className="inline-block ml-2" />
            </button>
          )}
          {(isAdding || trackingMode) && (
            <div className="flex flex-col justify-center items-center">
              {isAdding && (
                <>
                  <input
                    type="text"
                    value={newSymptom}
                    onChange={(e) => setNewSymptom(e.target.value)}
                    className="border border-gray-300 rounded-lg py-2 px-3 w-full mb-2"
                    placeholder="Enter symptom name"
                  />
                  <input
                    type="text"
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="border border-gray-300 rounded-lg py-2 px-3 w-full mb-2"
                    placeholder="Enter severity"
                  />
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="border border-gray-300 rounded-lg py-2 px-3 w-full mb-2"
                    placeholder="Enter duration"
                  />
                  <input
                    type="text"
                    value={medication}
                    onChange={(e) => setMedication(e.target.value)}
                    className="border border-gray-300 rounded-lg py-2 px-3 w-full mb-2"
                    placeholder="Enter medication"
                  />
                  <input
                    type="text"
                    value={triggers}
                    onChange={(e) => setTriggers(e.target.value)}
                    className="border border-gray-300 rounded-lg py-2 px-3 w-full mb-2"
                    placeholder="Enter triggers"
                  />
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="border border-gray-300 rounded-lg py-2 px-3 w-full mb-2"
                    placeholder="Enter notes"
                  />
                </>
              )}
              {trackingMode && (
                <>
                 <div className='w-full mb-2'>
                 <Input
                label='date'
                    type="date"
                    
                    value={logDate}
                    onChange={(e) => setLogDate(e.target.value)}
                    className="border border-gray-300 rounded-lg py-2 px-3 w-full mb-2 text-mypink"
                    placeholder="Select date"
                  />
                 </div>
                  
                  <textarea
                    value={logEntry}
                    onChange={(e) => setLogEntry(e.target.value)}
                    className="border border-gray-300 rounded-lg py-2 px-3 w-full mb-2"
                    placeholder="Enter log entry"
                  />
                </>
              )}
              <button 
                onClick={() => { isAdding ? addSymptom() : logSymptom(editId); }} 
                className="bg-mypink text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition duration-200 ease-in-out"
              >
                {isAdding ? 'Save Symptom' : 'Log Symptom'}
              </button>
              <button 
                onClick={() => { setIsAdding(false); setTrackingMode(false); setEditMode(false); setEditId(null); }} 
                className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-200 ease-in-out mt-2"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mb-4 mt-4">
          <input 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="border border-gray-300 rounded-lg py-2 px-3 w-full mr-2" 
            placeholder="Search symptoms"
          />
          <select 
            value={sortType} 
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-3"
          >
            <option value="">Sort by</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
        <ul>
          {currentSymptoms.map((symptom) => (
            <li key={symptom.id} className="bg-gray-100 p-4 mb-4 rounded-lg flex items-center justify-between">
                  <div className='p-1'>
               <button 
                  onClick={() => handleTrackSymptom(symptom.id)} 
                  className="bg-yellow-500 text-white px-2 py-1 rounded-lg text-sm hover:bg-yellow-600 transition duration-200 ease-in-out "
                >
                  Log +
                </button>
               </div>
              <div className='text-black cursor-pointer' onClick={() => handleShowModal(symptom)}>{symptom.name}</div>
              <div className="flex items-center">
                <button 
                  onClick={() => editSymptom(symptom)} 
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg text-sm mr-2 hover:bg-blue-600 transition duration-200 ease-in-out"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => deleteSymptom(symptom.id)} 
                  className="bg-mypink text-white px-2 py-1 rounded-lg text-sm hover:bg-red-600 transition duration-200 ease-in-out"
                >
                  <FaTrash />
                </button>
             
              </div>
            </li>
          ))}
        </ul>
        <button 
                onClick={exportToPDF} 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition duration-200 ease-in-out"
              >
                Download Records <FaDownload className="inline-block ml-2" />
              </button>
        <div className="flex items-center justify-between mt-4">
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-lg text-sm ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600 transition duration-200 ease-in-out'}`}
          >
            <FaArrowLeft />
          </button>
          <span>Page {currentPage}</span>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === Math.ceil(symptoms.length / symptomsPerPage)}
            className={`px-3 py-1 rounded-lg text-sm ${currentPage === Math.ceil(symptoms.length / symptomsPerPage) ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600 transition duration-200 ease-in-out'}`}
          >
            <FaArrowRight />
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default SymptomTracker;
