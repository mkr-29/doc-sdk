import React from 'react';
import clsx from 'clsx';
import type { BlockComponentProps, StepperBlockData } from '../../core';

export const StepperBlock: React.FC<BlockComponentProps<StepperBlockData>> = ({
  block,
  className,
}) => {
  const { steps = [] } = (block.data || {}) as StepperBlockData;

  return (
    <div
      className={clsx('doc-sdk-block', 'doc-sdk-stepper', className)}
      data-block-id={block.id}
      data-block-type="stepper"
    >
      {steps.map((step, idx) => {
        const stepNum = step.stepNumber !== undefined ? step.stepNumber : idx + 1;
        return (
          <div key={`${step.title}-${idx}`} className="doc-sdk-step-item">
            <div className="doc-sdk-step-number" aria-label={`Step ${stepNum}`}>
              {stepNum}
            </div>
            <div className="doc-sdk-step-content">
              <div className="doc-sdk-step-title">{step.title}</div>
              <div className="doc-sdk-step-desc">{step.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
