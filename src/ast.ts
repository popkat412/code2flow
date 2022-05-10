export interface StatementNode {
  _tag: "statement";
  content: string;
}

export interface IfNode {
  _tag: "if";
  condition: string;
  trueChildren: ASTNode[];
  falseChildren: ASTNode[];
}

export interface WhileNode {
  _tag: "while";
  condition: string;
  children: ASTNode[];
}

export interface SwitchNode {
  _tag: "switch";
  content: string;
  cases: { [k: string]: ASTNode[] };
}

export interface EndNode {
  _tag: "end";
}

export type ASTNode = StatementNode | IfNode | WhileNode | SwitchNode | EndNode;
export type AST = ASTNode[];

// helper creation functions
type NoTag<T> = Omit<T, "_tag">;

export function statementNode(content: string): StatementNode {
  return {
    _tag: "statement",
    content,
  };
}

export function ifNode(o: NoTag<IfNode>): IfNode {
  return {
    _tag: "if",
    ...o,
  };
}

export function whileNode(o: NoTag<WhileNode>): WhileNode {
  return {
    _tag: "while",
    ...o,
  };
}

export function switchNode(o: NoTag<SwitchNode>): SwitchNode {
  return {
    _tag: "switch",
    ...o,
  };
}

export function endNode(): EndNode {
  return { _tag: "end" };
}

// helper checking functions
export function isStatement(node: ASTNode): node is StatementNode {
  return node._tag == "statement";
}

export function isIfNode(node: ASTNode): node is IfNode {
  return node._tag == "if";
}

export function isWhileNode(node: ASTNode): node is WhileNode {
  return node._tag == "while";
}

export function isSwitchNode(node: ASTNode): node is SwitchNode {
  return node._tag == "switch";
}

export function isEndNode(node: ASTNode): node is EndNode {
  return node._tag == "end";
}
