import { useState } from 'react';
import {
  TemplateBuilder,
  DocContentEditor,
  DocRenderer,
  useDocSearch,
  mockApiReferenceTemplate,
  mockApiReferenceContent,
  mockWalkthroughTemplate,
  mockWalkthroughContent,
  mockSideBySideTemplate,
  mockSideBySideContent,
} from '../index';
import type { DocTemplate, DocContent, LayoutType } from '../index';
import { Layers, FileEdit, Eye, Sparkles, Search, Sliders } from 'lucide-react';

type Tab = 'builder' | 'editor' | 'viewer';

export function App() {
  const [currentPreset, setCurrentPreset] = useState<'api' | 'walkthrough' | 'side-by-side'>('api');
  const [activeTab, setActiveTab] = useState<Tab>('viewer');
  const [template, setTemplate] = useState<DocTemplate>(mockApiReferenceTemplate);
  const [content, setContent] = useState<DocContent>(mockApiReferenceContent);
  const [layoutOverride, setLayoutOverride] = useState<LayoutType | 'auto'>('auto');
  const [searchQuery, setSearchQuery] = useState('');

  const { search } = useDocSearch(content);
  const searchResults = searchQuery ? search(searchQuery) : [];

  const handleSelectPreset = (preset: 'api' | 'walkthrough' | 'side-by-side') => {
    setCurrentPreset(preset);
    setLayoutOverride('auto');
    if (preset === 'api') {
      setTemplate(mockApiReferenceTemplate);
      setContent(mockApiReferenceContent);
    } else if (preset === 'walkthrough') {
      setTemplate(mockWalkthroughTemplate);
      setContent(mockWalkthroughContent);
    } else {
      setTemplate(mockSideBySideTemplate);
      setContent(mockSideBySideContent);
    }
  };

  const activeTemplateWithOverride: DocTemplate = {
    ...template,
    layoutType: layoutOverride === 'auto' ? template.layoutType : layoutOverride,
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <header
        style={{
          borderBottom: '1px solid var(--doc-sdk-border)',
          backgroundColor: 'var(--doc-sdk-surface)',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                width: '1.75rem',
                height: '1.75rem',
                borderRadius: '0.375rem',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
            >
              D
            </span>
            <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>
              @mkr/doc-sdk
            </span>
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              padding: '0.2rem 0.5rem',
              borderRadius: '9999px',
              backgroundColor: 'var(--doc-sdk-primary-light)',
              color: 'var(--doc-sdk-primary)',
              fontWeight: 600,
            }}
          >
            v0.1.0 Playground
          </span>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--doc-sdk-bg)',
            padding: '0.25rem',
            borderRadius: 'var(--doc-sdk-radius)',
            border: '1px solid var(--doc-sdk-border)',
            gap: '0.25rem',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('builder')}
            className="doc-sdk-btn"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.8125rem',
              backgroundColor: activeTab === 'builder' ? 'var(--doc-sdk-surface)' : 'transparent',
              color: activeTab === 'builder' ? 'var(--doc-sdk-text)' : 'var(--doc-sdk-text-muted)',
              border: activeTab === 'builder' ? '1px solid var(--doc-sdk-border)' : '1px solid transparent',
              boxShadow: activeTab === 'builder' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
            }}
          >
            <Layers size={14} />
            <span>1. Template Builder</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className="doc-sdk-btn"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.8125rem',
              backgroundColor: activeTab === 'editor' ? 'var(--doc-sdk-surface)' : 'transparent',
              color: activeTab === 'editor' ? 'var(--doc-sdk-text)' : 'var(--doc-sdk-text-muted)',
              border: activeTab === 'editor' ? '1px solid var(--doc-sdk-border)' : '1px solid transparent',
              boxShadow: activeTab === 'editor' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
            }}
          >
            <FileEdit size={14} />
            <span>2. Content Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('viewer')}
            className="doc-sdk-btn"
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.8125rem',
              backgroundColor: activeTab === 'viewer' ? 'var(--doc-sdk-surface)' : 'transparent',
              color: activeTab === 'viewer' ? 'var(--doc-sdk-text)' : 'var(--doc-sdk-text-muted)',
              border: activeTab === 'viewer' ? '1px solid var(--doc-sdk-border)' : '1px solid transparent',
              boxShadow: activeTab === 'viewer' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
            }}
          >
            <Eye size={14} />
            <span>3. Client Viewer</span>
          </button>
        </div>

        {/* Preset Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={14} style={{ color: 'var(--doc-sdk-primary)' }} />
          <span style={{ fontSize: '0.8125rem', color: 'var(--doc-sdk-text-muted)' }}>Preset:</span>
          <select
            value={currentPreset}
            onChange={(e) => handleSelectPreset(e.target.value as 'api' | 'walkthrough' | 'side-by-side')}
            className="doc-sdk-select"
            style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.8125rem' }}
          >
            <option value="api">API Reference (Two-Column)</option>
            <option value="walkthrough">Quickstart Walkthrough (Single-Column)</option>
            <option value="side-by-side">Resource API (Side-by-Side Code)</option>
          </select>
        </div>
      </header>

      {/* Main Tab Body */}
      <main style={{ flex: 1, backgroundColor: 'var(--doc-sdk-bg)' }}>
        {activeTab === 'builder' && (
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 1rem' }}>
            <TemplateBuilder
              initialTemplate={template}
              onChange={(updated) => setTemplate(updated)}
              onSave={(saved) => {
                setTemplate(saved);
                alert(`Template "${saved.name}" saved successfully!`);
              }}
            />
          </div>
        )}

        {activeTab === 'editor' && (
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 1rem' }}>
            <DocContentEditor
              template={template}
              initialContent={content}
              onChange={(updated) => setContent(updated)}
              onSave={(saved) => {
                setContent(saved);
                alert(`Content for "${template.name}" saved successfully!`);
              }}
            />
          </div>
        )}

        {activeTab === 'viewer' && (
          <div>
            {/* Viewer Controls Bar */}
            <div
              style={{
                backgroundColor: 'var(--doc-sdk-surface)',
                borderBottom: '1px solid var(--doc-sdk-border)',
                padding: '0.65rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              {/* Search Bar */}
              <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                <Search
                  size={15}
                  style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--doc-sdk-text-muted)',
                  }}
                />
                <input
                  type="text"
                  placeholder="In-memory doc search (via useDocSearch)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="doc-sdk-input"
                  style={{ paddingLeft: '2.25rem', fontSize: '0.8125rem' }}
                />
                {searchResults.length > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      marginTop: '0.25rem',
                      backgroundColor: 'var(--doc-sdk-surface)',
                      border: '1px solid var(--doc-sdk-border)',
                      borderRadius: 'var(--doc-sdk-radius-sm)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                      zIndex: 50,
                      maxHeight: '260px',
                      overflowY: 'auto',
                    }}
                  >
                    {searchResults.map((res) => (
                      <div
                        key={res.blockId}
                        style={{
                          padding: '0.5rem 0.75rem',
                          borderBottom: '1px solid var(--doc-sdk-border)',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--doc-sdk-primary)' }}>
                          {res.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--doc-sdk-text-muted)' }}>
                          {res.snippet}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Layout Switcher Override */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sliders size={14} style={{ color: 'var(--doc-sdk-text-muted)' }} />
                <span style={{ fontSize: '0.8125rem', color: 'var(--doc-sdk-text-muted)' }}>Layout Override:</span>
                <select
                  value={layoutOverride}
                  onChange={(e) => setLayoutOverride(e.target.value as LayoutType | 'auto')}
                  className="doc-sdk-select"
                  style={{ width: 'auto', padding: '0.3rem 0.65rem', fontSize: '0.8125rem' }}
                >
                  <option value="auto">Template Default ({template.layoutType})</option>
                  <option value="two-column">Force Two-Column</option>
                  <option value="single-column">Force Single-Column</option>
                  <option value="side-by-side-code">Force Side-by-Side Code</option>
                </select>
              </div>
            </div>

            {/* Client DocRenderer Output */}
            <DocRenderer
              template={activeTemplateWithOverride}
              content={content}
              onAnchorClick={(anchor) => {
                const el = document.getElementById(anchor);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
