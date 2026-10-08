import React from 'react';
import clsx from 'clsx';
import { Info, AlertTriangle, Lightbulb, AlertOctagon } from 'lucide-react';
import type { BlockComponentProps, CalloutBlockData } from '../../core';

export const CalloutBlock: React.FC<BlockComponentProps<CalloutBlockData>> = ({
  block,
  className,
}) => {
  const {
    title,
    message = '',
    variant = 'info',
  } = (block.data || {}) as CalloutBlockData;

  const variantClass = {
    info: 'doc-sdk-callout-info',
    warning: 'doc-sdk-callout-warning',
    tip: 'doc-sdk-callout-tip',
    danger: 'doc-sdk-callout-danger',
  }[variant] || 'doc-sdk-callout-info';

  const IconComponent = {
    info: Info,
    warning: AlertTriangle,
    tip: Lightbulb,
    danger: AlertOctagon,
  }[variant] || Info;

  return (
    <div
      className={clsx('doc-sdk-block', 'doc-sdk-callout', variantClass, className)}
      data-block-id={block.id}
      data-block-type="callout"
      role="alert"
    >
      <div className="doc-sdk-callout-icon">
        <IconComponent size={20} />
      </div>
      <div className="doc-sdk-callout-body">
        {title && <div className="doc-sdk-callout-title">{title}</div>}
        <div className="doc-sdk-callout-message">{message}</div>
      </div>
    </div>
  );
};
