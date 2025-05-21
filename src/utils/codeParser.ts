export interface ParsedContent {
  codeForDisplay: string;
  renderablePreviewContent: string; // For HTML, this is what's rendered. For TSX, this might be adjusted code or original.
  originalPreviewCode: string; // Code used for preview before `// ignore render` is processed, useful for TSX.
}

const LANG_COMMENTS: Record<string, { single: string; blockStart: string; blockEnd: string }> = {
  html: { single: '<!--', blockStart: '<!--', blockEnd: '-->' },
  css: { single: '/\\*', blockStart: '/\\*', blockEnd: '\\*/' },
  js: { single: '//', blockStart: '/\\*', blockEnd: '\\*/' },
  ts: { single: '//', blockStart: '/\\*', blockEnd: '\\*/' },
  jsx: { single: '//', blockStart: '{/\\*', blockEnd: '\\*/}' }, // JSX comments are tricky, often like JS
  tsx: { single: '//', blockStart: '{/\\*', blockEnd: '\\*/}' }, // TSX comments are tricky, often like TS
};

function getCommentRegex(fileType: string, type: 'single' | 'blockStart' | 'blockEnd'): string {
  const lang = LANG_COMMENTS[fileType] || LANG_COMMENTS.js; // Default to JS style
  return type === 'single' ? lang.single : type === 'blockStart' ? lang.blockStart : lang.blockEnd;
}

