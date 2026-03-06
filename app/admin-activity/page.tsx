'use client'

import { useState, useEffect } from 'react'
import {
  Scale, LogOut, Bell, Settings, Search, Filter, Clock, User,
  CheckCircle, XCircle, Edit, Eye, Download, RefreshCw
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface AdminActivity {
  id: string
  adminEmail: string
  adminName: string
  action: string
  actionType: 'approval' | 'rejection' | 'view' | 'edit' | 'delete' | 'download' | 'login' | 'logout'
  target: string
  targetType: 'police' | 'lawyer' | 'case' | 'user'
  timestamp: string
  details: string
  ipAddress: string
}

export default function AdminActivityPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterAction, setFilterAction] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [adminEmail, setAdminEmail] = useState('admin@justiceai.com')

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock activity data
  const activities: AdminActivity[] = [
    {
      id: 'ACT001',
      adminEmail: 'admin@justiceai.com',
      adminName: 'Admin User',
      action: 'Approved application',
      actionType: 'approval',
      target: 'Rajesh Kumar (Police)',
      targetType: 'police',
      timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
      details: 'Approved police officer registration from Mumbai',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'ACT002',
      adminEmail: 'admin@justiceai.com',
      adminName: 'Admin User',
      action: 'Rejected application',
      actionType: 'rejection',
      target: 'Priya Singh (Lawyer)',
      targetType: 'lawyer',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      details: 'Rejected lawyer registration - Incomplete documentation',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'ACT003',
      adminEmail: 'admin@justiceai.com',
      adminName: 'Admin User',
      action: 'Viewed application',
      actionType: 'view',
      target: 'Case #C002 - Harassment',
      targetType: 'case',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      details: 'Viewed case details for harassment complaint',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'ACT004',
      adminEmail: 'admin@justiceai.com',
      adminName: 'Admin User',
      action: 'Downloaded report',
      actionType: 'download',
      target: 'Monthly Report - March 2026',
      targetType: 'case',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      details: 'Downloaded monthly activity report',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'ACT005',
      adminEmail: 'admin@justiceai.com',
      adminName: 'Admin User',
      action: 'Edited user profile',
      actionType: 'edit',
      target: 'Officer ID: P005',
      targetType: 'user',
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      details: 'Updated contact information for police officer',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'ACT006',
      adminEmail: 'admin@justiceai.com',
      adminName: 'Admin User',
      action: 'Approved application',
      actionType: 'approval',
      target: 'Aditya Patel (Police)',
      targetType: 'police',
      timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
      details: 'Approved police officer registration from Bangalore',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'ACT007',
      adminEmail: 'admin@justiceai.com',
      adminName: 'Admin User',
      action: 'System login',
      actionType: 'login',
      target: 'Admin Dashboard',
      targetType: 'user',
      timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
      details: 'Admin logged into the system',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'ACT008',
      adminEmail: 'admin@justiceai.com',
      adminName: 'Admin User',
      action: 'Approved application',
      actionType: 'approval',
      target: 'Neha Gupta (Lawyer)',
      targetType: 'lawyer',
      timestamp: new Date(Date.now() - 180 * 60000).toISOString(),
      details: 'Approved lawyer registration from Delhi',
      ipAddress: '192.168.1.100'
    }
  ]

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'approval':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'rejection':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'view':
        return <Eye className="w-5 h-5 text-blue-600" />
      case 'edit':
        return <Edit className="w-5 h-5 text-purple-600" />
      case 'download':
        return <Download className="w-5 h-5 text-amber-600" />
      case 'login':
        return <User className="w-5 h-5 text-green-600" />
      case 'logout':
        return <LogOut className="w-5 h-5 text-gray-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case 'approval':
        return 'bg-green-50'
      case 'rejection':
        return 'bg-red-50'
      case 'view':
        return 'bg-blue-50'
      case 'edit':
        return 'bg-purple-50'
      case 'download':
        return 'bg-amber-50'
      case 'login':
        return 'bg-green-50'
      case 'logout':
        return 'bg-gray-50'
      default:
        return 'bg-gray-50'
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.action.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAction = filterAction === 'all' || activity.actionType === filterAction

    return matchesSearch && matchesAction
  })

  const stats = {
    approvals: activities.filter(a => a.actionType === 'approval').length,
    rejections: activities.filter(a => a.actionType === 'rejection').length,
    views: activities.filter(a => a.actionType === 'view').length,
    edits: activities.filter(a => a.actionType === 'edit').length
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Activity Log...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Scale className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Activity Log</h1>
                <p className="text-sm text-gray-600">Logged in as: {adminEmail}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={() => router.push('/admin-login')}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Approvals</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.approvals}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-200" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Rejections</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{stats.rejections}</p>
              </div>
              <XCircle className="w-10 h-10 text-red-200" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Views</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.views}</p>
              </div>
              <Eye className="w-10 h-10 text-blue-200" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Edits</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">{stats.edits}</p>
              </div>
              <Edit className="w-10 h-10 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search activity by target or action..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            >
              <option value="all">All Actions</option>
              <option value="approval">Approvals</option>
              <option value="rejection">Rejections</option>
              <option value="view">Views</option>
              <option value="edit">Edits</option>
              <option value="download">Downloads</option>
              <option value="login">Logins</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className={`${getActionColor(activity.actionType)} border border-gray-200 rounded-lg p-4 hover:shadow-md transition`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getActionIcon(activity.actionType)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{activity.action}</h3>
                      <span className="text-xs font-medium text-gray-500">{getTimeAgo(activity.timestamp)}</span>
                    </div>

                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">Target:</span> {activity.target}
                    </p>

                    <p className="text-sm text-gray-600 mb-3">{activity.details}</p>

                    <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                      <div>
                        <span className="font-medium">Admin:</span> {activity.adminName}
                      </div>
                      <div>
                        <span className="font-medium">Timestamp:</span> {formatDate(activity.timestamp)}
                      </div>
                      <div>
                        <span className="font-medium">IP:</span> {activity.ipAddress}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No activities found</p>
              <p className="text-gray-500 text-sm mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>

        {/* Pagination Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Showing {filteredActivities.length} of {activities.length} activities</p>
        </div>
      </main>
    </div>
  )
}
