import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import TreeView from "./TreeView";
import InfoPanel from "./InfoPanel";
import initialData from "../TreeStructure.json"; // Replace with your actual JSON import
import "./Welcome.css";

const Welcome = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [treeData, setTreeData] = useState(initialData);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  // Load more dummy nodes
  const handleLoadMore = (parentNode) => {
    if (!parentNode || !parentNode.childern) return;

    const currentCount = parentNode.loadedCount || parentNode.childern.length;
    const totalCount = parentNode.totalCount || 0;
    const nextCount = Math.min(currentCount + 10, totalCount);

    const newDbs = [];
    for (let i = currentCount + 1; i <= nextCount; i++) {
      newDbs.push({
        name: `DB${String(i).padStart(3, "0")}`,
        type: "Database",
        meta: {
          keyInfo: {
            numberOfTablespaces: "10",
            numberOfTables: "15",
            numberOfIndexes: "5",
            numberOfViews: "2"
          },
          ddl: {
            sql: `CREATE DATABASE DB${String(i).padStart(3, "0")} ...`
          }
        },
        childern: []
      });
    }

    parentNode.childern = [...parentNode.childern, ...newDbs];
    parentNode.loadedCount = nextCount;
    parentNode.hasMore = nextCount < totalCount;

    // Force state update
    setTreeData([...treeData]);
  };

  return (
    <div className="welcome-container">
      <header className="welcome-header">DB2 Catalog Viewer</header>

      <div className="dashboard-content">
        <div className="tree-container">
          <TreeView
            data={treeData}
            onSelectNode={handleNodeSelect}
            onLoadMore={handleLoadMore}
          />
        </div>
        <div className="info-panel">
          <InfoPanel selectedNode={selectedNode} />
        </div>
      </div>

      <div className="bottom-menu">
        <div className="logout-icon" onClick={() => setShowPopup(true)}>
          <FiLogOut size={24} title="Logout" />
        </div>
      </div>

      {showPopup && (
        <div className="logout-popup">
          <div className="popup-content">
            <p>Are you sure you want to logout?</p>
            <button onClick={handleLogout}>Yes, Logout</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
