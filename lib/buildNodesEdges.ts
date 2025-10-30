import type { Node, Edge } from "reactflow";

export function buildNodesEdges(json: any): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const levels: Record<number, number> = {};

  function walk(value: any, path: string, depth: number, siblingIndex = 0) {
    levels[depth] = levels[depth] || 0;
    const id = path;
    const isObj =
      typeof value === "object" && value !== null && !Array.isArray(value);
    const isArr = Array.isArray(value);
    const type = isObj ? "object" : isArr ? "array" : "primitive";
    const label =
      type === "primitive"
        ? `${path.split(".").slice(-1)[0]}: ${String(value)}`
        : path === "root"
        ? "root"
        : path.split(".").slice(-1)[0];

    const x = depth * 250;
    const y = levels[depth]++ * 120;

    nodes.push({
      id,
      data: { label, path, value },
      position: { x, y },
      style: {
        width: 220,
        padding: 10,
        borderRadius: 12,
        border: "2px solid",
        borderColor:
          type === "object"
            ? "#6366f1"
            : type === "array"
            ? "#10b981"
            : "#f59e0b",
        background: "#f9fafb",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        fontSize: 13,
        fontWeight: 500,
      },
    } as Node);

    if (isObj) {
      Object.keys(value).forEach((key) => {
        const childPath = path === "root" ? `${key}` : `${path}.${key}`;
        edges.push({ id: `${id}-${childPath}`, source: id, target: childPath });
        walk(value[key], childPath, depth + 1, 0);
      });
    } else if (isArr) {
      value.forEach((item: any, idx: number) => {
        const childPath = path === "root" ? `${idx}` : `${path}.${idx}`;
        edges.push({ id: `${id}-${childPath}`, source: id, target: childPath });
        walk(item, childPath, depth + 1, idx);
      });
    }
  }

  walk(json, "root", 0, 0);
  return { nodes, edges };
}
