
import React, { useState, useRef } from 'react';
import { simulateAnalysis } from '../services/geminiService';
import { AnalysisResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import * as XLSX from 'xlsx';

const Simulator: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [batchResults, setBatchResults] = useState<AnalysisResult[]>([]);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });
  const [isBatchMode, setIsBatchMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setIsBatchMode(false);
    const data = await simulateAnalysis(url);
    setResult(data);
    setBatchResults([data]);
    setLoading(false);
  };

  const processBatch = async (urls: string[]) => {
    setLoading(true);
    setIsBatchMode(true);
    setResult(null);
    setBatchResults([]);
    setBatchProgress({ current: 0, total: urls.length });

    const results: AnalysisResult[] = [];
    for (let i = 0; i < urls.length; i++) {
      const currentUrl = urls[i].trim();
      if (!currentUrl) continue;
      
      setBatchProgress(prev => ({ ...prev, current: i + 1 }));
      const data = await simulateAnalysis(currentUrl);
      results.push(data);
      // Brief delay to simulate network/processing time
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setBatchResults(results);
    setLoading(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      // Basic CSV parsing: split by newlines and commas
      const urls = text.split(/\r?\n/).map(line => line.split(',')[0].trim()).filter(u => u && u.startsWith('http'));
      if (urls.length > 0) {
        processBatch(urls);
      } else {
        alert("No valid URLs found in file. Ensure file contains URLs starting with http/https.");
      }
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadReport = (type: 'csv' | 'xlsx') => {
    const dataToExport = batchResults.map(r => ({
      URL: r.url,
      'Performance Score': r.performanceScore,
      FCP: r.fcp,
      LCP: r.lcp,
      TBT: r.tbt,
      'Speed Index': r.speedIndex,
      Timestamp: r.timestamp,
      Advice: r.advice
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Performance Report");

    if (type === 'csv') {
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `performance_report_${new Date().getTime()}.csv`;
      link.click();
    } else {
      XLSX.writeFile(workbook, `performance_report_${new Date().getTime()}.xlsx`);
    }
  };

  const currentResult = batchResults.length > 0 ? batchResults[batchResults.length - 1] : result;

  const chartData = currentResult ? [
    { name: 'FCP', val: parseInt(currentResult.fcp) || 0 },
    { name: 'LCP', val: parseInt(currentResult.lcp) || 0 },
    { name: 'TBT', val: parseInt(currentResult.tbt) || 0 },
    { name: 'Speed Index', val: parseInt(currentResult.speedIndex) || 0 },
  ] : [];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Simulation Input Area */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <i className="fa-solid fa-flask"></i>
            </div>
            Script Simulator
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-file-upload"></i>
              Bulk Upload (CSV)
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept=".csv" 
              className="hidden" 
            />
          </div>
        </div>

        <p className="text-slate-600 mb-8 leading-relaxed">
          Mimic the Python backend orchestration. Enter a single URL or upload a CSV file with multiple URLs to see how the analyzer cleans data and generates reports.
        </p>

        <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="https://example-university.edu"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-slate-50 font-medium"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 min-w-[180px]"
          >
            {loading && !isBatchMode ? (
              <><i className="fa-solid fa-circle-notch animate-spin"></i> Analyzing...</>
            ) : (
              'Run Analysis'
            )}
          </button>
        </form>

        {loading && isBatchMode && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Processing Batch...</span>
              <span className="text-sm font-mono text-slate-500">{batchProgress.current} / {batchProgress.total}</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="h-full bg-blue-600 transition-all duration-300" 
                style={{ width: `${(batchProgress.current / batchProgress.total) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Results & Actions Area */}
      {batchResults.length > 0 && !loading && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Analysis Complete</h3>
              <p className="text-slate-400 text-sm">Processed {batchResults.length} URL(s). Reports are ready for local export.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => downloadReport('csv')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2 border border-white/10"
              >
                <i className="fa-solid fa-file-csv"></i> Download CSV
              </button>
              <button 
                onClick={() => downloadReport('xlsx')}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/20"
              >
                <i className="fa-solid fa-file-excel"></i> Export Excel
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Detailed Stats */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                <i className="fa-solid fa-list-check text-blue-600"></i> Performance Summary
              </h3>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                {batchResults.map((r, idx) => (
                  <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div className="truncate pr-4">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-tighter truncate max-w-[200px]">{r.url}</p>
                        <p className="text-slate-900 font-bold text-sm mt-1">{r.timestamp}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-widest ${
                        r.performanceScore >= 90 ? 'bg-emerald-100 text-emerald-700' : 
                        r.performanceScore >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {r.performanceScore >= 90 ? 'GOOD' : r.performanceScore >= 50 ? 'AVG' : 'POOR'}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                       <div className="text-center bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Score</p>
                          <p className="font-black text-blue-600">{r.performanceScore}</p>
                       </div>
                       <div className="text-center bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">FCP</p>
                          <p className="font-bold text-slate-700 text-xs">{r.fcp}</p>
                       </div>
                       <div className="text-center bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">LCP</p>
                          <p className="font-bold text-slate-700 text-xs">{r.lcp}</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visualizer Mock */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
              <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                <i className="fa-solid fa-chart-simple text-purple-600"></i> Python Visualizer Output
              </h3>
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} 
                    />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                    />
                    <Bar dataKey="val" radius={[8, 8, 0, 0]} barSize={40}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'][index % 4]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Refined Mentor Analysis UI matching the screenshot aesthetics */}
              <div className="mt-6 p-7 bg-[#f0f7ff] rounded-2xl border border-[#d1e9ff] relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-full bg-[#4a90e2] flex items-center justify-center">
                      <i className="fa-solid fa-brain text-white text-[10px]"></i>
                    </div>
                    <p className="text-[12px] font-bold text-[#4a90e2] uppercase tracking-[0.12em]">
                      MENTOR ANALYSIS
                    </p>
                  </div>
                  <p className="text-[15px] text-[#34495e] leading-[1.6] font-medium italic">
                    {currentResult?.advice || "Analyzing website performance data to generate actionable developer insights..."}
                  </p>
                </div>
                {/* Large faint quote mark decoration in bottom right corner */}
                <i className="fa-solid fa-quote-right absolute -right-4 -bottom-6 text-[110px] text-[#e3f0ff] pointer-events-none opacity-90"></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Simulator;
