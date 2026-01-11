
import React, { useState } from 'react';
import { PYTHON_PROJECT_CODE } from '../constants';

const CodeViewer: React.FC = () => {
  const [activeFile, setActiveFile] = useState(PYTHON_PROJECT_CODE[0]);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
      {/* File Sidebar */}
      <div className="w-full lg:w-64 bg-slate-800 border-b lg:border-b-0 lg:border-r border-slate-700 p-4">
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Project Files</h3>
        <nav className="space-y-1">
          {PYTHON_PROJECT_CODE.map((file) => (
            <button
              key={file.name}
              onClick={() => setActiveFile(file)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeFile.name === file.name
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              <i className={`fa-solid ${file.name.endsWith('.py') ? 'fa-file-code' : 'fa-file-lines'} mr-2`}></i>
              {file.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Code Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-6 py-3 bg-slate-800 border-b border-slate-700">
          <div>
            <span className="text-slate-200 font-mono text-sm">{activeFile.name}</span>
            <p className="text-slate-500 text-xs mt-0.5">{activeFile.description}</p>
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium rounded transition-all"
          >
            <i className={`fa-solid ${copied ? 'fa-check text-green-400' : 'fa-copy'}`}></i>
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
        <div className="flex-1 overflow-auto p-6 font-mono text-sm text-slate-300 leading-relaxed bg-slate-900 scrollbar-thin scrollbar-thumb-slate-700">
          <pre><code>{activeFile.content}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default CodeViewer;
