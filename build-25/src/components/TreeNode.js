import React from "react";

const TreeNode = ({ node, onSelect, onLoadMore, expandedNodes, toggleNode }) => {
  const hasChildren = Array.isArray(node.childern) && node.childern.length > 0;
  const hasMore = node.hasMore;
  const isExpanded = expandedNodes[node.name];

  return (
    <div className="tree-node">
      <div onClick={() => { toggleNode(node.name); onSelect(node); }}>
        {hasChildren ? <span>{isExpanded ? "▼" : "▶"}</span> : "•"} {node.name}
      </div>

      {isExpanded && hasChildren && (
        <div className="tree-children">
          {node.childern.map((child, index) => (
            <TreeNode
              key={index}
              node={child}
              onSelect={onSelect}
              onLoadMore={onLoadMore}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
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

