import React, { useState, useEffect, lazy, Suspense } from 'react';
import { parseFileContent } from '@/utils/codeParser';
import type { ParsedContent } from '@/utils/codeParser';
import path from 'path-browserify'; // Using path-browserify for client-side path manipulation

interface CodePreviewTabsProps {
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

// Globs for src files - these paths must be static string literals
const srcRawContentModules = import.meta.glob('/src/**/*.{html,tsx,jsx,js,ts,css,json,md}', { query: '?raw', import: 'default', eager: false });
const srcComponentModules = import.meta.glob('/src/**/*.{tsx,jsx}', { eager: false });


const CodePreviewTabs: React.FC<CodePreviewTabsProps> = ({ filePath }) => {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [parsedData, setParsedData] = useState<ParsedContent | null>(null);
  const [PreviewComponent, setPreviewComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentFileType, setCurrentFileType] = useState<string | null>(null);
  const [filename, setFilename] = useState<string>('');

  useEffect(() => {
    if (!filePath) {
      setError('File path is required.');
      return;
    }

    setFilename(filePath.split('/').pop() || filePath);
    setIsLoading(true);
    setError(null);
    setParsedData(null);
    setPreviewComponent(null);
    setCurrentFileType(null);

    const processFile = async () => {
      try {
        let rawContent: string;
        let resolvedFileType: string;
        let dynamicImportPath: string | undefined;

        const extension = path.extname(filePath).toLowerCase();
        if (['.html', '.htm'].includes(extension)) resolvedFileType = 'html';
        else if (['.tsx'].includes(extension)) resolvedFileType = 'tsx';
        else if (['.jsx'].includes(extension)) resolvedFileType = 'jsx';
        else if (['.js', '.mjs', '.cjs'].includes(extension)) resolvedFileType = 'js';
        else if (['.ts', '.mts', '.cts'].includes(extension)) resolvedFileType = 'ts';
        else if (['.css'].includes(extension)) resolvedFileType = 'css';
        else if (['.json'].includes(extension)) resolvedFileType = 'json';
        else if (['.md', '.mdx'].includes(extension)) resolvedFileType = 'md';
        else resolvedFileType = 'other';

        setCurrentFileType(resolvedFileType);
        // console.log(`[CodePreviewTabs] Processing filePath: ${filePath}, resolvedFileType: ${resolvedFileType}`);

        if (filePath.startsWith('src/')) {
          const globPath = `/${filePath}`; // Glob paths are root-relative
          // console.log(`[CodePreviewTabs] src path. globPath: ${globPath}`);

          if (srcRawContentModules[globPath]) {
            // console.log(`[CodePreviewTabs] Found raw content module for ${globPath}.`);
            const module = await srcRawContentModules[globPath]();
            rawContent = typeof module === 'string' ? module : (module as any).default;
            // console.log(`[CodePreviewTabs] Raw content for ${globPath} loaded.`);
          } else {
            // console.error(`[CodePreviewTabs] Raw content module NOT FOUND for ${globPath}. Available keys in srcRawContentModules:`, Object.keys(srcRawContentModules));
            throw new Error(`File not found in src glob (raw content): ${filePath}`);
          }

          if ((resolvedFileType === 'tsx' || resolvedFileType === 'jsx')) {
            if (srcComponentModules[globPath]) {
              // console.log(`[CodePreviewTabs] Found component module for ${globPath}.`);
              dynamicImportPath = globPath;
            } else {
              // console.warn(`[CodePreviewTabs] Component module NOT FOUND for ${globPath} in srcComponentModules. Available keys:`, Object.keys(srcComponentModules));
            }
          }
        } else if (filePath.startsWith('public/')) {
          const publicUrl = `/${filePath.substring('public/'.length)}`;
          // console.log(`[CodePreviewTabs] public path. publicUrl: ${publicUrl}`);
          const response = await fetch(publicUrl);
          // console.log(`[CodePreviewTabs] Fetch response status for ${publicUrl}: ${response.status}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch public file ${publicUrl}: ${response.statusText} (status ${response.status})`);
          }
          rawContent = await response.text();
          // console.log(`[CodePreviewTabs] Content for ${publicUrl} fetched.`);
        } else {
          throw new Error(`Unsupported file path: ${filePath}. Must start with src/ or public/`);
        }
        
        // console.log(`[CodePreviewTabs] Parsing content for ${filePath}`);
        const parsed = parseFileContent(rawContent, resolvedFileType);
        // console.log(`[CodePreviewTabs] Parsed data for ${filePath}:`, parsed);
        setParsedData(parsed);

        if (dynamicImportPath && (resolvedFileType === 'tsx' || resolvedFileType === 'jsx')) {
          const componentModule = srcComponentModules[dynamicImportPath];
          if (componentModule) {
            const LazyComponent = lazy(componentModule as () => Promise<{ default: React.ComponentType<any> }>);
            setPreviewComponent(LazyComponent);
          } else {
            // This case should ideally not be hit if srcRawContentModules found it
            console.warn(`Component module not found for ${dynamicImportPath} though raw content was.`);
          }
        }
      } catch (e: any) {
        console.error("Error in processFile:", e);
        setError(e.message || 'An unknown error occurred while processing the file.');
      } finally {
        setIsLoading(false);
      }
    };

    processFile();
  }, [filePath]);

