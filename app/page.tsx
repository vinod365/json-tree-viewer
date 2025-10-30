"use client";

import { buildNodesEdges } from "@/lib/buildNodesEdges";
import { parseJsonPath } from "@/lib/parseJsonPath";
import { useJsonFlow } from "@/hooks/useJsonFlow";
import Header from "@/components/header";
import JsonInputPanel from "@/components/jsonInputPanel";
import FlowCanvas from "@/components/flowCanvas";
import Footer from "@/components/footer";

export default function App() {
  const {
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
  } = useJsonFlow();

  const handleVisualize = () => {
    setMessage("");
    try {
      const parsed = JSON.parse(jsonText);
      setError("");
      const { nodes: builtNodes, edges: builtEdges } = buildNodesEdges(parsed);
      setNodes(builtNodes);
      setEdges(builtEdges);
      setTimeout(() => rfInstance?.fitView({ padding: 0.2 }), 100);
    } catch (err) {
      setError((err as Error)?.message ?? String(err));
      setNodes([]);
      setEdges([]);
    }
  };

  const handleFormat = () => {
    try {
      setJsonText(JSON.stringify(JSON.parse(jsonText), null, 2));
      setMessage("Formatted");
    } catch {
      setError("Invalid JSON");
    }
  };

  const handleSearch = () => {
    setMessage("");
    const tokens = parseJsonPath(searchTerm);
    if (!tokens) return setMessage("No match found");
    let cur = "root";
    tokens.forEach(
      (t) =>
        (cur =
          typeof t === "number"
            ? `${cur}.${t}`
            : cur === "root"
            ? `${t}`
            : `${cur}.${t}`)
    );
    const match = nodes.find((n) => n.id === cur);
    if (match) {
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          style: {
            ...n.style,
            boxShadow:
              n.id === cur
                ? "0 0 16px 5px rgba(99,102,241,0.7)"
                : n.style?.boxShadow,
          },
        }))
      );
      rfInstance?.setCenter(match.position.x + 120, match.position.y + 40, {
        duration: 500,
      });
      setMessage("Match found");
    } else setMessage("No match found");
  };

  const handleCopyPath = (path: string) => {
    navigator.clipboard
      ?.writeText(path)
      .then(() => setMessage(`Copied ${path}`))
      .catch(() => setMessage("Copy failed"));
  };

  const handleClear = () => {
    setJsonText("");
    setNodes([]);
    setEdges([]);
    setError("");
    setMessage("");
  };

  const downloadImage = async () => {
    const html2canvas = (await import("html2canvas")) as any;
    if (!reactFlowWrapper.current) return;
    const canvas = await html2canvas.default(reactFlowWrapper.current);
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "json-tree.png";
    a.click();
  };

  return (
    <div
      className={`min-h-screen sm:p-6 p-2 transition-colors duration-300 ${
        dark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto container">
        <Header
          dark={dark}
          setDark={setDark}
          jsonText={jsonText}
          setMessage={setMessage}
          handleClear={handleClear}
          downloadImage={downloadImage}
        />

        <main className="grid sm:grid-cols-3 grid-cols-2 gap-5">
          <JsonInputPanel
            jsonText={jsonText}
            setJsonText={setJsonText}
            handleVisualize={handleVisualize}
            handleFormat={handleFormat}
            error={error}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            message={message}
          />
          <FlowCanvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            dark={dark}
            reactFlowWrapper={reactFlowWrapper}
            setRfInstance={setRfInstance}
            handleCopyPath={handleCopyPath}
          />
        </main>

        <Footer />
      </div>
    </div>
  );
}
