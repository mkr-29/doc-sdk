import { useState, type FC } from 'react';
import { Copy, Check, Upload, X } from 'lucide-react';
import { safeValidateTemplate, type DocTemplate } from '../../core';

interface JsonPreviewModalProps {
  template: DocTemplate;
  isOpen: boolean;
  onClose: () => void;
  onImport: (template: DocTemplate) => void;
}

export const JsonPreviewModal: FC<JsonPreviewModalProps> = ({
  template,
  isOpen,
  onClose,
  onImport,
}) => {
  const [tab, setTab] = useState<'view' | 'import'>('view');
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(template, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleApplyImport = () => {
    try {
      setImportError(null);
      const parsed = JSON.parse(importText);
      const result = safeValidateTemplate(parsed);
      if (!result.success) {
        const errorMsg = result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
        setImportError(`Invalid Template: ${errorMsg}`);
        return;
      }
      onImport(result.data);
      onClose();
    } catch (err) {
      setImportError(err instanceof Error ? err.message : 'Invalid JSON');
    }
  };

  return (
    <div className="doc-sdk-modal-overlay" role="dialog" aria-modal="true">
      <div className="doc-sdk-modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setTab('view')}
              className={`doc-sdk-btn doc-sdk-btn-sm ${tab === 'view' ? 'doc-sdk-btn-primary' : 'doc-sdk-btn-secondary'}`}
            >
              Export JSON
            </button>
            <button
              type="button"
              onClick={() => setTab('import')}
              className={`doc-sdk-btn doc-sdk-btn-sm ${tab === 'import' ? 'doc-sdk-btn-primary' : 'doc-sdk-btn-secondary'}`}
            >
              Import JSON
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="doc-sdk-btn doc-sdk-btn-secondary doc-sdk-btn-sm"
            aria-label="Close Modal"
          >
            <X size={16} />
          </button>
        </div>

        {tab === 'view' ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
              <button
                type="button"
                onClick={handleCopy}
                className="doc-sdk-btn doc-sdk-btn-secondary doc-sdk-btn-sm"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <pre
              style={{
                backgroundColor: 'var(--doc-sdk-surface)',
                border: '1px solid var(--doc-sdk-border)',
                borderRadius: 'var(--doc-sdk-radius-sm)',
                padding: '1rem',
                fontSize: '0.8125rem',
                maxHeight: '400px',
                overflow: 'auto',
                fontFamily: 'var(--doc-sdk-font-mono)',
              }}
            >
              {jsonString}
            </pre>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--doc-sdk-text-muted)', marginBottom: '0.5rem' }}>
              Paste a valid `DocTemplate` JSON definition to load it into the builder:
            </p>
            <textarea
              className="doc-sdk-textarea"
              rows={12}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder='{\n  "id": "my-template",\n  "name": "My Template",\n  ...\n}'
              style={{ fontFamily: 'var(--doc-sdk-font-mono)', fontSize: '0.8125rem' }}
            />
            {importError && (
              <div style={{ color: 'var(--doc-sdk-danger)', fontSize: '0.8125rem', marginTop: '0.5rem' }}>
                {importError}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={handleApplyImport}
                className="doc-sdk-btn doc-sdk-btn-primary"
              >
                <Upload size={14} /> Apply Imported Template
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
