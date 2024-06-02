import React, { useState } from "react";
import { Typography, Input, Textarea, Button, Card, CardBody } from "@material-tailwind/react";
import Header from "../components/hearder";
const CustomerSupport = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <div className="">
     
      <Header title={'Customer Support'}></Header>
      
      <div className="px-2 pt-20 mb-3 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card className="mb-6">
            <CardBody>
              <Typography variant="h5" className="mb-4">Contact Information</Typography>
              <p className="mb-2"><strong>Email:</strong> support@palliativecareapp.com</p>
              <p className="mb-2"><strong>Phone:</strong> +1 (123) 456-7890</p>
              <p className="mb-2"><strong>Address:</strong> 1234 Health St, Wellness City, CA 90210</p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Typography variant="h5" className="mb-4">Quick Links</Typography>
              <ul className="list-disc list-inside">
                <li><a href="/faqs" className="text-mypink">FAQs</a></li>
                <li><a href="#services" className="text-mypink">Our Services</a></li>
                <li><a href="#contact-form" className="text-mypink">Contact Form</a></li>
              </ul>
            </CardBody>
          </Card>
        </div>

        <div id="contact-form">
          <Card>
            <CardBody>
              <Typography variant="h5" className="mb-4">Get in Touch</Typography>
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
                <Textarea 
                  label="Message" 
                  name="message" 
                  value={form.message} 
                  onChange={handleChange} 
                  required 
                />
                <Button type="submit" className="bg-mypink">Send Message</Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
