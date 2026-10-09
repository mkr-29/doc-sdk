import { useState, useEffect, useMemo, type CSSProperties } from 'react';
import type { ThemeMode, DocSdkThemeColors, DocSdkThemeConfig } from '../core';

export function themeColorsToCssVariables(
  colors?: Partial<DocSdkThemeColors>
): Record<string, string> {
  if (!colors) return {};
  const vars: Record<string, string> = {};

  if (colors.bg) vars['--doc-sdk-bg'] = colors.bg;
  if (colors.surface) vars['--doc-sdk-surface'] = colors.surface;
  if (colors.surfaceHover) vars['--doc-sdk-surface-hover'] = colors.surfaceHover;
  if (colors.surfaceActive) vars['--doc-sdk-surface-active'] = colors.surfaceActive;
  if (colors.border) vars['--doc-sdk-border'] = colors.border;
  if (colors.borderFocus) vars['--doc-sdk-border-focus'] = colors.borderFocus;
  if (colors.text) vars['--doc-sdk-text'] = colors.text;
  if (colors.textMuted) vars['--doc-sdk-text-muted'] = colors.textMuted;
  if (colors.textSubtle) vars['--doc-sdk-text-subtle'] = colors.textSubtle;
  if (colors.primary) vars['--doc-sdk-primary'] = colors.primary;
  if (colors.primaryHover) vars['--doc-sdk-primary-hover'] = colors.primaryHover;
  if (colors.primaryLight) vars['--doc-sdk-primary-light'] = colors.primaryLight;
  if (colors.primaryContrast) vars['--doc-sdk-primary-contrast'] = colors.primaryContrast;
  if (colors.info) vars['--doc-sdk-info'] = colors.info;
  if (colors.infoBg) vars['--doc-sdk-info-bg'] = colors.infoBg;
  if (colors.infoBorder) vars['--doc-sdk-info-border'] = colors.infoBorder;
  if (colors.warning) vars['--doc-sdk-warning'] = colors.warning;
  if (colors.warningBg) vars['--doc-sdk-warning-bg'] = colors.warningBg;
  if (colors.warningBorder) vars['--doc-sdk-warning-border'] = colors.warningBorder;
  if (colors.tip) vars['--doc-sdk-tip'] = colors.tip;
  if (colors.tipBg) vars['--doc-sdk-tip-bg'] = colors.tipBg;
  if (colors.tipBorder) vars['--doc-sdk-tip-border'] = colors.tipBorder;
  if (colors.danger) vars['--doc-sdk-danger'] = colors.danger;
  if (colors.dangerBg) vars['--doc-sdk-danger-bg'] = colors.dangerBg;
  if (colors.dangerBorder) vars['--doc-sdk-danger-border'] = colors.dangerBorder;
  if (colors.codeBg) vars['--doc-sdk-code-bg'] = colors.codeBg;
  if (colors.codeText) vars['--doc-sdk-code-text'] = colors.codeText;
  if (colors.codeBorder) vars['--doc-sdk-code-border'] = colors.codeBorder;

  return vars;
}

export interface UseThemeOptions {
  theme?: ThemeMode;
  themeConfig?: DocSdkThemeConfig;
  lightColors?: Partial<DocSdkThemeColors>;
  darkColors?: Partial<DocSdkThemeColors>;
}

export function useTheme(options: UseThemeOptions = {}) {
  const {
    theme = options.themeConfig?.mode || 'system',
    themeConfig,
    lightColors = themeConfig?.lightColors,
    darkColors = themeConfig?.darkColors,
  } = options;

  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  const activeTheme: 'light' | 'dark' = useMemo(() => {
    if (theme === 'dark') return 'dark';
    if (theme === 'light') return 'light';
    return systemIsDark ? 'dark' : 'light';
  }, [theme, systemIsDark]);

  const customVars = useMemo(() => {
    const activeColors = activeTheme === 'dark' ? darkColors : lightColors;
    return themeColorsToCssVariables(activeColors);
  }, [activeTheme, darkColors, lightColors]);

  const themeStyle = useMemo<CSSProperties>(() => {
    return customVars as unknown as CSSProperties;
  }, [customVars]);

  return {
    activeTheme,
    themeMode: theme,
    themeStyle,
  };
}
