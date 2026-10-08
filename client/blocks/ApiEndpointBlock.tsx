import React from 'react';
import clsx from 'clsx';
import type { BlockComponentProps, ApiEndpointBlockData } from '../../core';

export const ApiEndpointBlock: React.FC<BlockComponentProps<ApiEndpointBlockData>> = ({
  block,
  className,
}) => {
  const {
    method = 'GET',
    path = '',
    description,
    parameters = [],
    responses = [],
  } = (block.data || {}) as ApiEndpointBlockData;

  const methodBadgeClass = {
    GET: 'doc-sdk-badge-get',
    POST: 'doc-sdk-badge-post',
    PUT: 'doc-sdk-badge-put',
    DELETE: 'doc-sdk-badge-delete',
    PATCH: 'doc-sdk-badge-patch',
  }[method] || 'doc-sdk-badge-get';

  return (
    <div
      className={clsx('doc-sdk-block', 'doc-sdk-api-endpoint', className)}
      data-block-id={block.id}
      data-block-type="api_endpoint"
    >
      <div className="doc-sdk-api-header">
        <span className={clsx('doc-sdk-badge-method', methodBadgeClass)}>
          {method}
        </span>
        <span className="doc-sdk-api-path">{path}</span>
      </div>

      <div className="doc-sdk-api-body">
        {description && <p className="doc-sdk-api-desc">{description}</p>}

        {parameters && parameters.length > 0 && (
          <div>
            <h4 style={{ margin: '0.75rem 0 0.25rem', fontSize: '0.875rem', fontWeight: 600 }}>
              Request Parameters
            </h4>
            <table className="doc-sdk-api-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {parameters.map((param, idx) => (
                  <tr key={`${param.name}-${idx}`}>
                    <td>
                      <span className="doc-sdk-param-name">{param.name}</span>
                      {param.required && (
                        <span className="doc-sdk-badge-required">*required</span>
                      )}
                    </td>
                    <td><code>{param.type}</code></td>
                    <td>{param.in}</td>
                    <td>{param.description || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {responses && responses.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <h4 style={{ margin: '0.75rem 0 0.25rem', fontSize: '0.875rem', fontWeight: 600 }}>
              Responses
            </h4>
            {responses.map((resp, idx) => (
              <div
                key={`${resp.status}-${idx}`}
                style={{
                  padding: '0.5rem 0.75rem',
                  border: '1px solid var(--doc-sdk-border)',
                  borderRadius: 'var(--doc-sdk-radius-sm)',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong style={{ color: resp.status < 400 ? 'var(--doc-sdk-tip)' : 'var(--doc-sdk-danger)' }}>
                    {resp.status}
                  </strong>
                  <span>{resp.description}</span>
                </div>
                {resp.body && (
                  <pre
                    style={{
                      background: 'var(--doc-sdk-surface)',
                      padding: '0.5rem',
                      borderRadius: 'var(--doc-sdk-radius-sm)',
                      marginTop: '0.5rem',
                      fontSize: '0.8125rem',
                      overflowX: 'auto',
                    }}
                  >
                    <code>{resp.body}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
