
import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import CodeViewer from './components/CodeViewer';
import Simulator from './components/Simulator';
import Presentation from './components/Presentation';
import { VIVA_QUESTIONS } from './constants';
import { getMentorAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.PROJECT_INFO);
  const [mentorChat, setMentorChat] = useState<{ q: string; a: string }[]>([]);
  const [topic, setTopic] = useState('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const handleAskMentor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    setLoadingAdvice(true);
    const advice = await getMentorAdvice(topic);
    setMentorChat([{ q: topic, a: advice }, ...mentorChat]);
    setTopic('');
    setLoadingAdvice(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
              <i className="fa-brands fa-python text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-none">Website Performance Analyzer</h1>
              <p className="text-xs text-slate-500 font-medium">Final Year College Project Mentor</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            {[
              { id: TabType.PROJECT_INFO, label: 'Overview', icon: 'fa-book-open' },
              { id: TabType.PRESENTATION, label: 'Presentation', icon: 'fa-display' },
              { id: TabType.SOURCE_CODE, label: 'Source Code', icon: 'fa-code' },
              { id: TabType.SIMULATOR, label: 'Run Simulator', icon: 'fa-play' },
              { id: TabType.VIVA_PREP, label: 'Viva Prep', icon: 'fa-graduation-cap' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <i className={`fa-solid ${tab.icon} ${activeTab === tab.id ? 'opacity-100' : 'opacity-60'}`}></i>
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === TabType.PROJECT_INFO && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 lg:p-12 text-white shadow-2xl overflow-hidden relative">
              <div className="relative z-10 max-w-2xl">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">MCA / B.Tech / BE Project</span>
                <h2 className="text-4xl lg:text-5xl font-black mt-4 mb-6 leading-tight">Build a Pro-Level Analyzer in Python</h2>
                <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                  Master API integration, data cleaning with Pandas, and automated visualization. 
                  This project demonstrates core backend skills highly valued in technical interviews.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setActiveTab(TabType.PRESENTATION)} className="px-6 py-3 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:bg-blue-50 transition-all">
                    View Presentation
                  </button>
                  <button onClick={() => setActiveTab(TabType.SOURCE_CODE)} className="px-6 py-3 bg-blue-500 text-white font-bold rounded-xl shadow-lg border border-blue-400 hover:bg-blue-400 transition-all">
                    Explore Codebase
                  </button>
                </div>
              </div>
              <i className="fa-brands fa-python absolute -right-20 -bottom-20 text-[300px] opacity-10 rotate-12 pointer-events-none"></i>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <i className="fa-solid fa-cloud-arrow-down text-xl"></i>
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Data Collection</h3>
                <p className="text-sm text-slate-600">Uses the Google PageSpeed Insights API to pull real-world lighthouse performance metrics for any URL.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                  <i className="fa-solid fa-broom text-xl"></i>
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Smart Processing</h3>
                <p className="text-sm text-slate-600">Leverages Pandas to clean datasets, remove duplicates, and perform statistical analysis on load times.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-4">
                  <i className="fa-solid fa-chart-line text-xl"></i>
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Visualization</h3>
                <p className="text-sm text-slate-600">Generates professional Matplotlib charts and exports findings to Excel and CSV automatically.</p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <i className="fa-solid fa-robot text-blue-400"></i>
                Quick Mentor Q&A
              </h3>
              <form onSubmit={handleAskMentor} className="mb-8">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Ask about pandas, requests, or visualizer logic..."
                    className="flex-1 bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                  <button
                    disabled={loadingAdvice}
                    className="px-6 py-3 bg-blue-600 rounded-xl text-sm font-bold hover:bg-blue-500 transition-all disabled:opacity-50"
                  >
                    {loadingAdvice ? 'Thinking...' : 'Ask'}
                  </button>
                </div>
              </form>
              <div className="space-y-4 max-h-64 overflow-auto scrollbar-thin">
                {mentorChat.map((chat, i) => (
                  <div key={i} className="animate-in slide-in-from-left duration-300">
                    <p className="text-blue-400 text-xs font-bold mb-1">YOU: {chat.q}</p>
                    <div className="bg-slate-800 p-4 rounded-xl text-slate-300 text-sm leading-relaxed">
                      {chat.a}
                    </div>
                  </div>
                ))}
                {mentorChat.length === 0 && (
                  <p className="text-slate-500 text-sm text-center py-4 italic">No questions yet. Try asking "How to handle API timeouts?"</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === TabType.PRESENTATION && (
          <div className="animate-in fade-in duration-500 h-full">
            <Presentation />
          </div>
        )}

        {activeTab === TabType.SOURCE_CODE && (
          <div className="h-[calc(100vh-12rem)] animate-in fade-in zoom-in-95 duration-500">
            <CodeViewer />
          </div>
        )}

        {activeTab === TabType.SIMULATOR && (
          <div className="animate-in fade-in duration-500">
            <Simulator />
          </div>
        )}

        {activeTab === TabType.VIVA_PREP && (
          <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-8 duration-500">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Crush Your Viva Voce</h2>
              <p className="text-slate-600">Be prepared for the most common questions external examiners ask during project evaluations.</p>
            </div>
            <div className="space-y-6">
              {VIVA_QUESTIONS.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 group hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                      Q{idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-3">{item.q}</h4>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                        <p className="text-sm text-slate-700 leading-relaxed italic">
                          " {item.a} "
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-lightbulb"></i>
                Pro-Tips for Presentation
              </h4>
              <ul className="space-y-3 text-sm text-indigo-800 font-medium">
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-check-circle text-indigo-400"></i>
                  Always show your 'requirements.txt' to prove you understand dependencies.
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-check-circle text-indigo-400"></i>
                  Keep the generated 'performance_report.csv' open to show the raw results.
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-check-circle text-indigo-400"></i>
                  Mention "Scalability" - explain how this can be extended to monitor entire domains.
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Python Project Mentor v1.0 • Built for College Excellence
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
