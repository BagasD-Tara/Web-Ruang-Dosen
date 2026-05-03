import React from 'react';

export const questions = [
  {
    id: 1,
    title: 'Titration Logic',
    description: (
      <>
        Print <code className="bg-surface-container-high px-2 py-1 rounded text-sm text-error">
          &quot;Acidic&quot;
        </code>{' '}
        if{' '}
        <code className="bg-surface-container-high px-2 py-1 rounded text-sm text-error">pH</code>{' '}
        is less than{' '}
        <code className="bg-surface-container-high px-2 py-1 rounded text-sm text-error">7.0</code>.
      </>
    ),
    code: {
      variable: 'float pH = ',
      value: '3.42',
      blank1: { placeholder: 'if', answer: 'if' },
      operator: { placeholder: '<', answer: '<' },
      print: 'printf("Acidic");',
    },
  },
  {
    id: 2,
    title: 'Titration Logic',
    description: (
      <>
        Print <code className="bg-surface-container-high px-2 py-1 rounded text-sm text-error">
          &quot;Basic&quot;
        </code>{' '}
        if{' '}
        <code className="bg-surface-container-high px-2 py-1 rounded text-sm text-error">pH</code>{' '}
        is greater than{' '}
        <code className="bg-surface-container-high px-2 py-1 rounded text-sm text-error">7.0</code>.
      </>
    ),
    code: {
      variable: 'float pH = ',
      value: '9.10',
      blank1: { placeholder: 'if', answer: 'if' },
      operator: { placeholder: '>', answer: '>' },
      print: 'printf("Basic");',
    },
  },
];
