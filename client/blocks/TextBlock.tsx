import React from 'react';
import clsx from 'clsx';
import type { BlockComponentProps, TextBlockData } from '../../core';

export const TextBlock: React.FC<BlockComponentProps<TextBlockData>> = ({
  block,
  className,
}) => {
  const { text = '', variant = 'body' } = (block.data || {}) as TextBlockData;

  const variantClass = {
    lead: 'doc-sdk-text-lead',
    body: 'doc-sdk-text-body',
    caption: 'doc-sdk-text-caption',
  }[variant];

  return (
    <div
      className={clsx('doc-sdk-block', variantClass, className)}
      data-block-id={block.id}
      data-block-type="text"
    >
      {text}
    </div>
  );
};
