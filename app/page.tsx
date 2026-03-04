'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Scale, Shield, Zap, BookOpen, MessageSquare, CheckCircle2, Play } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setEmail('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/5">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary-foreground font-bold" />
            </div>
            <span className="text-xl font-bold">JusticeAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">Features</a>
            <a href="#capabilities" className="text-sm text-muted-foreground hover:text-foreground transition">Capabilities</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">Pricing</a>
          </div>
          <Button variant="default" size="sm">Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent">Legal Intelligence Reimagined</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-balance">
            AI-Powered Legal Analysis at Your Fingertips
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Intelligent legal research, instant document analysis, and case insights powered by advanced AI. Built for modern legal professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="gap-2">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Play className="w-4 h-4" /> Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 px-4 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm text-muted-foreground mb-8">Trusted by legal professionals worldwide</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-center">
            {['Top Law Firms', 'Legal Teams', 'Enterprises', 'Legal Tech'].map((company) => (
              <div key={company} className="text-center">
                <p className="font-semibold text-foreground">{company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Powerful Legal AI Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Contract Analysis',
                description: 'Instantly analyze contracts, identify key clauses, and flag potential risks with AI precision.'
              },
              {
                icon: BookOpen,
                title: 'Legal Research',
                description: 'Access comprehensive legal databases and case law in seconds with intelligent search.'
              },
              {
                icon: MessageSquare,
                title: 'Document Review',
                description: 'Automated document review, summarization, and intelligent Q&A for legal documents.'
              },
              {
                icon: Zap,
                title: 'Case Insights',
                description: 'Discover relevant case precedents and legal arguments instantly to strengthen your cases.'
              },
              {
                icon: Scale,
                title: 'Legal Writing',
                description: 'Generate briefs, memos, and legal documents with professional legal language and citations.'
              },
              {
                icon: CheckCircle2,
                title: 'Compliance Check',
                description: 'Ensure compliance with regulations and statutes automatically across all documents.'
              }
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition border border-border">
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-20 px-4 bg-accent/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Advanced Capabilities</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">Built with enterprise-grade security and compliance standards</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">For Individual Lawyers</h3>
              <ul className="space-y-3">
                {['Fast case research', 'Document analysis', 'Legal writing assistance', 'Citation management'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">For Law Firms</h3>
              <ul className="space-y-3">
                {['Team collaboration', 'Workflow automation', 'Billing integration', 'Enterprise security'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Transform Your Legal Practice?</h2>
          <p className="text-xl text-muted-foreground">Join hundreds of legal professionals using JusticeAI to work smarter.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <Button type="submit" disabled={isLoading} className="whitespace-nowrap">
              {isLoading ? 'Subscribing...' : 'Get Started'}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground">No credit card required. 14-day free trial.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Scale className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold">JusticeAI</span>
              </div>
              <p className="text-sm text-muted-foreground">AI-powered legal intelligence</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">About</a></li>
                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 JusticeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
