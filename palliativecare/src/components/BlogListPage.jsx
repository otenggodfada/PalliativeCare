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

  const extractThumbnail = (content) => {
    const regex = /<img.*?src="(.*?)"/;
    const match = regex.exec(content);
    return match ? match[1] : null;
  };

  const truncateContent = (content, length) => {
    if (content.length <= length) {
      return { text: content, thumbnail: extractThumbnail(content) };
    }
    const truncatedText = content.substring(0, length) + '...';
    return { text: truncatedText, thumbnail: extractThumbnail(content) };
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen mt-20">
        <i className="fas fa-spinner fa-spin text-mypink text-4xl"></i>
        <p className="text-mypink mt-2">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100">
      <div className="hero-section w-full bg-mypink text-white py-13 p-2 mt-20 rounded-md text-center">
        <h1 className="text-4xl font-bold">Welcome to the Blog</h1>
        <p className="mt-4 text-xl">Stay updated with the latest posts from our authors</p>
      </div>
      <div className="container mx-auto p-4 mt-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => {
            const { text, thumbnail } = truncateContent(blog.content, 150);
            return (
              <div key={blog.id} className="max-w-md p-6 border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
                <div className="flex items-center mb-3">
                  {blog.authorProfilePic && (
                    <img
                      src={blog.authorProfilePic}
                      alt={`${blog.authorUsername}'s profile`}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{blog.authorUsername}</h2>
                  </div>
                </div>
                <h2   onClick={() => navigate(`/blog/${blog.id}`)} className="text-2xl font-bold mb-3 break-words text-mypink cursor-pointer">{blog.title}</h2>
                {thumbnail && (
                  <img src={thumbnail} alt="Thumbnail" className="mb-3 rounded-lg  h-[150px] w-full object-cover" />
                )}
                <div className="text-gray-700 mb-3 break-words" dangerouslySetInnerHTML={{ __html: text }} />
                {blog.timestamp && (
                  <p className="text-sm text-gray-500">
                    {format(blog.timestamp.toDate(), 'PPPpp')}
                  </p>
                )}
                <button
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="mt-4 px-4 py-2 bg-mypink text-white rounded-full hover:bg-blue-600 transition-colors duration-300 ease-in-out"
                >
                  Read More
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;
