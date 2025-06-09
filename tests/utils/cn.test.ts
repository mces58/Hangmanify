import { cn } from 'src/utils/cn';

const edgeCases = [
  {
    name: 'merges simple class names',
    code: () => cn('p-4', 'text-red-500'),
    expected: 'p-4 text-red-500',
  },
  {
    name: 'ignores falsey values',
    code: () => cn('p-4', null, undefined),
    expected: 'p-4',
  },
  {
    name: 'adds class conditionally (true)',
    code: () => {
      const isDark = true;
      return cn('p-4', isDark && 'bg-black');
    },
    expected: 'p-4 bg-black',
  },
  {
    name: 'ignores conditional (false)',
    code: () => {
      const isLight = false;
      return cn('p-4', isLight && 'bg-white');
    },
    expected: 'p-4',
  },
  {
    name: 'resolves tailwind conflicts',
    code: () => cn('p-4', 'p-2'),
    expected: 'p-2',
  },
  {
    name: 'supports object syntax',
    code: () => cn({ 'bg-red-500': true, 'bg-blue-500': false }),
    expected: 'bg-red-500',
  },
  {
    name: 'returns empty string with only falsey values',
    code: () => cn(false, null, undefined),
    expected: '',
  },
];

describe('cn utility function', () => {
  edgeCases.forEach(({ name, code, expected }) => {
    it(name, () => {
      const result = code();
      expect(result).toBe(expected);
      expect(result).toMatchSnapshot();
    });
  });
});
