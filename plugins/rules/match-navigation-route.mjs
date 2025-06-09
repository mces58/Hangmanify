'use strict';

import path from 'path';

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforces that useNavigation/useRoute generics match the screen name and are not imported from @react-navigation/native',
      category: 'Type Safety',
      recommended: false,
      url: 'https://github.com/mces58/Hangmanify/blob/master/guides/rules/match-navigation-route.md',
    },
    messages: {
      mismatch:
        'Generic "{{used}}" does not match expected "RouteNames.{{expected}}" based on filename.',
      missing: 'You must specify a generic like {{hook}}<RouteNames.{{expected}}> in this file.',
      bannedImport:
        'Do not import "{{hook}}" from @react-navigation/native. Use your local wrapper instead.',
    },
    schema: [],
  },

  create(context) {
    const filename = context.getFilename().replace(/\\/g, '/');

    const isScreenFile = filename.includes('/src/screens/') || filename.includes('/tests/rules/');

    if (!isScreenFile || !filename.endsWith('.tsx')) return {};

    const baseName = path.basename(filename);
    const screenName = baseName.replace(/\.tsx$/, '').toUpperCase();
    const expectedGeneric = `RouteNames.${screenName}`;
    const bannedImports = new Map();

    return {
      ImportDeclaration(node) {
        if (node.source.value === '@react-navigation/native') {
          for (const spec of node.specifiers) {
            if (
              spec.type === 'ImportSpecifier' &&
              ['useNavigation', 'useRoute'].includes(spec.imported.name)
            ) {
              bannedImports.set(spec.local.name, spec);
              context.report({
                node: spec,
                messageId: 'bannedImport',
                data: {
                  hook: spec.imported.name,
                },
              });
            }
          }
        }
      },

      CallExpression(node) {
        const callee = node.callee?.type === 'Identifier' ? node.callee.name : null;

        if (!callee || !['useNavigation', 'useRoute'].includes(callee)) return;
        if (bannedImports.has(callee)) return;

        const genericNode = node.typeArguments?.params?.[0];

        if (!genericNode) {
          context.report({
            node,
            messageId: 'missing',
            data: {
              hook: callee,
              expected: screenName,
            },
          });
          return;
        }

        const usedGeneric = context.getSourceCode().getText(genericNode);
        if (usedGeneric !== expectedGeneric) {
          context.report({
            node: genericNode,
            messageId: 'mismatch',
            data: {
              used: usedGeneric,
              expected: screenName,
            },
          });
        }
      },
    };
  },
};
