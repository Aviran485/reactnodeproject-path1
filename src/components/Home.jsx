import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AiImage from '../images/th.jpg';
import DogImage from '../images/aavas.jpg';
import RepImage from '../images/rep.jpeg';
import ReportList from './ReportList';
import ReportForm from './ReportForm';

function Home() {
  const articles = [
    {
      id: 1,
      title: "Learn About AI",
      image: AiImage,
      content: "Learn the fundamentals of Artificial Intelligence.",
      link: "/ai",
    },
    {
      id: 2,
      title: "Dog Breed Information",
      image: DogImage,
      content: "Discover information about various dog breeds.",
      link: "/dog-breed",
    },
    {
      id: 3,
      title: "Send Report",
      image: RepImage,
      content: "Submit a report and help us improve.",
      link: "/report",
    },
  ];

  // STATE FOR REPORTS
  const [reports, setReports] = useState([
    { id: 1, location: "Park A", description: "Small brown dog spotted" },
    { id: 2, location: "Street B", description: "Injured black puppy" },
  ]);
  const [editingReport, setEditingReport] = useState(null);

  // ADD NEW REPORT
  const addReport = (newReport) => {
    setReports([...reports, { id: reports.length + 1, ...newReport }]);
  };

  // EDIT REPORT
  const handleEdit = (id) => {
    const reportToEdit = reports.find((r) => r.id === id);
    setEditingReport(reportToEdit);
  };

  // SAVE EDITED REPORT
  const saveEditedReport = (updatedReport) => {
    setReports(reports.map((r) => (r.id === updatedReport.id ? updatedReport : r)));
    setEditingReport(null);
  };

  return (
    <div className="main">
      <div className="articles-list">
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            <Link to={article.link}>
              <img src={article.image} alt={article.title} className="article-image" />
            </Link>
            <h2 className="article-title">{article.title}</h2>
            <p className="article-content">{article.content}</p>
          </div>
        ))}
      </div>

      {/* REPORT MANAGEMENT COMPONENTS */}
      <ReportList reports={reports} onEdit={handleEdit} />
      <ReportForm onSubmit={addReport} reportToEdit={editingReport} onSaveEdit={saveEditedReport} />
    </div>
  );
}

export default Home;
