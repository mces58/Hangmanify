'use strict';

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforces that all async functions include error handling using a try/catch block.',
      category: 'Error Handling',
      recommended: false,
    },
    schema: [],
  },

  create(context) {
    function getChildNodes(node) {
      const children = [];
      for (const key of Object.keys(node)) {
        const child = node[key];
        if (Array.isArray(child))
          children.push(...child.filter((item) => item && typeof item.type === 'string'));
        else if (child && typeof child === 'object' && typeof child.type === 'string')
          children.push(child);
      }
      return children;
    }

    function containsTryStatement(node) {
      const stack = [node];
      const visited = new WeakSet();
      while (stack.length) {
        const current = stack.pop();
        if (visited.has(current)) continue;
        visited.add(current);
        if (current && current.type === 'TryStatement') return true;

        stack.push(...getChildNodes(current));
      }
      return false;
    }

    function checkAsyncFunction(node) {
      if (!node.async) return;

      if (node.body.type !== 'BlockStatement') {
        context.report({
          node,
          message: 'Async functions must include error handling using a try/catch block.',
        });
        return;
      }

      if (!containsTryStatement(node.body)) {
        context.report({
          node,
          message: 'Async functions must include error handling using a try/catch block.',
        });
      }
    }

    return {
      FunctionDeclaration: checkAsyncFunction,
      FunctionExpression: checkAsyncFunction,
      ArrowFunctionExpression: checkAsyncFunction,
    };
  },
};
