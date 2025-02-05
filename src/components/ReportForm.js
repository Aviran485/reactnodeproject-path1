import React, { useState, useEffect } from 'react';

function ReportForm({ onSubmit, reportToEdit, onSaveEdit }) {
  const [report, setReport] = useState({ location: '', description: '' });

  useEffect(() => {
    if (reportToEdit) setReport(reportToEdit);
  }, [reportToEdit]);

  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!report.location || !report.description) return;

    if (reportToEdit) {
      onSaveEdit(report);
    } else {
      onSubmit(report);
    }

    setReport({ location: '', description: '' });
  };

  return (
    <div>
      <h3>{reportToEdit ? 'Edit Report' : 'Add New Report'}</h3>
      <input type="text" name="location" value={report.location} onChange={handleChange} placeholder="Enter location" />
      <input type="text" name="description" value={report.description} onChange={handleChange} placeholder="Describe the dog..." />
      <button onClick={handleSubmit}>{reportToEdit ? 'Save Changes' : 'Submit Report'}</button>
    </div>
  );
}

export default ReportForm;
