import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp, doc, deleteDoc, getDoc , updateDoc } from 'firebase/firestore';
import { auth } from '../service/firebaseservice';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FirebaseUploadAdapter from '../service/FirebaseUploadAdaptor'; 
import { readUserinfo } from '../service/databasefirebase';// Import the custom upload adapter
import Header from './hearder';
const EditBlog = () => {
  const db = getFirestore();
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
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
    const fetchBlog = async () => {
      const docRef = doc(db, 'blogs', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setContent(data.content);
      } else {
        console.log("No such document!");
      }
    };

    fetchBlog();
  }, [id]);

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

      await updateDoc(doc(db, 'blogs', id), {
        title,
        content,
        timestamp: serverTimestamp(),
      });

      setLoading(false);
      navigate('/'); // Navigate to the home page or blog list page after successful edit
    } catch (error) {
      console.error('Error editing blog post: ', error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 mb-20">
          <Header title={'Blog Posts'}></Header>
      <h1 className="text-3xl font-bold mb-5">Edit Blog Post</h1>
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
            {loading ? 'Updating...' : 'Update'}
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

export default EditBlog;
