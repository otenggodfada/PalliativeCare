const Dashboard = () => {
    return ( <>      <section className="bg-offWhite p-4 rounded mb-4">
    <h2 className="text-darkGray text-xl mb-2">Welcome, [User Name]</h2>
    <p className="text-mediumGray">Here’s a quick overview of your current activities and upcoming appointments.</p>
  </section>

  {/* <!-- Quick Actions --> */}
  <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <button className="bg-softBlue text-darkGray p-4 rounded shadow">Schedule Appointment</button>
    <button className="bg-mintGreen text-darkGray p-4 rounded shadow">Message Care Team</button>
    <button className="bg-softBlue text-darkGray p-4 rounded shadow">Track Symptoms</button>
    <button className="bg-mintGreen text-darkGray p-4 rounded shadow">View Medications</button>
  </section>

  {/* <!-- Patient Overview --> */}
  <section className="bg-offWhite p-4 rounded mb-4">
    <h2 className="text-darkGray text-xl mb-2">Patient Overview</h2>
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-darkGray">Patient Name</h3>
        <p className="text-mediumGray">Next Appointment: [Date]</p>
        <p className="text-mediumGray">Recent Message: [Message Summary]</p>
        <p className="text-mediumGray">Symptom Tracker: [Summary]</p>
        <p className="text-mediumGray">Medication Reminder: [Details]</p>
        <p className="text-mediumGray">Care Plan Overview: [Summary]</p>
      </div>
      <button className="bg-softBlue text-darkGray p-2 rounded shadow">Add New Patient</button>
    </div>
  </section>
{/* 
  <!-- Recent Activity --> */}
  <section className="bg-offWhite p-4 rounded">
    <h2 className="text-darkGray text-xl mb-2">Recent Activity</h2>
    <ul className="list-disc pl-5 space-y-2">
      <li className="text-mediumGray">Recent Appointments</li>
      <li className="text-mediumGray">New Messages</li>
      <li className="text-mediumGray">Medication Updates</li>
      <li className="text-mediumGray">Care Plan Changes</li>
    </ul>
  </section> </>);
}
 
export default Dashboard;