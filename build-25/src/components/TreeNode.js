// src/components/TreeNode.js
import React, { useState } from "react";

const TreeNode = ({ node, onSelect, onLoadMore }) => {
  const [expanded, setExpanded] = useState(false);

  const hasChildren = Array.isArray(node.childern) && node.childern.length > 0;
  const hasMore = node.hasMore;

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="tree-node">
      <div onClick={() => { toggleExpand(); onSelect(node); }}>
        {hasChildren ? <span>{expanded ? "▼" : "▶"}</span> : "•"} {node.name}
      </div>

      {expanded && hasChildren && (
        <div className="tree-children">
          {node.childern.map((child, index) => (
            <TreeNode
              key={index}
              node={child}
              onSelect={onSelect}
              onLoadMore={onLoadMore}
            />
          ))}

          {hasMore && (
            <div
              className="load-more"
              onClick={(e) => {
                e.stopPropagation();
                onLoadMore(node);
              }}
            >
              + Load more...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
