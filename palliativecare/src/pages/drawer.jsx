const Drawer = ({ isOpen, onClose }) => {
    return (
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 transition-opacity ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            <h2 className="text-xl font-bold">Drawer Content</h2>
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
              Close Drawer
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Drawer;