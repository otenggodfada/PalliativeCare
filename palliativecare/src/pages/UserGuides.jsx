

import React from "react";
import { Typography, Card, CardBody, Button } from "@material-tailwind/react";

const UserGuides = () => {
  const guides = [
    {
      title: "Getting Started with Our App",
      description: "Learn how to set up your account and get started with our palliative health care app.",
      link: "/guides/getting-started",
    },
    {
      title: "Managing Your Health Records",
      description: "Step-by-step guide to manage and update your health records within the app.",
      link: "/guides/managing-health-records",
    },
    {
      title: "Booking Appointments",
      description: "How to book, reschedule, and cancel appointments with your healthcare provider.",
      link: "/guides/booking-appointments",
    },
    {
      title: "Using the Symptom Tracker",
      description: "A guide on how to use the symptom tracker to monitor your health conditions.",
      link: "/guides/using-symptom-tracker",
    },
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Typography variant="h4" className="text-center mb-6">User Guides/Tutorials</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {guides.map((guide, index) => (
          <Card key={index} className="shadow-lg">
            <CardBody>
              <Typography variant="h6" className="mb-2">{guide.title}</Typography>
              <p className="mb-4">{guide.description}</p>
              <Button className=" bg-mypink" size="sm" as="a" href={guide.link}>
                Read More
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserGuides;
