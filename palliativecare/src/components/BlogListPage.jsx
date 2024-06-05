import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth } from '../service/firebaseservice';
import { useNavigate } from 'react-router-dom';

const BlogListPage = () => {
  const db = getFirestore();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, 'blogs'));
      setBlogs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserUid(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'blogs', id));
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  return (
    <div className="flex flex-col items-center mt-20 mb-20">
      <h1 className="text-3xl font-bold mb-5">Blog Posts</h1>
      {blogs.map((blog) => (
        <div key={blog.id} className="w-full max-w-md mb-4 p-4 border rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
          <p className="text-gray-700 mb-2">{blog.content}</p>
          {userUid === blog.authorUid && (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(blog.id)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogListPage;
