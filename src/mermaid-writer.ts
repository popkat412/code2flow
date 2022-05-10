import { AST, ASTNode } from "./ast";

type MermaidId = string;

// helper functions
function id(idNum: number): MermaidId {
  return `ID${idNum}`;
}

function square(s: string): string {
  return `[${s}]`;
}

function rhombus(s: string): string {
  return `{${s}}`;
}

function stadium(s: string): string {
  return `([${s}])`;
}

// warning: doesn't do anything yet
export function astToMermaid(ast: AST): string {
  let out = "flowchart TD";

  // #1: generate the ids
  const mermaidNodes = new Map<MermaidId, string>();
  const nodeToId = new Map<ASTNode, MermaidId>();
  let currentId = 1;
  function generateMermaidNodes(astNode: ASTNode): void {
    const cid = id(currentId++);
    switch (astNode._tag) {
      case "statement":
        mermaidNodes.set(cid, square(astNode.content));
        break;
      case "if":
        mermaidNodes.set(cid, rhombus(astNode.condition));
        for (const next of astNode.trueChildren) generateMermaidNodes(next);
        for (const next of astNode.falseChildren) generateMermaidNodes(next);
        break;
      case "while":
        mermaidNodes.set(cid, rhombus(astNode.condition));
        for (const next of astNode.children) generateMermaidNodes(next);
        break;
      case "switch":
        mermaidNodes.set(cid, rhombus(astNode.content));
        for (const v of Object.values(astNode.cases)) {
          for (const next of v) generateMermaidNodes(next);
        }
        break;
      case "end":
        mermaidNodes.set(cid, stadium("END"));
        break;
      default:
        throw new Error("unknown ast node type reached: ", astNode);
    }
    nodeToId.set(astNode, cid);
  }

  return out;
}
