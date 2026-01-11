
import { PythonFile } from './types';

export const PYTHON_PROJECT_CODE: PythonFile[] = [
  {
    name: 'main.py',
    description: 'The primary entry point of the application handling user input and orchestration.',
    language: 'python',
    content: `"""
Website Performance Analyzer - Main Entry Point
Version: 1.0
Author: Python Project Mentor
"""

import sys
from api_client import fetch_performance_data
from analyzer import process_and_analyze
from visualizer import generate_charts
from reporter import export_reports, print_viva_summary

def main():
    print("="*50)
    print("   WELCOME TO WEBSITE PERFORMANCE ANALYZER")
    print("="*50)
    
    # 1. Accept Inputs
    target_url = input("\\nEnter Website URL (e.g., https://google.com): ").strip()
    if not target_url.startswith('http'):
        print("Error: Invalid URL format. Please include http:// or https://")
        return

    api_key = input("Enter Google PageSpeed Insights API Key: ").strip()
    if not api_key:
        print("Error: API Key is required.")
        return

    print(f"\\n[*] Initiating analysis for: {target_url}...")

    # 2. Data Collection
    try:
        raw_data = fetch_performance_data(target_url, api_key)
        
        # 3. Data Processing
        df = process_and_analyze(raw_data, target_url)
        
        # 4. Visualization
        generate_charts(df)
        
        # 5. Reporting
        export_reports(df)
        print_viva_summary(df)
        
        print("\\n[+] Project execution completed successfully!")
        print("[+] Check the current directory for 'performance_report.csv' and 'performance_report.xlsx'")

    except Exception as e:
        print(f"\\n[!] Critical Error: {str(e)}")

if __name__ == "__main__":
    main()
`
  },
  {
    name: 'api_client.py',
    description: 'Handles interaction with the Google PageSpeed Insights API.',
    language: 'python',
    content: `import requests

def fetch_performance_data(url, api_key):
    """
    Calls Google PageSpeed Insights API to fetch Lighthouse metrics.
    """
    base_url = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
    params = {
        'url': url,
        'key': api_key,
        'category': 'performance'
    }
    
    response = requests.get(base_url, params=params)
    
    # Check for HTTP errors
    if response.status_code != 200:
        raise Exception(f"API Request Failed: {response.json().get('error', {}).get('message', 'Unknown error')}")
        
    return response.json()
`
  },
  {
    name: 'analyzer.py',
    description: 'Data cleaning and processing using Pandas.',
    language: 'python',
    content: `import pandas as pd
from datetime import datetime

def process_and_analyze(json_data, url):
    """
    Extracts metrics from JSON and processes them into a Pandas DataFrame.
    """
    # Extracting core metrics from the nested JSON structure
    lighthouse = json_data.get('lighthouseResult', {})
    audits = lighthouse.get('audits', {})
    
    metrics = {
        'URL': [url],
        'Timestamp': [datetime.now().strftime("%Y-%m-%d %H:%M:%S")],
        'Performance_Score': [lighthouse.get('categories', {}).get('performance', {}).get('score', 0) * 100],
        'FCP_ms': [audits.get('first-contentful-paint', {}).get('numericValue', 0)],
        'LCP_ms': [audits.get('largest-contentful-paint', {}).get('numericValue', 0)],
        'TBT_ms': [audits.get('total-blocking-time', {}).get('numericValue', 0)],
        'Speed_Index_ms': [audits.get('speed-index', {}).get('numericValue', 0)]
    }
    
    # Creating DataFrame
    df = pd.DataFrame(metrics)
    
    # Cleaning Data
    df.dropna(inplace=True) # Remove nulls
    df.drop_duplicates(inplace=True) # Remove duplicates
    
    # Adding Analysis: Status based on Performance Score
    # Threshold: Score < 50 is Slow, 50-89 is Average, 90+ is Good
    df['Status'] = df['Performance_Score'].apply(
        lambda x: 'Good' if x >= 90 else ('Average' if x >= 50 else 'Slow')
    )
    
    return df
`
  },
  {
    name: 'visualizer.py',
    description: 'Generates visualizations using Matplotlib.',
    language: 'python',
    content: `import matplotlib.pyplot as plt
import seaborn as sns

def generate_charts(df):
    """
    Creates visual reports of the performance data.
    """
    plt.style.use('ggplot')
    
    # Create a figure with two subplots
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))
    
    # 1. Bar Chart for Performance Score
    sns.barplot(x='URL', y='Performance_Score', data=df, ax=ax1, palette='viridis')
    ax1.set_title('Website Performance Score (0-100)')
    ax1.set_ylim(0, 100)
    
    # 2. Grouped Bar Chart for Load Times
    load_times = df[['FCP_ms', 'LCP_ms', 'Speed_Index_ms']].melt(var_name='Metric', value_name='Time_ms')
    sns.barplot(x='Metric', y='Time_ms', data=load_times, ax=ax2, palette='magma')
    ax2.set_title('Core Web Vitals Comparison (ms)')
    
    plt.tight_layout()
    plt.savefig('performance_visuals.png')
    print("[*] Charts generated and saved as 'performance_visuals.png'")
`
  },
  {
    name: 'reporter.py',
    description: 'Handles file exporting and console reporting.',
    language: 'python',
    content: `def export_reports(df):
    """
    Exports the DataFrame to CSV and Excel formats.
    """
    df.to_csv('performance_report.csv', index=False)
    df.to_excel('performance_report.xlsx', index=False)
    print("[*] Data exported to CSV and Excel.")

def print_viva_summary(df):
    """
    Prints a professional summary for the project Viva/Presentation.
    """
    row = df.iloc[0]
    print("\\n" + "="*50)
    print("      COLLEGE PROJECT: VIVA SUMMARY REPORT")
    print("="*50)
    print(f"Target Website   : {row['URL']}")
    print(f"Overall Score    : {row['Performance_Score']}%")
    print(f"Loading Status   : {row['Status']}")
    print("-" * 50)
    print(f"FCP (First Paint): {row['FCP_ms']:.2f} ms")
    print(f"LCP (Main Load)  : {row['LCP_ms']:.2f} ms")
    print(f"TBT (Block Time) : {row['TBT_ms']:.2f} ms")
    print("="*50)
`
  },
  {
    name: 'requirements.txt',
    description: 'Lists the necessary Python libraries for the project.',
    language: 'text',
    content: `requests==2.31.0
pandas==2.1.0
matplotlib==3.8.0
seaborn==0.13.0
openpyxl==3.1.2`
  }
];

export const VIVA_QUESTIONS = [
  {
    q: "Why did you use Pandas for this project?",
    a: "Pandas is chosen for its efficient data handling capabilities. It allows us to easily transform JSON responses into structured DataFrames, perform automated cleaning (like removing duplicates or nulls), and calculate statistical metrics without complex loops."
  },
  {
    q: "Explain the difference between FCP and LCP.",
    a: "First Contentful Paint (FCP) measures how long it takes for the first bit of content to appear on the screen. Largest Contentful Paint (LCP) measures when the main, largest content element (like a hero image) is fully rendered. LCP is usually the more accurate user-perceived load time."
  },
  {
    q: "How does the PageSpeed Insights API work?",
    a: "It's a REST API from Google that runs a Lighthouse audit against a URL. It returns a massive JSON object containing performance scores and detailed 'audits' for various metrics."
  },
  {
    q: "How could this project be extended?",
    a: "We could add multi-URL comparison, historical trend tracking using a SQLite database, or even an automated email alert system when a website's score drops below a threshold."
  }
];
