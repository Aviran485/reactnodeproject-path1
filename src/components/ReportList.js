import React from 'react';

function ReportList({ reports, onEdit }) {
  return (
    <div>
      <h2>Stray Dog Reports</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <strong>Location:</strong> {report.location} - <strong>Details:</strong> {report.description}
            <button onClick={() => onEdit(report.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportList;
