


import React, { useState } from "react";
import { Typography, Input, Textarea, Button, Card, CardBody } from "@material-tailwind/react";
import Header from "../components/hearder";
const Feedback = () => {
  const [form, setForm] = useState({ name: "", email: "", rating: "", feedback: "" });
  const [feedbackList, setFeedbackList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedbackList([...feedbackList, form]);
    setForm({ name: "", email: "", rating: "", feedback: "" });
  };

  return (
    <div className="">
          <Header  title={'Feedback and Ratings'}></Header>
   
      
     <div className="px-2 pt-20 mb-3">
     <div className="  grid grid-cols-1 md:grid-cols-2 gap-8">
        <div id="feedback-form">
          <Card>
            <CardBody>
              <Typography variant="h5" className="mb-4">Submit Your Feedback</Typography>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                  label="Name" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  required 
                />
                <Input 
                  label="Email" 
                  name="email" 
                  type="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  required 
                />
                <Input 
                  label="Rating (1-5)" 
                  name="rating" 
                  type="number" 
                  min="1" 
                  max="5" 
                  value={form.rating} 
                  onChange={handleChange} 
                  required 
                />
                <Textarea 
                  label="Feedback" 
                  name="feedback" 
                  value={form.feedback} 
                  onChange={handleChange} 
                  required 
                />
                <Button type="submit" className="bg-mypink">Submit Feedback</Button>
              </form>
            </CardBody>
          </Card>
        </div>

        <div id="feedback-list">
          <Card>
            <CardBody>
              <Typography variant="h5" className="mb-4">User Feedback</Typography>
              {feedbackList.length > 0 ? (
                feedbackList.map((fb, index) => (
                  <div key={index} className="mb-4 border-b pb-2">
                    <Typography variant="h6">{fb.name}</Typography>
                    <p><strong>Rating:</strong> {fb.rating}</p>
                    <p>{fb.feedback}</p>
                  </div>
                ))
              ) : (
                <p>No feedback yet. Be the first to provide feedback!</p>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
     </div>
    </div>
  );
};

export default Feedback;

