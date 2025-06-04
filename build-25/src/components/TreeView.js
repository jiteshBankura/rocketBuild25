import React from "react";
import TreeNode from "./TreeNode";

const TreeView = ({ data, onSelectNode, onLoadMore, expandedNodes, toggleNode }) => {
  return (
    <div>
      {data.map((node, index) => (
        <TreeNode
          key={index}
          node={node}
          onSelect={onSelectNode}
          onLoadMore={onLoadMore}
          expandedNodes={expandedNodes}
          toggleNode={toggleNode}
        />
      ))}
    </div>
  );
};

export default TreeView;