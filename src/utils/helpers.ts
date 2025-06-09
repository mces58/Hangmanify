import type { TranslateOptions } from 'i18n-js';

/**
 * ### Retrieves a nested value from an object using a dot-separated key
 * @template T
 * @param {T} obj - The object to query
 * @param {string} key - The dot-separated key (e.g., 'user.profile.name')
 * @returns {unknown} The value at the specified path, or null if not found
 * @example
 * const user = { profile: { name: 'Alice' } };
 * const name = getNestedValue(user, 'profile.name'); // 'Alice'
 */
function getNestedValue<T>(obj: T, key: string): unknown {
  return key.split('.').reduce((acc: unknown, curr: string): unknown => {
    if (acc !== null && typeof acc === 'object' && curr in acc)
      return (acc as Record<string, unknown>)[curr];

    return null;
  }, obj as unknown);
}
/**
 * ### Replaces placeholders in a string template with provided values
 * @param {string} template - The string containing `{{key}}` placeholders
 * @param {TranslateOptions} options - An object with values to inject into the template
 * @returns {string} The interpolated string with placeholders replaced
 * @example
 * const template = 'Hello, {{name}}!';
 * const result = interpolate(template, { name: 'Can' }); // 'Hello, Can!'
 */
function interpolate(template: string, options: TranslateOptions): string {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_match, key) =>
    key in options ? String(options[key]) : ''
  );
}

export const helpers = { getNestedValue, interpolate };
