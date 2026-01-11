
import React, { useState } from 'react';

// Custom Logo Component mimicking the official SRM Chennai Ramapuram branding from the PDF
const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-start gap-3 p-3 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 ${className}`}>
    <div className="flex items-center gap-2">
      <div className="w-12 h-12 flex items-center justify-center p-1">
        <img 
          src="https://www.srmist.edu.in/wp-content/uploads/2022/09/srm-logo.png" 
          alt="SRM Logo" 
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      <div className="flex flex-col">
        <div className="bg-[#1e40af] text-white text-[9px] font-black px-2 py-0.5 rounded-sm tracking-widest uppercase mb-1">
          Chennai Ramapuram
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-[#1e40af] font-black text-2xl leading-none">SRM</span>
          <span className="text-[7px] text-slate-500 font-bold uppercase leading-tight">Institute of Science & Technology</span>
        </div>
        <span className="text-[6px] text-slate-400 font-medium leading-none mt-0.5 italic">(Deemed to be University u/s 3 of UGC Act, 1956)</span>
      </div>
    </div>
  </div>
);

const slides = [
  {
    id: 1,
    title: "Title Page",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center py-6">
        <Logo className="mb-12 scale-125" />
        <div className="h-px w-64 bg-slate-200 mb-10"></div>
        <h1 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-4 font-serif">
          WEBSITE PERFORMANCE<br/>
          <span className="text-blue-600">ANALYSIS WITH PYTHON</span>
        </h1>
        <div className="h-px w-64 bg-slate-200 mt-10 mb-16"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl mt-auto">
          <div className="text-left bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">Guided By:</h3>
            <p className="text-2xl font-black text-slate-800">MR. K. BALAJI</p>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Assistant Professor</p>
            <p className="text-sm text-slate-400 font-medium italic">Department of MCA</p>
          </div>
          <div className="text-right bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">Presented By:</h3>
            <p className="text-2xl font-black text-slate-800">RACHNA RANI</p>
            <p className="text-sm font-mono text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full inline-block mt-1">[RA2432241020183]</p>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-2">II MCA – “B”</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Abstract",
    content: (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-start mb-10 border-b border-slate-100 pb-8">
          <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4">
            <span className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg">01</span>
            ABSTRACT
          </h2>
          <Logo className="scale-75 origin-top-right" />
        </div>
        <div className="flex-1 overflow-y-auto pr-6 space-y-6 text-lg text-slate-700 leading-relaxed font-medium">
          <p className="first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-blue-600">
            The website <span className="text-blue-700 font-bold">"Website Performance Analyzer"</span> uses Pandas to manage and analyze key performance metrics like load time, response time, and HTTP status codes.
          </p>
          <div className="p-6 bg-slate-50 rounded-2xl border-l-8 border-blue-600">
             The collected data is organized in structured DataFrames, making it easy to clean using methods like <code className="bg-white px-2 py-0.5 rounded text-blue-600 font-bold">dropna()</code> and <code className="bg-white px-2 py-0.5 rounded text-blue-600 font-bold">drop_duplicates()</code>. 
          </div>
          <p>
            Pandas also helps calculate important statistics such as mean, max, and median to assess the site’s behavior under different conditions. Features like <code className="text-blue-600 font-bold">groupby()</code> allow segmentation by page URL or user type.
          </p>
          <p>
            Additionally, Pandas is used in combination with visualization libraries like <span className="font-bold">Matplotlib and Seaborn</span> to present response time trends and traffic peaks visually. The final results can be exported to <span className="text-emerald-600 font-bold">.csv or .xlsx</span> files for reporting purposes.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Feasibility Study",
    content: (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-start mb-10 border-b border-slate-100 pb-8">
          <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4">
            <span className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg">02</span>
            FEASIBILITY STUDY
          </h2>
          <Logo className="scale-75 origin-top-right" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-1">
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
               <h4 className="text-xl font-black text-blue-900 mb-3 flex items-center gap-2">
                 <i className="fa-solid fa-microchip"></i> Technical
               </h4>
               <p className="text-slate-600 leading-relaxed">Python offers robust support for data handling and analysis through libraries like Pandas, Requests, and BeautifulSoup, enabling seamless data collection and interpretation. Minimal system requirements make it deployable on standard computers.</p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
               <h4 className="text-xl font-black text-emerald-900 mb-3 flex items-center gap-2">
                 <i className="fa-solid fa-coins"></i> Economic
               </h4>
               <p className="text-slate-600 leading-relaxed">Highly cost-effective as it relies on open-source technologies and doesn't demand high-end infrastructure. It adds value by helping businesses monitor their sites real-time behavior.</p>
            </div>
          </div>
          <div className="bg-slate-900 rounded-[40px] p-10 text-white flex flex-col justify-center relative overflow-hidden">
             <i className="fa-solid fa-chart-line absolute -right-10 -bottom-10 text-[200px] text-white/5"></i>
             <h4 className="text-xl font-black mb-6 flex items-center gap-2">
                <i className="fa-solid fa-users-gear text-blue-400"></i> Operational
             </h4>
             <p className="text-slate-300 text-lg leading-relaxed italic">
               "The tool can be used by both technical and non-technical users with minimal training, increasing its adaptability across teams. This makes the Website Performance Analyzer impactful in real-world applications."
             </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Existing System",
    content: (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-start mb-10 border-b border-slate-100 pb-8">
          <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4">
            <span className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg">03</span>
            EXISTING SYSTEM
          </h2>
          <Logo className="scale-75 origin-top-right" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-1 items-center">
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
               <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-rose-200">
                  <i className="fa-solid fa-hourglass-half text-2xl"></i>
               </div>
               <div>
                  <h4 className="text-2xl font-black text-slate-800 mb-2">Manual Process</h4>
                  <p className="text-slate-500 text-lg">Users need to manually input URLs or navigate through complex interfaces like GTmetrix or PageSpeed Insights UI to extract required data.</p>
               </div>
            </div>
            <div className="flex gap-6 items-start">
               <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-rose-200">
                  <i className="fa-solid fa-puzzle-piece text-2xl"></i>
               </div>
               <div>
                  <h4 className="text-2xl font-black text-slate-800 mb-2">Limited Customization</h4>
                  <p className="text-slate-500 text-lg">Existing systems lack flexibility for developers who wish to automate performance testing and generate custom, brandable reports.</p>
               </div>
            </div>
          </div>
          <div className="bg-rose-50 rounded-[40px] p-10 border border-rose-100">
             <h4 className="text-xl font-black text-rose-900 mb-6 uppercase tracking-widest">Pain Points</h4>
             <ul className="space-y-4">
                {[
                  "No deep analytical integration",
                  "Hard to identify consistent issues over time",
                  "Lacks in-depth server-side evaluation",
                  "Insufficient for automated monitoring"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-rose-800 font-bold">
                     <i className="fa-solid fa-circle-xmark"></i>
                     {item}
                  </li>
                ))}
             </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Proposed System",
    content: (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-start mb-10 border-b border-slate-100 pb-8">
          <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4">
            <span className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg">04</span>
            PROPOSED SYSTEM
          </h2>
          <Logo className="scale-75 origin-top-right" />
        </div>
        <div className="bg-blue-600 rounded-[50px] p-12 text-white shadow-2xl relative overflow-hidden flex-1">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10 h-full flex flex-col justify-center max-w-4xl">
             <h3 className="text-4xl font-black mb-8 leading-tight">Automation Driven Performance Analysis</h3>
             <p className="text-xl text-blue-100 mb-10 leading-relaxed font-medium">
               The proposed system aims to develop a Python-based solution for analyzing website performance using the Google PageSpeed Insights API. It will automate data retrieval and present results in a clean, understandable format.
             </p>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: 'fa-robot', text: 'Auto Fetching' },
                  { icon: 'fa-database', text: 'Historical Logs' },
                  { icon: 'fa-chart-pie', text: 'Visual Trends' },
                  { icon: 'fa-file-export', text: 'Custom Reports' }
                ].map((item, i) => (
                  <div key={i} className="bg-white/20 backdrop-blur-md rounded-3xl p-6 text-center border border-white/20 hover:bg-white/30 transition-all">
                     <i className={`fa-solid ${item.icon} text-3xl mb-3`}></i>
                     <p className="font-bold text-xs uppercase tracking-widest">{item.text}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "Benefits",
    content: (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-start mb-10 border-b border-slate-100 pb-8">
          <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4">
            <span className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg">05</span>
            BENEFITS
          </h2>
          <Logo className="scale-75 origin-top-right" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
          {[
            { icon: 'fa-bolt', title: 'Faster Efficiency', desc: 'Provides more efficient analysis of metrics, reducing manual effort and improving accuracy.' },
            { icon: 'fa-file-circle-check', title: 'Automated Reporting', desc: 'Generation of detailed reports based on real-time data helps analysts take immediate actions.' },
            { icon: 'fa-mobile-screen', title: 'UX Understanding', desc: 'Enhances understanding by tracking load times, interactivity, and responsiveness across devices.' },
            { icon: 'fa-plug', title: 'Easy Integration', desc: 'Seamlessly works with popular Python libraries like Pandas and Matplotlib for extended handling.' }
          ].map((benefit, i) => (
            <div key={i} className="flex gap-5 bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all">
               <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                  <i className={`fa-solid ${benefit.icon} text-2xl`}></i>
               </div>
               <div>
                  <h4 className="text-xl font-black text-slate-800 mb-2">{benefit.title}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium">{benefit.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 7,
    title: "Scope",
    content: (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-start mb-10 border-b border-slate-100 pb-8">
          <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4">
            <span className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg">06</span>
            SCOPE OF THE PROJECT
          </h2>
          <Logo className="scale-75 origin-top-right" />
        </div>
        <div className="bg-slate-50 rounded-[50px] p-12 border border-slate-200 flex-1 flex flex-col justify-center">
           <div className="max-w-4xl space-y-10">
              <div className="flex gap-8 items-center">
                 <div className="w-20 h-20 bg-blue-600 text-white rounded-[30px] flex items-center justify-center shrink-0 shadow-xl shadow-blue-200">
                    <i className="fa-solid fa-expand text-3xl"></i>
                 </div>
                 <p className="text-2xl font-black text-slate-800 leading-tight">Evaluating and improving website efficiency by focusing on metrics like response delays and resource utilization.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-black">1</div>
                    <span className="font-bold text-slate-700">Support for Mobile & PWAs</span>
                 </div>
                 <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-black">2</div>
                    <span className="font-bold text-slate-700">Modular Architecture</span>
                 </div>
                 <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-black">3</div>
                    <span className="font-bold text-slate-700">AI-Based Suggestions</span>
                 </div>
                 <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-black">4</div>
                    <span className="font-bold text-slate-700">Real-time Monitoring</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 8,
    title: "System Specifications",
    content: (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-start mb-8 border-b border-slate-100 pb-6">
          <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4">
            <span className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg">07</span>
            SYSTEM SPECIFICATION
          </h2>
          <Logo className="scale-75 origin-top-right" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
          {/* Hardware Specs Table */}
          <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
             <div className="bg-slate-900 text-white px-8 py-5 flex items-center justify-between">
                <span className="font-black tracking-widest uppercase">Hardware</span>
                <i className="fa-solid fa-laptop"></i>
             </div>
             <table className="w-full text-left">
                <tbody>
                   <tr className="border-b border-slate-50"><td className="px-8 py-4 font-bold text-slate-400 text-xs uppercase">Processor</td><td className="px-8 py-4 font-black text-slate-800">Intel Core i5 or equivalent</td></tr>
                   <tr className="border-b border-slate-50"><td className="px-8 py-4 font-bold text-slate-400 text-xs uppercase">RAM</td><td className="px-8 py-4 font-black text-slate-800">16 GB (8 GB recommended)</td></tr>
                   <tr className="border-b border-slate-50"><td className="px-8 py-4 font-bold text-slate-400 text-xs uppercase">Storage</td><td className="px-8 py-4 font-black text-slate-800">10 GB free space</td></tr>
                   <tr className="border-b border-slate-50"><td className="px-8 py-4 font-bold text-slate-400 text-xs uppercase">Display</td><td className="px-8 py-4 font-black text-slate-800">13” Monitor with 1366×768</td></tr>
                   <tr><td className="px-8 py-4 font-bold text-slate-400 text-xs uppercase">Internet</td><td className="px-8 py-4 font-black text-slate-800">Stable connection for API</td></tr>
                </tbody>
             </table>
          </div>
          {/* Software Specs Table */}
          <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
             <div className="bg-blue-600 text-white px-8 py-5 flex items-center justify-between">
                <span className="font-black tracking-widest uppercase">Software</span>
                <i className="fa-solid fa-code"></i>
             </div>
             <div className="p-8 grid grid-cols-2 gap-4">
                {[
                  { label: 'OS', val: 'Windows 11' },
                  { label: 'Frontend', val: 'HTML5, CSS3, JS' },
                  { label: 'Backend', val: 'Python (Flask/FastAPI)' },
                  { label: 'Database', val: 'SQLite / PostgreSQL' },
                  { label: 'IDE', val: 'VS Code / PyCharm' },
                  { label: 'Auth', val: 'JWT / OAuth' }
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                     <p className="text-xs font-bold text-slate-800">{item.val}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 9,
    title: "Thank You",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center bg-slate-50/50 rounded-[60px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full -mr-48 -mt-48 blur-3xl opacity-50"></div>
        <Logo className="mb-12 scale-150 shadow-xl" />
        <div className="h-px w-64 bg-slate-200 mb-12"></div>
        <h2 className="text-8xl lg:text-[10rem] font-black text-slate-900 tracking-tighter mb-4 animate-in zoom-in duration-1000 animate-bounce">
          THANK <span className="text-blue-600">YOU</span>
        </h2>
        <p className="text-slate-400 font-bold tracking-[0.5em] uppercase text-xl mb-16">
          QUESTIONS & DISCUSSION
        </p>
        <div className="h-px w-64 bg-slate-200 mb-12"></div>
        <div className="flex gap-6 animate-in slide-in-from-bottom-10 duration-1000 delay-500">
           <div className="px-12 py-5 bg-slate-900 text-white rounded-[25px] font-black tracking-widest shadow-2xl hover:bg-slate-800 transition-all cursor-pointer">
             VIVA VOCE READY
           </div>
        </div>
      </div>
    )
  }
];

const Presentation: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  return (
    <div className="max-w-7xl mx-auto h-[90vh] flex flex-col">
      {/* Container */}
      <div className="flex-1 bg-white rounded-[60px] shadow-[0_35px_100px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden relative flex flex-col">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-slate-100 flex z-20">
           <div 
             className="h-full bg-blue-600 transition-all duration-700 ease-in-out" 
             style={{ width: `${((current + 1) / slides.length) * 100}%` }}
           />
        </div>

        {/* Slide Content */}
        <div className="flex-1 p-16 lg:px-24 lg:py-20 relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.03),transparent)]">
           <div key={current} className="h-full animate-in fade-in slide-in-from-bottom-10 duration-700">
              {slides[current].content}
           </div>
        </div>

        {/* Controls */}
        <div className="px-12 py-8 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex items-center justify-between z-10">
           <div className="flex items-center gap-10">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">
                   Presentation Progress
                </span>
                <span className="text-2xl font-black text-slate-900">
                   {String(current + 1).padStart(2, '0')} <span className="text-slate-200">/</span> {String(slides.length).padStart(2, '0')}
                </span>
              </div>
              <div className="h-12 w-px bg-slate-200"></div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-1">
                   Current Module
                </span>
                <span className="text-lg font-black text-slate-600 uppercase tracking-tighter">
                   {slides[current].title}
                </span>
              </div>
           </div>

           <div className="flex items-center gap-4">
              <button 
                onClick={prevSlide}
                className="w-16 h-16 rounded-[28px] bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm active:scale-95 group"
              >
                <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
              </button>
              <button 
                onClick={nextSlide}
                className="w-16 h-16 rounded-[28px] bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-all shadow-[0_15px_35px_-10px_rgba(37,99,235,0.4)] active:scale-95 group"
              >
                <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
           </div>
        </div>
      </div>
      
      {/* Visual slide navigation dots */}
      <div className="mt-8 flex justify-center gap-4">
         {slides.map((_, idx) => (
           <button 
             key={idx}
             onClick={() => setCurrent(idx)}
             className={`h-3 rounded-full transition-all duration-700 ${current === idx ? 'w-16 bg-blue-600 shadow-lg shadow-blue-200' : 'w-3 bg-slate-300 hover:bg-slate-400'}`}
             aria-label={`Go to slide ${idx + 1}`}
           />
         ))}
      </div>
    </div>
  );
};

export default Presentation;
