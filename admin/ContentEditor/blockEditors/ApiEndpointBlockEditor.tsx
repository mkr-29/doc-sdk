import type { FC } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { ApiEndpointBlockData, HttpMethod, ParameterItem, ResponseItem } from '../../../core';
import type { BlockEditorProps } from '../types';

const METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export const ApiEndpointBlockEditor: FC<BlockEditorProps<ApiEndpointBlockData>> = ({
  block,
  onUpdate,
}) => {
  const {
    method = 'GET',
    path = '',
    description = '',
    parameters = [],
    responses = [],
  } = (block.data || {}) as ApiEndpointBlockData;

  const addParameter = () => {
    const newParam: ParameterItem = {
      name: 'param_name',
      in: 'query',
      type: 'string',
      required: false,
      description: '',
    };
    onUpdate({ parameters: [...parameters, newParam] });
  };

  const updateParameter = (index: number, updates: Partial<ParameterItem>) => {
    const updated = parameters.map((p, idx) => (idx === index ? { ...p, ...updates } : p));
    onUpdate({ parameters: updated });
  };

  const removeParameter = (index: number) => {
    onUpdate({ parameters: parameters.filter((_, idx) => idx !== index) });
  };

  const addResponse = () => {
    const newResp: ResponseItem = {
      status: 200,
      description: 'OK Response',
      body: '{\n  "success": true\n}',
    };
    onUpdate({ responses: [...responses, newResp] });
  };

  const updateResponse = (index: number, updates: Partial<ResponseItem>) => {
    const updated = responses.map((r, idx) => (idx === index ? { ...r, ...updates } : r));
    onUpdate({ responses: updated });
  };

  const removeResponse = (index: number) => {
    onUpdate({ responses: responses.filter((_, idx) => idx !== index) });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem' }}>
        <div>
          <label className="doc-sdk-label">HTTP Method</label>
          <select
            className="doc-sdk-select"
            value={method}
            onChange={(e) => onUpdate({ method: e.target.value as HttpMethod })}
            aria-label="HTTP Method"
          >
            {METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="doc-sdk-label">Path</label>
          <input
            type="text"
            className="doc-sdk-input"
            value={path}
            onChange={(e) => onUpdate({ path: e.target.value })}
            placeholder="e.g. /v1/users/{id}"
            aria-label="Endpoint Path"
          />
        </div>
      </div>

      <div>
        <label className="doc-sdk-label">Description (Optional)</label>
        <input
          type="text"
          className="doc-sdk-input"
          value={description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Brief endpoint summary..."
          aria-label="Endpoint Description"
        />
      </div>

      {/* Parameters */}
      <div style={{ borderTop: '1px solid var(--doc-sdk-border)', paddingTop: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label className="doc-sdk-label" style={{ margin: 0 }}>
            Parameters ({parameters.length})
          </label>
          <button
            type="button"
            onClick={addParameter}
            className="doc-sdk-btn doc-sdk-btn-secondary doc-sdk-btn-sm"
          >
            <Plus size={13} /> Add Parameter
          </button>
        </div>

        {parameters.map((param, idx) => (
          <div
            key={idx}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 90px 80px 1fr 35px',
              gap: '0.35rem',
              alignItems: 'center',
              marginBottom: '0.4rem',
            }}
          >
            <input
              type="text"
              className="doc-sdk-input"
              value={param.name}
              onChange={(e) => updateParameter(idx, { name: e.target.value })}
              placeholder="Name"
              aria-label="Param Name"
            />
            <select
              className="doc-sdk-select"
              value={param.in}
              onChange={(e) => updateParameter(idx, { in: e.target.value as any })}
              aria-label="Param Location"
            >
              <option value="query">query</option>
              <option value="header">header</option>
              <option value="path">path</option>
              <option value="body">body</option>
            </select>
            <input
              type="text"
              className="doc-sdk-input"
              value={param.type}
              onChange={(e) => updateParameter(idx, { type: e.target.value })}
              placeholder="type"
              aria-label="Param Type"
            />
            <input
              type="text"
              className="doc-sdk-input"
              value={param.description || ''}
              onChange={(e) => updateParameter(idx, { description: e.target.value })}
              placeholder="Description"
              aria-label="Param Description"
            />
            <button
              type="button"
              onClick={() => removeParameter(idx)}
              className="doc-sdk-btn doc-sdk-btn-danger doc-sdk-btn-sm"
              aria-label="Remove Parameter"
              style={{ padding: '0.3rem' }}
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* Responses */}
      <div style={{ borderTop: '1px solid var(--doc-sdk-border)', paddingTop: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label className="doc-sdk-label" style={{ margin: 0 }}>
            Responses ({responses.length})
          </label>
          <button
            type="button"
            onClick={addResponse}
            className="doc-sdk-btn doc-sdk-btn-secondary doc-sdk-btn-sm"
          >
            <Plus size={13} /> Add Response
          </button>
        </div>

        {responses.map((resp, idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid var(--doc-sdk-border)',
              borderRadius: 'var(--doc-sdk-radius-sm)',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              backgroundColor: 'var(--doc-sdk-surface)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 35px', gap: '0.35rem', marginBottom: '0.35rem' }}>
              <input
                type="number"
                className="doc-sdk-input"
                value={resp.status}
                onChange={(e) => updateResponse(idx, { status: Number(e.target.value) })}
                placeholder="200"
                aria-label="Response Status Code"
              />
              <input
                type="text"
                className="doc-sdk-input"
                value={resp.description}
                onChange={(e) => updateResponse(idx, { description: e.target.value })}
                placeholder="Description"
                aria-label="Response Description"
              />
              <button
                type="button"
                onClick={() => removeResponse(idx)}
                className="doc-sdk-btn doc-sdk-btn-danger doc-sdk-btn-sm"
                aria-label="Remove Response"
                style={{ padding: '0.3rem' }}
              >
                <Trash2 size={13} />
              </button>
            </div>
            <textarea
              className="doc-sdk-textarea"
              rows={3}
              value={resp.body || ''}
              onChange={(e) => updateResponse(idx, { body: e.target.value })}
              placeholder='Response Body JSON (Optional)'
              aria-label="Response Body"
              style={{ fontFamily: 'var(--doc-sdk-font-mono)', fontSize: '0.8125rem' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
