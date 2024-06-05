import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { auth } from '../service/firebaseservice';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const BlogListPage = () => {
  const db = getFirestore();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [userUid, setUserUid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        setBlogs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [db]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserUid(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const truncateContent = (content, length) => {
    if (content.length <= length) {
      return content;
    }
    return content.substring(0, length) + '...';
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-full mt-20">
        <i className="fas fa-spinner fa-spin text-mypink text-4xl"></i>
        <p className="text-mypink mt-2">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full p-1 mt-20 mb-20">
      {blogs.map((blog) => (
        <div key={blog.id} className="w-full max-w-md mb-4 p-4 border rounded shadow-md overflow-hidden">
          <div className="flex items-center mb-2">
            {blog.authorProfilePic && (
              <img
                src={blog.authorProfilePic}
                alt={`${blog.authorUsername}'s profile`}
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
            )}
            <div>
              <h2 className="text-lg font-bold">{blog.authorUsername}</h2>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2 break-words">{blog.title}</h2>
          <div className="text-gray-700 mb-2 break-words" dangerouslySetInnerHTML={{ __html: truncateContent(blog.content, 100) }} />
          {blog.timestamp && (
            <p className="text-sm text-gray-500">
              {format(blog.timestamp.toDate(), 'PPPpp')}
            </p>
          )}
          <button
            onClick={() => navigate(`/blog/${blog.id}`)}
            className="mt-2 px-4 py-2 bg-mypink text-white rounded hover:bg-blue-700"
          >
            Read More
          </button>
        </div>
      ))}
    </div>
  );
};

export default BlogListPage;
