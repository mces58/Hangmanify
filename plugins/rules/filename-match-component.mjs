'use strict';

import path from 'path';

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforces that the file name exactly matches the default exported React component name in PascalCase.',
      category: 'Stylistic Issues',
      recommended: false,
      url: 'https://github.com/mces58/Hangmanify/blob/master/guides/rules/filename-match-component.md',
    },
    schema: [],
  },

  create(context) {
    const filename = context.getFilename().replace(/\\/g, '/');
    if (!filename.includes('/components/') && !filename.endsWith('/tests/rules/Test.tsx'))
      return {};
    if (filename.includes('.stories.')) return {};

    const baseFilename = path.basename(filename, path.extname(filename));
    if (baseFilename.toLowerCase() === 'index') return {};

    return {
      ExportDefaultDeclaration(node) {
        let componentName = null;
        const declaration = node.declaration;

        if (declaration.type === 'Identifier') componentName = declaration.name;
        else if (
          (declaration.type === 'FunctionDeclaration' || declaration.type === 'ClassDeclaration') &&
          declaration?.id.name
        )
          componentName = declaration.id.name;

        if (componentName && componentName !== baseFilename) {
          context.report({
            node,
            message:
              'The file name "{{baseFilename}}" must exactly match the component name "{{componentName}}" in PascalCase. No alternative naming is allowed.',
            data: {
              baseFilename,
              componentName,
            },
          });
        }
      },
    };
  },
};
