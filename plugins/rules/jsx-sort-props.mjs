'use strict';

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforces that JSX props are sorted in alphabetical order for readability and consistency.',
      category: 'Stylistic Issues',
      recommended: false,
    },
    schema: [],
    messages: {
      unsortedProps:
        "JSX props should be sorted in alphabetical order. '{{prev}}' should come before '{{current}}'.",
    },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        const attributes = node.attributes.filter(
          (attr) =>
            attr.type === 'JSXAttribute' &&
            attr.name &&
            typeof attr.name.name === 'string'
        );

        let prevName = null;
        for (const attr of attributes) {
          const currentName = attr.name.name;
          if (prevName !== null && currentName.localeCompare(prevName) < 0) {
            context.report({
              node: attr,
              messageId: 'unsortedProps',
              data: { prev: prevName, current: currentName },
            });
            break;
          }
          prevName = currentName;
        }
      },
    };
  },
};
