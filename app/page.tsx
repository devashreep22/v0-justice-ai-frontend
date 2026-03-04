'use client'

import { useState, useEffect } from 'react'
import { 
  Scale, Menu, X, ArrowRight, FileText, Users, Award, 
  Phone, MessageSquare, AlertCircle, Shield, Briefcase,
  Heart, AlertTriangle, Lock, BarChart3, Zap, Eye, CheckCircle
} from 'lucide-react'
import Link from 'next/link'

// Animated Pie Chart Component
interface PieChartProps {
  solved: number
  unsolved: number
  registered: number
  label: string
}

const AnimatedPieChart = ({ solved, unsolved, registered, label }: PieChartProps) => {
  const [animatedSolved, setAnimatedSolved] = useState(0)
  const [animatedUnsolved, setAnimatedUnsolved] = useState(0)
  const [animatedRegistered, setAnimatedRegistered] = useState(0)

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimatedSolved(solved), 100)
    const timer2 = setTimeout(() => setAnimatedUnsolved(unsolved), 200)
    const timer3 = setTimeout(() => setAnimatedRegistered(registered), 300)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [solved, unsolved, registered])

  const total = solved + unsolved + registered
  const solvedPercent = (solved / total) * 100
  const unsolvedPercent = (unsolved / total) * 100
  const registeredPercent = (registered / total) * 100

  const getCirclePath = (percentage: number, offset: number) => {
    const radius = 45
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (circumference * percentage) / 100
    return { circumference, strokeDashoffset }
  }

  const solvedPath = getCirclePath(solvedPercent, 0)
  const unsolvedPath = getCirclePath(unsolvedPercent, solvedPercent)
  const registeredPath = getCirclePath(registeredPercent, solvedPercent + unsolvedPercent)

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition">
      <div className="relative w-32 h-32 mb-4">
        <svg className="transform -rotate-90 w-32 h-32" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          
          {/* Solved (Green/Blue) */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#1e40af"
            strokeWidth="8"
            strokeDasharray={solvedPath.circumference}
            strokeDashoffset={solvedPath.circumference}
            style={{
              animation: 'dash 2s ease-in-out forwards',
              '--dash-offset': `${solvedPath.strokeDashoffset}px`,
            } as React.CSSProperties & { '--dash-offset': string }}
            strokeLinecap="round"
          />

          {/* Unsolved (Gray) */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="8"
            strokeDasharray={unsolvedPath.circumference}
            strokeDashoffset={unsolvedPath.circumference}
            style={{
              animation: 'dash 2s ease-in-out 0.2s forwards',
              '--dash-offset': `${unsolvedPath.strokeDashoffset}px`,
              transformOrigin: '50px 50px',
              transform: `rotate(${solvedPercent * 3.6}deg)`,
            } as React.CSSProperties & { '--dash-offset': string }}
            strokeLinecap="round"
          />

          {/* Registered (Light Blue) */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="8"
            strokeDasharray={registeredPath.circumference}
            strokeDashoffset={registeredPath.circumference}
            style={{
              animation: 'dash 2s ease-in-out 0.4s forwards',
              '--dash-offset': `${registeredPath.strokeDashoffset}px`,
              transformOrigin: '50px 50px',
              transform: `rotate(${(solvedPercent + unsolvedPercent) * 3.6}deg)`,
            } as React.CSSProperties & { '--dash-offset': string }}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{total}</div>
            <div className="text-xs text-gray-500">Cases</div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-3">{label}</h3>
      
      <div className="space-y-2 w-full">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          <span className="text-sm text-gray-700">Solved: {animatedSolved}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <span className="text-sm text-gray-700">Unsolved: {animatedUnsolved}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
          <span className="text-sm text-gray-700">Registered: {animatedRegistered}</span>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFileComplaintOpen, setIsFileComplaintOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    evidence: '',
    location: '',
  })

  const caseCategories = [
    { id: 'harassment', label: 'Harassment', icon: AlertTriangle },
    { id: 'cybercrime', label: 'Cyber Crime', icon: Lock },
    { id: 'theft', label: 'Theft', icon: Shield },
    { id: 'domestic', label: 'Domestic Violence', icon: Heart },
    { id: 'corruption', label: 'Corruption', icon: BarChart3 },
    { id: 'fraud', label: 'Fraud', icon: AlertCircle },
    { id: 'assault', label: 'Assault', icon: Zap },
    { id: 'property', label: 'Property Dispute', icon: FileText },
    { id: 'labor', label: 'Labor Rights', icon: Users },
    { id: 'sexual', label: 'Sexual Harassment', icon: Eye },
    { id: 'child', label: 'Child Abuse', icon: AlertTriangle },
    { id: 'environmental', label: 'Environmental', icon: Zap },
  ]

  const legalAwareness = [
    {
      title: 'Know Your Rights',
      description: 'Understand the fundamental rights granted to every citizen under the constitution.'
    },
    {
      title: 'Legal Procedures',
      description: 'Learn about the step-by-step legal procedures for filing cases and lawsuits.'
    },
    {
      title: 'Court System',
      description: 'Understand how the judicial system works and different types of courts.'
    },
    {
      title: 'Evidence Collection',
      description: 'Guidelines on properly collecting and preserving evidence for legal cases.'
    },
    {
      title: 'Legal Terminology',
      description: 'Common legal terms and their meanings explained in simple language.'
    },
    {
      title: 'Your Responsibilities',
      description: 'Know your duties and responsibilities as a responsible citizen.'
    },
  ]

  const helplines = [
    {
      title: 'Police Emergency',
      number: '100',
      description: 'Emergency police assistance',
      icon: Shield,
      actions: [
        { label: 'Call Now', icon: Phone },
        { label: 'WhatsApp', icon: MessageSquare }
      ]
    },
    {
      title: 'Women\'s Helpline',
      number: '1091',
      description: 'Support for women in distress',
      icon: Heart,
      actions: [
        { label: 'Call Now', icon: Phone },
        { label: 'WhatsApp', icon: MessageSquare }
      ]
    },
    {
      title: 'Child Helpline',
      number: '1098',
      description: 'Protection for children in need',
      icon: AlertTriangle,
      actions: [
        { label: 'Call Now', icon: Phone },
        { label: 'Chat', icon: MessageSquare }
      ]
    },
    {
      title: 'Cyber Crime Helpline',
      number: '1930',
      description: 'Report cyber crimes and frauds',
      icon: Lock,
      actions: [
        { label: 'Call Now', icon: Phone },
        { label: 'Report Online', icon: MessageSquare }
      ]
    },
    {
      title: 'Senior Citizen Helpline',
      number: '1090',
      description: 'Assistance for senior citizens',
      icon: Users,
      actions: [
        { label: 'Call Now', icon: Phone },
        { label: 'WhatsApp', icon: MessageSquare }
      ]
    },
    {
      title: 'Legal Aid Authority',
      number: '1050',
      description: 'Free legal aid and assistance',
      icon: Briefcase,
      actions: [
        { label: 'Call Now', icon: Phone },
        { label: 'Request Aid', icon: MessageSquare }
      ]
    },
  ]

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Complaint submitted:', { category: selectedCategory, ...formData })
    alert(`Complaint filed successfully for ${selectedCategory}!`)
    setFormData({ name: '', email: '', phone: '', description: '', evidence: '', location: '' })
    setSelectedCategory(null)
    setIsFileComplaintOpen(false)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Scale className="w-8 h-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">JusticeAI</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition font-medium">Home</Link>
              <button 
                onClick={() => setIsFileComplaintOpen(true)}
                className="text-gray-700 hover:text-blue-600 transition font-medium">File Case</button>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 transition font-medium">AI Analysis</Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 transition font-medium">My Cases</Link>
              <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2 border-t border-gray-200">
              <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">Home</Link>
              <button 
                onClick={() => {
                  setIsFileComplaintOpen(true)
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">File Case</button>
              <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">AI Analysis</Link>
              <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">My Cases</Link>
              <Link href="/login" className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium">Login</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">
              AI-Powered Legal Complaint Assistant
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              File complaints and analyze legal cases instantly with our intelligent platform.
            </p>
            <button
              onClick={() => setIsFileComplaintOpen(true)}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              File Complaint Now
            </button>
          </div>

          {/* Animated Charts */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <AnimatedPieChart solved={1245} unsolved={312} registered={980} label="Harassment Cases" />
            <AnimatedPieChart solved={856} unsolved={234} registered={645} label="Cyber Crime Cases" />
            <AnimatedPieChart solved={923} unsolved={187} registered={512} label="Overall Statistics" />
          </div>
        </div>
      </section>

      {/* Case Filing Modal */}
      {isFileComplaintOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900">File a Complaint</h2>
              <button 
                onClick={() => {
                  setIsFileComplaintOpen(false)
                  setSelectedCategory(null)
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              {!selectedCategory ? (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Select Case Category</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {caseCategories.map((cat) => {
                      const Icon = cat.icon
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg transition transform hover:scale-105 flex flex-col items-center gap-3"
                        >
                          <Icon className="w-8 h-8" />
                          <span className="font-semibold text-center text-sm">{cat.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="text-blue-600 hover:text-blue-700 font-medium mb-6 flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Back to Categories
                  </button>

                  <form onSubmit={handleSubmitComplaint} className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {caseCategories.find(c => c.id === selectedCategory)?.label} Details
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Incident Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="Describe the incident in detail..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Evidence/Documents (optional)</label>
                      <textarea
                        value={formData.evidence}
                        onChange={(e) => setFormData({...formData, evidence: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="Describe any evidence or attach documents..."
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition transform hover:scale-105"
                      >
                        File Complaint
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsFileComplaintOpen(false)}
                        className="flex-1 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Legal Awareness Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Legal Awareness</h2>
            <p className="text-xl text-gray-600">Educate yourself on your rights and legal processes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {legalAwareness.map((item, idx) => (
              <div 
                key={idx}
                className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:shadow-lg transition transform hover:scale-105"
              >
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 transition">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government Helplines Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Government Helplines</h2>
            <p className="text-xl text-gray-600">Emergency support and assistance services available 24/7</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helplines.map((helpline, idx) => {
              const Icon = helpline.icon
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-600 rounded-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{helpline.title}</h3>
                      <p className="text-sm text-gray-600">{helpline.description}</p>
                    </div>
                  </div>

                  <div className="text-center py-4 border-t border-b border-gray-200 my-4">
                    <div className="text-4xl font-bold text-blue-600">{helpline.number}</div>
                  </div>

                  <div className="space-y-2">
                    {helpline.actions.map((action, actionIdx) => {
                      const ActionIcon = action.icon
                      return (
                        <button
                          key={actionIdx}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 text-sm"
                        >
                          <ActionIcon className="w-4 h-4" />
                          {action.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-16 bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Emergency Guidelines</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">When to Call:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Life-threatening situations</li>
                  <li>• Active crimes in progress</li>
                  <li>• Child or elder abuse</li>
                  <li>• Cyber fraud activities</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Information to Provide:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Your current location</li>
                  <li>• Type of emergency</li>
                  <li>• Number of people involved</li>
                  <li>• Your contact information</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="w-8 h-8 text-white" />
                <span className="font-bold text-xl">JusticeAI</span>
              </div>
              <p className="text-blue-100">Empowering justice through AI and technology.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-blue-100">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Services</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-blue-100">
                <li><a href="#" className="hover:text-white transition">Legal Guide</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-blue-100">Email: support@justiceai.com</p>
              <p className="text-blue-100">Phone: 1-800-JUSTICE</p>
              <p className="text-blue-100">Emergency: 100</p>
            </div>
          </div>

          <div className="border-t border-blue-800 pt-8">
            <p className="text-center text-blue-100">© 2024 JusticeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
