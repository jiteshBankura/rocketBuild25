import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import TreeView from "./TreeView";
import InfoPanel from "./InfoPanel";
import initialData from "../TreeStructure.json";
import "./Welcome.css";

const Welcome = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [treeData, setTreeData] = useState(initialData);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  const toggleNode = (name) => {
    setExpandedNodes((prev) => ({ ...prev, [name]: !prev[name] }));
  };

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

    setTreeData([...treeData]);
  };

  const handleAddToFavorites = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="welcome-container">
      <header className="welcome-header">DB2 Catalog Viewer</header>

      <div className="dashboard-content">
        <div className="tree-container">
          <input
            type="text"
            placeholder="Search..."
            className="tree-search-input"
          />
          <TreeView
            data={treeData}
            onSelectNode={handleNodeSelect}
            onLoadMore={handleLoadMore}
            expandedNodes={expandedNodes}
            toggleNode={toggleNode}
          />
        </div>

        <div className="info-panel">
          <div className="info-panel-header">
            <button onClick={handleAddToFavorites} className="add-fav-button">
              Add to Favourites
            </button>
          </div>
          <InfoPanel selectedNode={selectedNode} />
        </div>
      </div>

      {showToast && <div className="toast-success">Added to favourites!</div>}

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
