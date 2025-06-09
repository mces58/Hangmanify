'use strict';

import levenshtein from 'fast-levenshtein';
import { readFileSync } from 'fs';
import { resolve } from 'path';

function getClosestKeys(target, options, threshold = 10) {
  return options
    .map((key) => ({
      key,
      distance: levenshtein.get(target, key),
    }))
    .filter(({ distance }) => distance <= threshold)
    .sort((a, b) => a.distance - b.distance)
    .map(({ key }) => key);
}

function parseTranslationKeys(content) {
  const match = content.match(/export\s+type\s+TranslationKeys\s*=\s*{([\s\S]*)};?/);
  if (!match) return {};
  const body = match[1].trim();
  return parseObject(body);
}

function parseObject(text) {
  const obj = {};
  const regex = /(?:['"]?(\w+)['"]?\s*:\s*)(\{)?/g; // NOSONAR
  let match;

  while ((match = regex.exec(text))) {
    const key = match[1];

    if (match[2] === '{') {
      let startIndex = regex.lastIndex;
      let braceCount = 1;
      let i = startIndex;

      while (braceCount && i < text.length) {
        if (text[i] === '{') braceCount++;
        else if (text[i] === '}') braceCount--;
        i++;
      }

      const block = text.slice(startIndex, i - 1);
      obj[key] = parseObject(block);
      regex.lastIndex = i;
    } else {
      obj[key] = true;
    }
  }

  return obj;
}

function isValidTranslationKey(key, structure) {
  const segments = key.split('.');
  let current = structure;
  let lastValidPath = '';
  let failedSegment = '';

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (current?.[segment] !== undefined) {
      current = current[segment];
      lastValidPath += (i > 0 ? '.' : '') + segment;
    } else {
      failedSegment = segment;
      break;
    }
  }

  if (failedSegment) {
    const siblings = Object.keys(current || {});
    const suggestions = getClosestKeys(failedSegment, siblings);
    return { valid: false, suggestions, lastValidPath, failedSegment };
  }

  return { valid: current === true };
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Checks that the translation key passed to the t() function is valid according to the nested structure defined in the TranslationKeys type file.',
      category: 'Best Practices',
      recommended: false,
      url: 'https://github.com/mces58/Hangmanify/blob/master/guides/rules/valid-translation-key.md',
    },
    schema: [],
    messages: {
      invalidKey:
        'The translation key "{{ key }}" is not defined in TranslationKeys.{{ suggestion }}',
    },
  },

  create(context) {
    let translationKeysStructure = {};

    try {
      const filePath = resolve(process.cwd(), 'src/constants/localization/translation-keys.d.ts');
      const fileContent = readFileSync(filePath, 'utf-8');
      translationKeysStructure = parseTranslationKeys(fileContent);
    } catch (error) {
      console.error('[eslint-plugin] Could not read TranslationKeys:', error);
    }

    return {
      CallExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === 't' &&
          node.arguments[0]?.type === 'Literal' &&
          typeof node.arguments[0].value === 'string'
        ) {
          const key = node.arguments[0].value;
          const result = isValidTranslationKey(key, translationKeysStructure);
          if (!result.valid) {
            const suggestionMessage =
              result.suggestions?.length > 0
                ? ` Did you mean: ${result.suggestions
                    .map((s) =>
                      result.lastValidPath ? `"${result.lastValidPath}.${s}"` : `"${s}"`
                    )
                    .join(', ')}?`
                : '';
            context.report({
              node: node.arguments[0],
              messageId: 'invalidKey',
              data: {
                key,
                suggestion: suggestionMessage.trim(),
              },
            });
          }
        }
      },
    };
  },
};
