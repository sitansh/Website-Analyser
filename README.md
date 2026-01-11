### Overview
An interactive web-based mentor platform designed for college students working on a Python-based Website Performance Analyzer project. This React/TypeScript application provides a comprehensive learning and presentation environment for MCA, B.Tech, and BE students completing their final year projects.

### Key Features

- **📊 Interactive Simulator**: AI-powered website performance analysis simulator using Google Gemini AI that mimics Python backend functionality
- **💻 Source Code Viewer**: Complete Python project source code with syntax highlighting and detailed explanations
- **📈 Data Visualization**: Interactive charts and graphs using Recharts library
- **📝 Presentation Tools**: Ready-made presentation slides for project demonstrations
- **🎓 Viva Preparation**: Comprehensive Q&A section with common viva questions and expert answers
- **📤 Batch Processing**: Upload CSV files to analyze multiple URLs simultaneously
- **📊 Export Functionality**: Download analysis results as CSV or Excel files
- **🤖 AI Mentor**: Ask technical questions and get instant guidance powered by Gemini AI

### Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Libraries**: Tailwind CSS, Recharts
- **AI Integration**: Google Gemini AI (@google/genai)
- **Data Processing**: XLSX.js for Excel/CSV handling
- **Architecture**: Component-based React architecture

### Use Cases

- College students working on final year projects
- Project mentors and instructors
- Learning Python, API integration, and data analysis
- Preparing for project presentations and vivas

### Project Structure

The application showcases a complete Python project structure including:
- `main.py` - Entry point and orchestration
- `api_client.py` - Google PageSpeed Insights API integration
- `analyzer.py` - Pandas-based data processing
- `visualizer.py` - Matplotlib visualization generation
- `reporter.py` - CSV/Excel export functionality

### Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Google Gemini API key in `.env.local`
4. Run the development server: `npm run dev`

---

## Suggested GitHub Topics/Tags

```
react typescript python-project mentor-platform college-project 
website-performance-analyzer gemini-ai data-visualization 
educational-software mca-project btech-project
```


## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
