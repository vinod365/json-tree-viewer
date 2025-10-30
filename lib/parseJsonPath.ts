
export function parseJsonPath(path: string): Array<string | number> | null {
  if (!path) return null;

  let p = path.trim();
  if (p.startsWith("root")) p = p.slice("root".length);

  const tokens: Array<string | number> = [];
  let i = 0;

  while (i < p.length) {
    if (p[i] === ".") {
      i++;
      continue;
    }

  
    if (p[i] === "[") {
      const end = p.indexOf("]", i);
      if (end === -1) break; 
      const content = p.slice(i + 1, end);
      const index = Number(content);
      tokens.push(Number.isNaN(index) ? content : index);
      i = end + 1;
      continue;
    }

    let j = i;
    while (j < p.length && p[j] !== "." && p[j] !== "[") j++;
    const key = p.slice(i, j);
    if (key.length) tokens.push(key);
    i = j;
  }

  return tokens.length ? tokens : null;
}