export function parseFileContent(rawContent: string, fileType: string): ParsedContent {
  // Normalize line endings to \n first
  let content = rawContent.replace(/\r\n/g, '\n');

  const singleComment = getCommentRegex(fileType, 'single');
  const blockCommentStart = getCommentRegex(fileType, 'blockStart');
  const blockCommentEnd = getCommentRegex(fileType, 'blockEnd');

  // Regex for start/end markers (single line and block comments)
  // For HTML: <!-- start --> ... <!-- end -->
  // For JS/TS/JSX/TSX: // start ... // end  OR  /* start */ ... /* end */ OR {/* start */} ... {/* end */}
  
  // Simplified start/end extraction:
  // Look for // start or /* start */ or <!-- start -->
  // Look for // end or /* end */ or <!-- end -->

  const startRegex = new RegExp(
    `(?:${singleComment}\\s*start\\s*(?:${blockCommentEnd.replace(/\\/g, '\\\\')}|\n|$))|` + // single line: // start OR <!-- start -->
    `(?:${blockCommentStart}\\s*start\\s*${blockCommentEnd.replace(/\\/g, '\\\\')})`, // block: /* start */ OR {/* start */}
    'ims'
  );
  const endRegex = new RegExp(
    `(?:${singleComment}\\s*end\\s*(?:${blockCommentEnd.replace(/\\/g, '\\\\')}|\n|$))|` +
    `(?:${blockCommentStart}\\s*end\\s*${blockCommentEnd.replace(/\\/g, '\\\\')})`,
    'ims'
  );

  const startIndexMatch = content.match(startRegex);
  const endIndexMatch = content.match(endRegex);

  if (startIndexMatch && endIndexMatch && startIndexMatch.index !== undefined && endIndexMatch.index !== undefined && endIndexMatch.index > startIndexMatch.index) {
    content = content.substring(startIndexMatch.index + startIndexMatch[0].length, endIndexMatch.index).trim();
  }
  
  // Regex for ignoreStart/ignoreEnd markers
  // This pattern will find an ignoreStart, then non-greedily match anything until an ignoreEnd.
  const ignoreBlockPattern = new RegExp(
    // Start of ignore block (ignoreStart comment)
    `(?:${singleComment}\\s*ignoreStart\\s*(?:${blockCommentEnd.replace(/\\/g, '\\\\')}|\\n|$)|${blockCommentStart}\\s*ignoreStart\\s*${blockCommentEnd.replace(/\\/g, '\\\\')})` +
    // Content within the ignore block (match anything, non-greedily)
    `[\\s\\S]*?` +
    // End of ignore block (ignoreEnd comment)
    `(?:${singleComment}\\s*ignoreEnd\\s*(?:${blockCommentEnd.replace(/\\/g, '\\\\')}|\\n|$)|${blockCommentStart}\\s*ignoreEnd\\s*${blockCommentEnd.replace(/\\/g, '\\\\')})`,
    'img' // i: case-insensitive, m: multiline for ^ and $, g: global for multiple replacements
  );
  content = content.replace(ignoreBlockPattern, '').trim();

  const codeForDisplay = content;
  // originalPreviewCode should also have ignore blocks removed.
  // The distinction between codeForDisplay and originalPreviewCode was primarily for `// ignore render`
  // If `// ignore render` is meant to affect TSX preview (which is hard with dynamic imports),
  // then originalPreviewCode would need more complex handling.
  // For now, let's assume originalPreviewCode is the same as codeForDisplay before `// ignore render` processing.
  let originalPreviewCode = codeForDisplay;

  // Handle "// ignore render" for renderablePreviewContent
  // This specifically removes the line *after* the comment for the preview.
  const lines = content.split('\n');
  const renderableLines: string[] = [];
  let skipNextLine = false;
  const ignoreRenderMarker = "// ignore render";

  for (const line of lines) {
    const trimmedLine = line.trim();
    let isIgnoreRenderCommentLine = false;

    if (fileType === 'html') {
      if (trimmedLine.startsWith('<!--') && trimmedLine.endsWith('-->') && trimmedLine.includes(ignoreRenderMarker)) {
        isIgnoreRenderCommentLine = true;
      }
    } else if (['js', 'ts', 'jsx', 'tsx', 'css'].includes(fileType)) { // Added css, though less common for this
      // Standard single line comment check
      if (trimmedLine.startsWith(singleComment) && trimmedLine.substring(singleComment.length).trim().startsWith(ignoreRenderMarker)) {
         isIgnoreRenderCommentLine = true;
      }
      // Standard block comment check (if applicable and contains the marker)
      // This check is simplified; a true block comment check would be more involved
      // For now, focusing on single-line style containing the marker.
      // A more robust check for block comments:
      // if (trimmedLine.startsWith(blockCommentStart) && trimmedLine.endsWith(blockCommentEnd) && trimmedLine.includes(ignoreRenderMarker)) {
      // isIgnoreRenderCommentLine = true;
      // }
      // For JSX/TSX style block comments:
      // else if (fileType === 'jsx' || fileType === 'tsx') {
      // if (trimmedLine.startsWith('{/*') && trimmedLine.endsWith('*/}') && trimmedLine.includes(ignoreRenderMarker)) {
      // isIgnoreRenderCommentLine = true;
      // }
      // }
    }

    if (isIgnoreRenderCommentLine) {
      skipNextLine = true;
      renderableLines.push(line); // The comment line itself is kept in renderable content
    } else if (skipNextLine) {
      skipNextLine = false;
      // This line is skipped for renderablePreviewContent
    } else {
      renderableLines.push(line);
    }
  }
  const renderablePreviewContent = renderableLines.join('\n');

  const result = {
    codeForDisplay,
    renderablePreviewContent,
    originalPreviewCode
  };
  console.log(`[codeParser] For fileType: ${fileType}`);
  console.log(`[codeParser] Input raw content length: ${rawContent.length}`);
  // console.log(`[codeParser] Content after start/end processing length: ${content.length}`); // 'content' here is after start/end and ignore block processing
  console.log(`[codeParser] codeForDisplay length: ${result.codeForDisplay.length}`);
  console.log(`[codeParser] renderablePreviewContent length: ${result.renderablePreviewContent.length}`);
  console.log(`[codeParser] originalPreviewCode length: ${result.originalPreviewCode.length}`);
  return result;
}
