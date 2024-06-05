import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '../service/firebaseservice'; // Assuming this imports Firebase Auth
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { readUserinfo, updateUserinfo } from "../service/databasefirebase"; 
import FirebaseUploadAdapter from '../service/FirebaseUploadAdaptor'; // Import the custom upload adapter

const CreateBlog = () => {
  const db = getFirestore();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [authorProfilePic, setAuthorProfilePic] = useState('');
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        readUserinfo(setUserData);
      } else {
        setUserData({});
      }
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setAuthorProfilePic(user.photoURL || ''); // Set default or placeholder URL if photoURL is not available
    }
  }, []);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      await addDoc(collection(db, 'blogs'), {
        title,
        content,
        authorUid: user.uid,
        authorUsername: userData.username,
        authorProfilePic: userData.profilpc, // Save the author's profile picture URL
        timestamp: serverTimestamp(),
      });

      setLoading(false);
      navigate('/'); // Navigate to the home page or blog list page after successful creation
    } catch (error) {
      console.error('Error creating blog post: ', error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 mb-20">
      <h1 className="text-3xl font-bold mb-5">Create a New Blog Post</h1>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <CKEditor 
            editor={ClassicEditor}
            data={content}
            onChange={handleEditorChange}
            config={{
              extraPlugins: [MyCustomUploadAdapterPlugin],
              toolbar: [
                'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
                'imageUpload', 'undo', 'redo'
              ]
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`bg-mypink hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Add custom upload adapter plugin to CKEditor
function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new FirebaseUploadAdapter(loader);
  };
}

export default CreateBlog;
