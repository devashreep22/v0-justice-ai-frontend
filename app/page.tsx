'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogOut, BarChart3, AlertCircle, FileText, Zap } from 'lucide-react';

const caseCategories = [
  'Harassment',
  'Cyber Crime',
  'Theft',
  'Domestic Violence',
  'Corruption'
];

const stats = [
  { label: 'Cases Solved', value: '2,547', icon: '✓' },
  { label: 'Cases In Progress', value: '483', icon: '⏳' },
  { label: 'Cases Registered', value: '5,230', icon: '📋' }
];

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [caseDescription, setCaseDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!caseDescription.trim() || !selectedCategory) {
      alert('Please select a category and describe your case');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult(
        `Analysis for ${selectedCategory} case:\n\nBased on your description, here are the key points:\n\n1. Initial Assessment: Your case has been categorized as ${selectedCategory}\n\n2. Next Steps:\n   - Gather supporting evidence\n   - Document all incidents with dates and times\n   - Preserve any communications\n   - Consult with a legal professional\n\n3. Recommended Actions:\n   - File official complaint if applicable\n   - Document impact and damages\n   - Review relevant laws and statutes\n   - Consider legal representation\n\nPlease note: This is an AI-assisted analysis and not a substitute for professional legal advice.`
      );
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setCaseDescription('');
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-primary">JusticeAI</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm font-medium text-foreground hover:text-primary transition">Home</a>
              <a href="#file-case" className="text-sm font-medium text-muted-foreground hover:text-primary transition">File Case</a>
              <a href="#analysis" className="text-sm font-medium text-muted-foreground hover:text-primary transition">AI Analysis</a>
              <a href="#my-cases" className="text-sm font-medium text-muted-foreground hover:text-primary transition">My Cases</a>
            </div>

            <Button variant="outline" size="sm" className="gap-2">
              <LogOut className="w-4 h-4" />
              Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-16 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            AI Powered Legal Complaint Assistant
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            File complaints and analyze legal cases instantly.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6 border border-border">
                <div className="text-center">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section id="file-case" className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - File a Case */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">File a Case</h2>
              <Card className="p-6 border border-border">
                <p className="text-sm text-muted-foreground mb-4">Select the category of your case:</p>
                <div className="space-y-3">
                  {caseCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full py-3 px-4 rounded-lg border-2 font-medium transition text-left ${
                        selectedCategory === category
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background text-foreground hover:border-primary/50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </Card>
              {selectedCategory && (
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg flex gap-3">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{selectedCategory}</span> selected. Now describe your case in detail.
                  </p>
                </div>
              )}
            </div>

            {/* Right Side - Describe Case */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Describe Your Case</h2>
              <Card className="p-6 border border-border space-y-4">
                <textarea
                  value={caseDescription}
                  onChange={(e) => setCaseDescription(e.target.value)}
                  placeholder="Provide detailed information about your case. Include dates, people involved, and what happened..."
                  className="w-full h-40 p-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder-muted-foreground resize-none"
                />
                <div className="flex gap-3">
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !caseDescription.trim() || !selectedCategory}
                    className="flex-1 gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="px-6"
                  >
                    Clear
                  </Button>
                </div>
              </Card>

              {/* Result Card */}
              {analysisResult && (
                <Card className="p-6 border border-border bg-primary/5 space-y-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <h3 className="font-semibold text-foreground">AI Analysis Result</h3>
                  </div>
                  <div className="bg-background p-4 rounded-lg border border-border">
                    <p className="text-sm text-foreground whitespace-pre-wrap">{analysisResult}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ⚠️ Disclaimer: This analysis is AI-generated and should not be considered as legal advice. Please consult with a qualified lawyer.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 bg-background mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2024 JusticeAI. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </footer>
    </div>
  );
}