  const renderPreview = () => {
    if (!parsedData) return <p>No content to preview.</p>;

    if (currentFileType === 'html') {
      return <div dangerouslySetInnerHTML={{ __html: parsedData.renderablePreviewContent }} />;
    }
    if ((currentFileType === 'tsx' || currentFileType === 'jsx') && PreviewComponent) {
      return (
        <ErrorBoundary fallback={<p className="text-error">⚠️ Error rendering component preview.</p>}>
          <Suspense fallback={<p>Loading preview component...</p>}>
            <PreviewComponent />
          </Suspense>
        </ErrorBoundary>
      );
    }
    if (currentFileType && ['js', 'ts', 'css', 'json', 'md', 'other'].includes(currentFileType)) {
        return <p>Preview not available for this file type. Showing code instead.</p>;
    }
    return <p>Preview not available.</p>;
  };


  if (isLoading) {
    return (
      <div className="p-4 border rounded-md shadow">
        <p>Loading {filename}...</p>
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border rounded-md shadow bg-error text-error-content">
        <p className="font-bold">Error loading file: {filename}</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!parsedData) {
    return (
        <div className="p-4 border rounded-md shadow">
            <p>No data loaded for {filename}.</p>
        </div>
    );
  }
  
  // Original return logic for tabs
  const showPreviewTab = currentFileType === 'html' || ((currentFileType === 'tsx' || currentFileType === 'jsx') && PreviewComponent);

  return (
    <div className="my-4 border rounded-md shadow-lg">
      <div className="bg-neutral text-neutral-content p-2 rounded-t-md">
        <span className="font-mono text-sm">{filename}</span>
      </div>
      <div role="tablist" className="tabs tabs-lifted">
        <a
          role="tab"
          className={`tab ${activeTab === 'code' ? 'tab-active [--tab-bg:hsl(var(--b1))] [--tab-border-color:hsl(var(--b1))]' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          Code
        </a>
        {showPreviewTab && (
          <a
            role="tab"
            className={`tab ${activeTab === 'preview' ? 'tab-active [--tab-bg:hsl(var(--b1))] [--tab-border-color:hsl(var(--b1))]' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </a>
        )}
         {!showPreviewTab && currentFileType && !['html', 'tsx', 'jsx'].includes(currentFileType) && (
            <a role="tab" className="tab tab-disabled text-opacity-50">Preview N/A</a>
        )}
      </div>

      <div className="p-1 bg-base-200 rounded-b-md">
        {activeTab === 'code' && (
          <div className="mockup-code text-sm">
            <pre><code>{parsedData?.codeForDisplay || 'No code to display.'}</code></pre>
          </div>
        )}
        {activeTab === 'preview' && showPreviewTab && (
          <div className="p-4 bg-base-100 min-h-32">
            {renderPreview()}
          </div>
        )}
         {activeTab === 'preview' && !showPreviewTab && currentFileType && !['html', 'tsx', 'jsx'].includes(currentFileType) && (
            <div className="p-4 bg-base-100 min-h-32">
                <p>Preview not available for {currentFileType} files. Showing code instead.</p>
                 <div className="mockup-code text-sm mt-2">
                    <pre><code>{parsedData?.codeForDisplay || 'No code to display.'}</code></pre>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default CodePreviewTabs;
