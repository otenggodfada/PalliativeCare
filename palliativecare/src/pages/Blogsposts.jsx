import React, { useState, useEffect } from 'react';
import { getFirestore, collection, where, addDoc, serverTimestamp, doc, deleteDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { auth } from '../service/firebaseservice';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FirebaseUploadAdapter from '../service/FirebaseUploadAdaptor';
import Header from '../components/hearder'; // Assuming this is a custom header component

const CreateBlog = () => {
  const db = getFirestore();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [fetchingBlogs, setFetchingBlogs] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (user) {
          const q = query(collection(db, 'blogs'), where('authorUid', '==', user.uid), orderBy('timestamp', 'desc'));
          const querySnapshot = await getDocs(q);
          setBlogs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      } finally {
        setFetchingBlogs(false);
      }
    };

    fetchBlogs();
  }, [db, user]);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) {
        throw new Error('User not authenticated');
      }

      await addDoc(collection(db, 'blogs'), {
        title,
        content,
        authorUid: user.uid,
        timestamp: serverTimestamp(),
      });

      setLoading(false);
      navigate('/'); // Navigate to the home page or blog list page after successful creation
    } catch (error) {
      console.error('Error creating blog post: ', error);
      setLoading(false);
    }
  };

  const handleEdit = (blogId) => {
    navigate(`/edit-blog/${blogId}`);
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      await deleteDoc(doc(db, 'blogs', blogId));
      setBlogs(blogs.filter(blog => blog.id !== blogId));
    }
  };

  // Utility function to strip HTML tags from content
  const stripHtmlTags = (htmlContent) => {
    const div = document.createElement('div');
    div.innerHTML = htmlContent;
    return div.textContent || div.innerText || '';
  };

  return (
    <div className="w-full">
      <Header title={'Blog Posts'} />
      <div className="flex flex-col gap-8 p-3 mt-20 justify-center items-center">
        <div className="w-full md:w-1/2 lg:w-2/3">
          {!showAddBlog && (
            <button
              className="bg-mypink hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowAddBlog(true)}
            >
              Add New Blog
            </button>
          )}
          {showAddBlog && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
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
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content</label>
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
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`bg-mypink hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          )}
        </div>
        {fetchingBlogs ? (
          <div className="flex flex-col justify-center items-center h-full">
            <i className="fas fa-spinner fa-spin text-mypink text-4xl"></i>
            <p className="text-mypink mt-2">Loading...</p>
          </div>
        ) : blogs.length > 0 ? (
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Your Blogs</h2>
            <div className="overflow-hidden">
              {blogs.map((blog, index) => (
                <div key={index} className="p-4 border-b m-2 bg-white rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-700">{stripHtmlTags(blog.content).slice(0,120)}</p>
                  <div className="flex items-center justify-between mt-4">
                    <button className="text-mypink hover:text-blue-700 font-medium" onClick={() => handleEdit(blog.id)}>
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 font-medium" onClick={() => handleDelete(blog.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
   
           <div className="flex flex-col justify-center items-center  ">
            <i className="fas fa-plus-square text-mypink text-4xl"></i>
            <p className="text-mypink mt-2">Create Your First Blog</p>
          </div>
      
        )}
      </div>
    </div>
  );
};

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new FirebaseUploadAdapter(loader);
  };
}

export default CreateBlog;
