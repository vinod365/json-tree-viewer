import { useState, useCallback, useRef } from "react";
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type ReactFlowInstance,
  type NodeChange,
  type EdgeChange,
  type Connection,
} from "reactflow";

export function useJsonFlow() {
  const [jsonText, setJsonText] = useState<string>(`{
  "user": {
    "name": "Vinod",
    "age": 25,
    "address": { "city": "Chandigarh", "zip": "999999" },
    "hobbies": ["reading", "biking"]
  },
  "items": [{ "name": "s23", "qty": 1 }, { "name": "classic 350", "qty": 1 }]
}`);
  const [error, setError] = useState<string>("");
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [dark, setDark] = useState<boolean>(false);

  const reactFlowWrapper = useRef<any>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  return {
    jsonText,
    setJsonText,
    error,
    setError,
    nodes,
    setNodes,
    edges,
    setEdges,
    rfInstance,
    setRfInstance,
    searchTerm,
    setSearchTerm,
    message,
    setMessage,
    dark,
    setDark,
    reactFlowWrapper,
    onNodesChange,
    onEdgesChange,
    onConnect,
  };
}
