// src/components/InfoPanel.js
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./Welcome.css";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const InfoPanel = ({ selectedNode }) => {
  if (!selectedNode) {
    return <div className="info-placeholder">Select an item to view details</div>;
  }

  const renderPieChart = (data) => (
    <PieChart width={250} height={250}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );

  const renderInfoSection = () => {
    let data = [];
    let info = null;
    let title = `${selectedNode.name} - ${selectedNode.type}`;

    if (selectedNode.type === "Database" && selectedNode.meta?.keyInfo) {
      const k = selectedNode.meta.keyInfo;
      data = [
        { name: "Tablespaces", value: parseInt(k.numberOfTablespaces) },
        { name: "Tables", value: parseInt(k.numberOfTables) },
        { name: "Indexes", value: parseInt(k.numberOfIndexes) },
        { name: "Views", value: parseInt(k.numberOfViews) }
      ];
      info = k;
    } else if (selectedNode.meta?.["object-details"]) {
      const d = selectedNode.meta["object-details"];
      const keys = Object.keys(d);
      if (keys.length >= 2) {
        data = keys.slice(0, 4).map((key) => ({
          name: key,
          value: isNaN(Number(d[key])) ? 1 : Number(d[key])
        }));
      }
      info = d;
    }

    return (
      <div>
        <h3>{title}</h3>
        <div className="info-flex">
          {data.length > 0 && renderPieChart(data)}
          {info && (
            <div className="info-card">
              {Object.entries(info).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {value}</p>
              ))}
            </div>
          )}
        </div>
        {selectedNode.meta?.ddl?.sql && (
          <pre className="ddl-box">{selectedNode.meta.ddl.sql}</pre>
        )}
      </div>
    );
  };

  return (
    <div className="info-panel-inner">
      {renderInfoSection()}
    </div>
  );
};

export default InfoPanel;
