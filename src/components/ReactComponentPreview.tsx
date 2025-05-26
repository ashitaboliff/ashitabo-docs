import React, { useState, useEffect, lazy, Suspense } from 'react';
import path from 'path-browserify'; // For client-side path manipulation if needed

interface ReactComponentPreviewProps {
  filePath: string;
}

// A simple Error Boundary component
class ErrorBoundary extends React.Component<{ fallback: React.ReactNode, children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { fallback: React.ReactNode, children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error rendering preview:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Globs for src component files - these paths must be static string literals
// Note: Astro handles these globs. This component will be used as an island.
const srcComponentModules = import.meta.glob('/src/**/*.{tsx,jsx}', { eager: false });

const ReactComponentPreview: React.FC<ReactComponentPreviewProps> = ({ filePath }) => {
  const [PreviewComponent, setPreviewComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start with loading true

  useEffect(() => {
    if (!filePath) {
      setError('File path is required for React component preview.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setPreviewComponent(null);

    const loadComponent = async () => {
      try {
        const extension = path.extname(filePath).toLowerCase();
        if (extension !== '.tsx' && extension !== '.jsx') {
          throw new Error(`Invalid file type for React preview: ${extension}. Only .tsx or .jsx are supported.`);
        }

        // Construct the glob path exactly as Vite/Astro expects it for import.meta.glob
        // filePath is expected to be like "src/components/demo/SampleButton.tsx"
        const globPath = `/${filePath}`; 
        // console.log(`[ReactComponentPreview] Attempting to load: ${globPath}`);

        const componentModuleImporter = srcComponentModules[globPath];

        if (componentModuleImporter) {
          // The importer is a function that returns a Promise for the module
          const LazyComponent = lazy(componentModuleImporter as () => Promise<{ default: React.ComponentType<any> }>);
          setPreviewComponent(LazyComponent);
        } else {
          // console.warn(`[ReactComponentPreview] Component module not found for ${globPath}. Available keys:`, Object.keys(srcComponentModules));
          throw new Error(`React component module not found for path: ${filePath}. Check glob pattern and file existence.`);
        }
      } catch (e: any) {
        console.error("Error loading React component preview:", e);
        setError(e.message || 'An unknown error occurred while loading the component preview.');
      } finally {
        setIsLoading(false);
      }
    };

    loadComponent();
  }, [filePath]);

  if (isLoading) {
    return (
      <div className="cct-react-message cct-react-loading">
        <svg className="cct-icon-spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0711 4.92893L16.2426 7.75736M7.75736 16.2426L4.92893 19.0711M19.0711 19.0711L16.2426 16.2426M7.75736 7.75736L4.92893 4.92893" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <p>プレビューを読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cct-react-message cct-react-error-panel">
        <svg className="cct-icon-error" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <div>
          <h3 className="cct-error-title">Reactコンポーネント内でエラーが発生しています</h3>
          <div className="cct-error-message">{error}</div>
        </div>
      </div>
    );
  }

  if (PreviewComponent) {
    return (
      <ErrorBoundary fallback={<p className="cct-react-render-error">⚠️ Error rendering component preview.</p>}>
        <Suspense fallback={
          <div className="cct-react-message cct-react-loading">
            <svg className="cct-icon-spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0711 4.92893L16.2426 7.75736M7.75736 16.2426L4.92893 19.0711M19.0711 19.0711L16.2426 16.2426M7.75736 7.75736L4.92893 4.92893" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <p>コンポーネントのプレビューを読み込み中...</p>
          </div>
        }>
          <PreviewComponent />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return <p className="tw:p-4">プレビューできないかコンポーネントが見つかりません</p>;
};

export default ReactComponentPreview;
