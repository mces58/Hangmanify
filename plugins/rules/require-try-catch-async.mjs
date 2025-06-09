'use strict';

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforces that async functions include error handling with try/catch, unless marked with an exact @safe comment.',
      category: 'Error Handling',
      recommended: false,
      url: 'https://github.com/mces58/Hangmanify/blob/master/guides/rules/require-try-catch-async.md',
    },
    schema: [],
  },

  create(context) {
    const sourceCode = context.getSourceCode();

    function getChildNodes(node) {
      return Object.values(node)
        .flat()
        .filter((child) => child && typeof child === 'object' && typeof child.type === 'string');
    }

    function containsTryStatement(node) {
      const stack = [node];
      const visited = new WeakSet();

      while (stack.length) {
        const current = stack.pop();
        if (!current || visited.has(current)) continue;

        visited.add(current);
        if (current.type === 'TryStatement') return true;

        stack.push(...getChildNodes(current));
      }

      return false;
    }

    function checkAsyncFunction(node) {
      if (!node.async || node.body?.type !== 'BlockStatement') return;

      const hasTry = containsTryStatement(node.body);

      const commentNodes = new Set([node, node.parent, node.parent?.parent]);

      const commentsBefore = Array.from(commentNodes)
        .filter(Boolean)
        .flatMap((n) => sourceCode.getCommentsBefore(n));

      const safeComment = commentsBefore.find((comment) =>
        comment.value.trim().startsWith('@safe')
      );

      const isExactlySafe = safeComment?.value.trim() === '@safe';

      if (!hasTry) {
        if (safeComment && !isExactlySafe) {
          context.report({
            node,
            message:
              'Invalid @safe usage: Only "@safe" by itself is allowed to skip try/catch in async functions.',
          });
        } else if (!isExactlySafe) {
          context.report({
            node,
            message:
              'Async functions must include try/catch or be marked with an exact @safe comment directly above the function.',
          });
        }
      }
    }

    return {
      FunctionDeclaration: checkAsyncFunction,
      FunctionExpression: checkAsyncFunction,
      ArrowFunctionExpression: checkAsyncFunction,
    };
  },
};
