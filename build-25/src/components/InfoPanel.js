// src/components/InfoPanel.js
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./Welcome.css";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const InfoPanel = ({ selectedNode }) => {
  if (!selectedNode) {
    return <div className="info-placeholder">Select an item to view details</div>;
  }

  const renderDatabaseInfo = () => {
    const keyInfo = selectedNode.meta?.keyInfo;
    if (!keyInfo) return null;

    const data = [
      { name: "Tablespaces", value: parseInt(keyInfo.numberOfTablespaces) },
      { name: "Tables", value: parseInt(keyInfo.numberOfTables) },
      { name: "Indexes", value: parseInt(keyInfo.numberOfIndexes) },
      { name: "Views", value: parseInt(keyInfo.numberOfViews) }
    ];

    return (
      <div>
        <h3>{selectedNode.name} - Database</h3>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        <pre className="ddl-box">{selectedNode.meta.ddl?.sql}</pre>
      </div>
    );
  };

  const renderTableOrTSInfo = () => {
    const details = selectedNode.meta?.["object-details"];
    if (!details) return null;

    return (
      <div>
        <h3>{selectedNode.name} - {selectedNode.type}</h3>
        <div className="info-card">
          {Object.entries(details).map(([key, value]) => (
            <p key={key}><strong>{key}:</strong> {value}</p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="info-panel-inner">
      {selectedNode.type === "Database"
        ? renderDatabaseInfo()
        : renderTableOrTSInfo()}
    </div>
  );
};

export default InfoPanel;
