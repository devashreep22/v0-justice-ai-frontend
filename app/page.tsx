'use client'

import { useState } from 'react'
import { 
  Scale, Menu, X, ArrowRight, FileText, Users, Award, 
  Phone, MessageSquare, AlertCircle, Shield, Briefcase,
  Heart, AlertTriangle, Lock, BarChart3, Zap, Eye
} from 'lucide-react'
import Link from 'next/link'

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
    { id: 'harassment', label: 'Harassment', icon: AlertTriangle, color: 'from-red-500 to-red-600' },
    { id: 'cybercrime', label: 'Cyber Crime', icon: Lock, color: 'from-purple-500 to-purple-600' },
    { id: 'theft', label: 'Theft', icon: Shield, color: 'from-blue-500 to-blue-600' },
    { id: 'domestic', label: 'Domestic Violence', icon: Heart, color: 'from-pink-500 to-pink-600' },
    { id: 'corruption', label: 'Corruption', icon: BarChart3, color: 'from-amber-500 to-amber-600' },
    { id: 'fraud', label: 'Fraud', icon: AlertCircle, color: 'from-orange-500 to-orange-600' },
    { id: 'assault', label: 'Assault', icon: Zap, color: 'from-red-600 to-red-700' },
    { id: 'property', label: 'Property Dispute', icon: FileText, color: 'from-slate-500 to-slate-600' },
    { id: 'labor', label: 'Labor Rights', icon: Users, color: 'from-green-500 to-green-600' },
    { id: 'sexual', label: 'Sexual Harassment', icon: Eye, color: 'from-rose-500 to-rose-600' },
    { id: 'child', label: 'Child Abuse', icon: AlertTriangle, color: 'from-indigo-500 to-indigo-600' },
    { id: 'environmental', label: 'Environmental', icon: Zap, color: 'from-teal-500 to-teal-600' },
  ]

  const legalAwareness = [
    {
      title: 'Know Your Rights',
      description: 'Understand the fundamental rights granted to every citizen under the constitution.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Legal Procedures',
      description: 'Learn about the step-by-step legal procedures for filing cases and lawsuits.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Court System',
      description: 'Understand how the judicial system works and different types of courts.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Evidence Collection',
      description: 'Guidelines on properly collecting and preserving evidence for legal cases.',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      title: 'Legal Terminology',
      description: 'Common legal terms and their meanings explained in simple language.',
      color: 'from-violet-500 to-violet-600'
    },
    {
      title: 'Your Responsibilities',
      description: 'Know your duties and responsibilities as a responsible citizen.',
      color: 'from-fuchsia-500 to-fuchsia-600'
    },
  ]

  const helplines = [
    {
      title: 'Police Emergency',
      number: '100',
      description: 'Emergency police assistance',
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
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
      color: 'from-pink-500 to-pink-600',
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
      color: 'from-amber-500 to-amber-600',
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
      color: 'from-purple-500 to-purple-600',
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
      color: 'from-green-500 to-green-600',
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
      color: 'from-indigo-500 to-indigo-600',
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
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white py-20 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Justice <span className="text-amber-300">At Your Fingertips</span>
              </h1>
              <p className="text-xl text-blue-100">
                AI-powered legal assistance for filing cases, understanding laws, and accessing government support. Empowering citizens and professionals with instant legal guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => setIsFileComplaintOpen(true)}
                  className="bg-amber-400 text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-amber-300 transition transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  File Complaint Now
                </button>
                <Link 
                  href="/login"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition flex items-center justify-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  Watch Demo
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden md:block relative">
              <div className="bg-blue-400 bg-opacity-20 backdrop-blur-xl rounded-3xl p-8 border border-white border-opacity-20">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white bg-opacity-10 rounded-lg h-16 animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              { label: 'Cases Resolved', value: '5,234' },
              { label: 'Active Users', value: '12,890' },
              { label: 'Success Rate', value: '94%' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-amber-300 mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
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
                          className={`bg-gradient-to-br ${cat.color} text-white p-6 rounded-xl hover:shadow-lg transition transform hover:scale-105 flex flex-col items-center gap-3`}
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Legal Awareness</h2>
            <p className="text-xl text-gray-600">Educate yourself on your rights and legal processes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {legalAwareness.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 overflow-hidden group"
              >
                <div className={`bg-gradient-to-br ${item.color} h-24`}></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 group-hover:gap-3 transition">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government Helplines Section */}
      <section className="py-20 bg-white">
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
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 overflow-hidden border border-gray-200"
                >
                  <div className={`bg-gradient-to-br ${helpline.color} p-6 text-white`}>
                    <Icon className="w-10 h-10 mb-3" />
                    <h3 className="text-2xl font-bold">{helpline.title}</h3>
                  </div>

                  <div className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-5xl font-bold text-gray-900 mb-2">{helpline.number}</div>
                      <p className="text-gray-600">{helpline.description}</p>
                    </div>

                    <div className="space-y-2">
                      {helpline.actions.map((action, actionIdx) => {
                        const ActionIcon = action.icon
                        return (
                          <button
                            key={actionIdx}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition transform hover:scale-105 flex items-center justify-center gap-2"
                          >
                            <ActionIcon className="w-5 h-5" />
                            {action.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-200">
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
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="w-8 h-8 text-blue-400" />
                <span className="font-bold text-xl">JusticeAI</span>
              </div>
              <p className="text-gray-400">Empowering justice through AI and technology.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Services</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Legal Guide</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-gray-400">Email: support@justiceai.com</p>
              <p className="text-gray-400">Phone: 1-800-JUSTICE</p>
              <p className="text-gray-400">Emergency: 100</p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400">© 2024 JusticeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
