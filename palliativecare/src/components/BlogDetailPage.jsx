import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import Header from './hearder';
const BlogDetailPage = () => {
  const { blogId } = useParams();
  const db = getFirestore();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogDoc = await getDoc(doc(db, 'blogs', blogId));
        if (blogDoc.exists()) {
          setBlog({ id: blogDoc.id, ...blogDoc.data() });
        } else {
          console.error('No such blog!');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [db, blogId]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-full ">
        <i className="fas fa-spinner fa-spin text-mypink text-4xl"></i>
        <p className="text-mypink mt-2">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return <div>No blog found.</div>;
  }

  return (
   <div>
    <Header title={blog.title}></Header>
     <div className="w-full p-4">
        
        <div className="flex items-center mb-4">
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
        <h2 className="text-2xl font-bold mb-4 break-words">{blog.title}</h2>
        <div className="text-gray-700 mb-4 break-words" dangerouslySetInnerHTML={{ __html: blog.content }} />
        {blog.timestamp && (
          <p className="text-sm text-gray-500">
            {format(blog.timestamp.toDate(), 'PPPpp')}
          </p>
        )}
      </div>
   </div>
  );
};

export default BlogDetailPage;
