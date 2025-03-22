'use strict';

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure useState always has a type argument',
      category: 'Type Safety',
      recommended: false,
    },
    schema: [],
  },
  create(context) {
    if (!context.getFilename().endsWith('.tsx')) return {};

    return {
      CallExpression(node) {
        if (node.callee?.name !== 'useState') return;

        if (!node.typeArguments?.params?.length) {
          context.report({
            node,
            message: 'useState should always have a type argument.',
          });
        }
      },
    };
  },
};
