import {
  AST,
  endNode,
  ifNode,
  statementNode,
  switchNode,
  whileNode,
} from "./ast";

export function parse(s: string): AST {
  // for now just return a constant
  return [
    statementNode("Hewwo"),
    ifNode({
      condition: "how are you?",
      trueChildren: [
        statementNode("lol"),
        switchNode({
          content: "this is a switch",
          cases: {
            "case 1": [statementNode("aaaaa")],
            "case 2": [statementNode("aaaa"), endNode()],
          },
        }),
      ],
      falseChildren: [
        statementNode("hi"),
        whileNode({
          condition: "some condition",
          children: [
            statementNode("step 1"),
            statementNode("step 2"),
            statementNode("step 3"),
          ],
        }),
      ],
    }),
    endNode(),
  ];
}
