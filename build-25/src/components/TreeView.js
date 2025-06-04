// src/components/TreeView.js
import React from "react";
import TreeNode from "./TreeNode";

const TreeView = ({ data, onSelectNode, onLoadMore }) => {
  return (
    <div>
      {data.map((node, index) => (
        <TreeNode
          key={index}
          node={node}
          onSelect={onSelectNode}
          onLoadMore={onLoadMore}
        />
      ))}
    </div>
  );
};

export default TreeView;
