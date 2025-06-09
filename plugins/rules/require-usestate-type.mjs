'use strict';

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure useState always has a type argument',
      category: 'Type Safety',
      recommended: false,
      url: 'https://github.com/mces58/Hangmanify/blob/master/guides/rules/require-usestate-type.md',
    },
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee;
        const isDirectUseState = callee.type === 'Identifier' && callee.name === 'useState';
        const isReactUseState =
          callee.type === 'MemberExpression' &&
          callee.object.type === 'Identifier' &&
          callee.object.name === 'React' &&
          callee.property.type === 'Identifier' &&
          callee.property.name === 'useState';

        if (!isDirectUseState && !isReactUseState) return;

        const hasTypeArgument =
          node.typeParameters?.params?.length > 0 || node.typeArguments?.params?.length > 0;

        if (!hasTypeArgument) {
          let calleeName = 'useState';

          if (callee.type === 'Identifier') calleeName = callee.name;
          else if (
            callee.type === 'MemberExpression' &&
            callee.object.type === 'Identifier' &&
            callee.property.type === 'Identifier'
          )
            calleeName = `${callee.object.name}.${callee.property.name}`;

          context.report({
            node,
            message: `'${calleeName}' should always have a type argument.`,
          });
        }
      },
    };
  },
};
