"use client";
import React from "react";
import ReactFlow, { Background, Controls, MiniMap, type Node, type Edge } from "reactflow";
import "reactflow/dist/style.css";

interface Props {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: any;
  dark: boolean;
  reactFlowWrapper: React.RefObject<HTMLDivElement>;
  setRfInstance: (inst: any) => void;
  handleCopyPath: (path: string) => void;
}

export default function FlowCanvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  dark,
  reactFlowWrapper,
  setRfInstance,
  handleCopyPath,
}: Props) {
  return (
    <section
      className="col-span-2"
      ref={reactFlowWrapper}
      style={{ height: 700 }}
    >
      <div className="h-full border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
        <ReactFlow
          nodes={nodes.map((n) => ({
            ...n,
            data: { ...n.data, onClick: () => handleCopyPath(n.data.path) },
          }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          onInit={setRfInstance}
          zoomOnScroll
        >
          <Background color={dark ? "#555" : "#ddd"} gap={16} />
          <Controls />
          <MiniMap
            zoomable
            pannable
            nodeStrokeColor={(n) => n.style?.borderColor || "#222"}
          />
        </ReactFlow>
      </div>
    </section>
  );
}
