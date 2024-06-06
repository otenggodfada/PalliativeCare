import React from "react";
import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import Header from "../components/hearder";

const UserGuides = () => {
  const guides = [
    {
      title: "Getting Started with Our App",
      description: "Learn how to set up your account and get started with our palliative health care app.",
      content: `
        Welcome to our palliative health care app! Here's how to get started:
        1. Download the app from the App Store or Google Play.
        2. Open the app and create an account using your email address.
        3. Verify your email address through the link sent to your inbox.
        4. Complete your profile by adding your personal information and health details.
        5. You're all set! Explore the app and start managing your health.
      `,
    },
    {
      title: "Managing Your Health Records",
      description: "Step-by-step guide to manage and update your health records within the app.",
      content: `
        Keeping your health records up-to-date is crucial for effective care. Here's how to manage them:
        1. Log in to your account.
        2. Navigate to the 'Health Records' section from the menu.
        3. To add a new record, click 'Add Record' and fill in the required details.
        4. To update an existing record, click on the record you wish to update and edit the information.
        5. Save your changes and review your updated records.
      `,
    },
    {
      title: "Booking Appointments",
      description: "How to book, reschedule, and cancel appointments with your healthcare provider.",
      content: `
        Booking appointments with your healthcare provider is easy:
        1. Log in to the app and go to the 'Appointments' section.
        2. To book a new appointment, click 'Book Appointment' and select your healthcare provider, date, and time.
        3. Confirm your appointment and wait for a confirmation message.
        4. To reschedule, go to 'My Appointments', select the appointment, and choose a new date and time.
        5. To cancel, go to 'My Appointments', select the appointment, and click 'Cancel'.
      `,
    },
    {
      title: "Using the Symptom Tracker",
      description: "A guide on how to use the symptom tracker to monitor your health conditions.",
      content: `
        The symptom tracker helps you monitor your health conditions over time:
        1. Log in to the app and navigate to the 'Symptom Tracker' section.
        2. Click 'Add Symptom' to record a new symptom.
        3. Fill in the details such as symptom type, intensity, and any notes.
        4. Save your entry to keep a log of your symptoms.
        5. Review your symptom history to identify patterns and share it with your healthcare provider if needed.
      `,
    },
  ];

  const [selectedGuide, setSelectedGuide] = React.useState(null);

  return (
    <div className="">
      <Header title={'User Guides/Tutorials'}></Header>
      <main>
        <div className="px-2 pt-20 mb-3 grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide, index) => (
            <Card key={index} className="shadow-lg">
              <CardBody>
                <Typography variant="h6" className="mb-2">{guide.title}</Typography>
                <p className="mb-4">{guide.description}</p>
                <Button 
                  className="bg-mypink" 
                  size="sm" 
                  onClick={() => setSelectedGuide(index)}
                >
                  Read More
                </Button>
                {selectedGuide === index && (
                  <div className="mt-4">
                    <Typography variant="body1">{guide.content}</Typography>
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserGuides;
