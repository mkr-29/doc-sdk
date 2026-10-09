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
import type { DocTemplate, DocContent, LayoutType, ThemeMode, DocSdkThemeColors } from '../index';
import { Layers, FileEdit, Eye, Sparkles, Search, Sliders, Moon, Sun, Palette } from 'lucide-react';

type Tab = 'builder' | 'editor' | 'viewer';

export function App() {
  const initialParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialTheme = (initialParams?.get('theme') as ThemeMode) || 'dark';
  const initialTab = (initialParams?.get('tab') as Tab) || 'viewer';
  const initialPreset = (initialParams?.get('preset') as 'api' | 'walkthrough' | 'side-by-side') || 'api';

  const [currentPreset, setCurrentPreset] = useState<'api' | 'walkthrough' | 'side-by-side'>(initialPreset);
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialTheme);
  const [primaryColor, setPrimaryColor] = useState<string>('#6366f1');
  
  const [template, setTemplate] = useState<DocTemplate>(() => {
    if (initialPreset === 'walkthrough') return mockWalkthroughTemplate;
    if (initialPreset === 'side-by-side') return mockSideBySideTemplate;
    return mockApiReferenceTemplate;
  });
  const [content, setContent] = useState<DocContent>(() => {
    if (initialPreset === 'walkthrough') return mockWalkthroughContent;
    if (initialPreset === 'side-by-side') return mockSideBySideContent;
    return mockApiReferenceContent;
  });
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

  const customColors: Partial<DocSdkThemeColors> = {
    primary: primaryColor,
    primaryHover: primaryColor,
  };

  return (
    <div
      className="doc-sdk-root"
      data-theme={themeMode}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--doc-sdk-bg)',
        color: 'var(--doc-sdk-text)',
      }}
    >
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '0.5rem',
                background: `linear-gradient(135deg, ${primaryColor} 0%, #a855f7 100%)`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: '0.9375rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              }}
            >
              D
            </span>
            <span style={{ fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.02em' }}>
              @racinmk/doc-sdk
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
            v0.1.0 Interactive Studio
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
              padding: '0.4rem 0.85rem',
              fontSize: '0.8125rem',
              backgroundColor: activeTab === 'builder' ? 'var(--doc-sdk-surface)' : 'transparent',
              color: activeTab === 'builder' ? 'var(--doc-sdk-text)' : 'var(--doc-sdk-text-muted)',
              border: activeTab === 'builder' ? '1px solid var(--doc-sdk-border)' : '1px solid transparent',
              boxShadow: activeTab === 'builder' ? 'var(--doc-sdk-shadow-sm)' : 'none',
            }}
          >
            <Layers size={15} />
            <span>1. Template Builder</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className="doc-sdk-btn"
            style={{
              padding: '0.4rem 0.85rem',
              fontSize: '0.8125rem',
              backgroundColor: activeTab === 'editor' ? 'var(--doc-sdk-surface)' : 'transparent',
              color: activeTab === 'editor' ? 'var(--doc-sdk-text)' : 'var(--doc-sdk-text-muted)',
              border: activeTab === 'editor' ? '1px solid var(--doc-sdk-border)' : '1px solid transparent',
              boxShadow: activeTab === 'editor' ? 'var(--doc-sdk-shadow-sm)' : 'none',
            }}
          >
            <FileEdit size={15} />
            <span>2. Content Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('viewer')}
            className="doc-sdk-btn"
            style={{
              padding: '0.4rem 0.85rem',
              fontSize: '0.8125rem',
              backgroundColor: activeTab === 'viewer' ? 'var(--doc-sdk-surface)' : 'transparent',
              color: activeTab === 'viewer' ? 'var(--doc-sdk-text)' : 'var(--doc-sdk-text-muted)',
              border: activeTab === 'viewer' ? '1px solid var(--doc-sdk-border)' : '1px solid transparent',
              boxShadow: activeTab === 'viewer' ? 'var(--doc-sdk-shadow-sm)' : 'none',
            }}
          >
            <Eye size={15} />
            <span>3. Client Viewer</span>
          </button>
        </div>

        {/* Right Controls: Theme Toggle & Custom Colors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Preset Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Sparkles size={14} style={{ color: 'var(--doc-sdk-primary)' }} />
            <select
              value={currentPreset}
              onChange={(e) => handleSelectPreset(e.target.value as 'api' | 'walkthrough' | 'side-by-side')}
              className="doc-sdk-select"
              style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.8125rem' }}
            >
              <option value="api">API Reference (Two-Column)</option>
              <option value="walkthrough">Walkthrough (Single-Column)</option>
              <option value="side-by-side">Resource API (Side-by-Side)</option>
            </select>
          </div>

          {/* Color Customizer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Palette size={14} style={{ color: 'var(--doc-sdk-text-muted)' }} />
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              title="Customize Primary Brand Color"
              style={{
                width: '28px',
                height: '28px',
                padding: 0,
                border: '1px solid var(--doc-sdk-border)',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: 'transparent',
              }}
            />
          </div>

          {/* Theme Mode Button */}
          <button
            type="button"
            onClick={() => setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            className="doc-sdk-btn doc-sdk-btn-secondary"
            style={{ padding: '0.35rem 0.65rem', fontSize: '0.8125rem' }}
            aria-label={`Toggle theme (currently ${themeMode})`}
          >
            {themeMode === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            <span style={{ textTransform: 'capitalize' }}>{themeMode}</span>
          </button>
        </div>
      </header>

      {/* Main Tab Body */}
      <main style={{ flex: 1, backgroundColor: 'var(--doc-sdk-bg)' }}>
        {activeTab === 'builder' && (
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 1rem' }}>
            <TemplateBuilder
              initialTemplate={template}
              theme={themeMode}
              lightColors={customColors}
              darkColors={customColors}
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
              theme={themeMode}
              lightColors={customColors}
              darkColors={customColors}
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
              <div style={{ position: 'relative', flex: 1, maxWidth: '420px' }}>
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
                  placeholder="In-memory search (try 'token', 'auth', 'param')..."
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
                      marginTop: '0.35rem',
                      backgroundColor: 'var(--doc-sdk-surface)',
                      border: '1px solid var(--doc-sdk-border)',
                      borderRadius: 'var(--doc-sdk-radius-sm)',
                      boxShadow: 'var(--doc-sdk-shadow-lg)',
                      zIndex: 50,
                      maxHeight: '260px',
                      overflowY: 'auto',
                    }}
                  >
                    {searchResults.map((res) => (
                      <div
                        key={res.blockId}
                        style={{
                          padding: '0.6rem 0.85rem',
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
                  style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.8125rem' }}
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
              theme={themeMode}
              lightColors={customColors}
              darkColors={customColors}
              onAnchorClick={(anchor) => {
                const cleanId = anchor.replace(/^#/, '');
                const el = document.getElementById(cleanId);
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
