import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import clsx from 'clsx';
import { Copy, Check } from 'lucide-react';
import type { BlockComponentProps, CodeSampleBlockData } from '../../core';

export const CodeSampleBlock: React.FC<BlockComponentProps<CodeSampleBlockData>> = ({
  block,
  className,
}) => {
  const {
    code = '',
    language = 'typescript',
    title,
  } = (block.data || {}) as CodeSampleBlockData;

  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState(code);

  useEffect(() => {
    try {
      const grammar = Prism.languages[language] || Prism.languages.javascript || Prism.languages.plain;
      if (grammar) {
        setHighlightedCode(Prism.highlight(code, grammar, language));
      } else {
        setHighlightedCode(code);
      }
    } catch {
      setHighlightedCode(code);
    }
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  return (
    <div
      className={clsx('doc-sdk-block', 'doc-sdk-code-block', className)}
      data-block-id={block.id}
      data-block-type="code_sample"
    >
      <div className="doc-sdk-code-header">
        <span className="doc-sdk-code-title">
          {title || language.toUpperCase()}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="doc-sdk-code-copy-btn"
          aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="doc-sdk-code-pre">
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
};
