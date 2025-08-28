'use client'

import { useState, useEffect } from 'react'

interface User {
  user_id: number
  user_name: string
  createdAt?: string
  updatedAt?: string
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({ user_name: '' })
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const API_BASE = 'http://localhost:8000/api'

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await fetch(`${API_BASE}/users`)
      if (!response.ok) throw new Error('Failed to fetch users')
      const result = await response.json()
      console.log('API Response:', result) // Debug log
      setUsers(result.data || [])
    } catch (err) {
      setError('Error loading users: ' + (err instanceof Error ? err.message : 'Unknown error'))
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Create user
  const createUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.user_name.trim()) return

    try {
      setIsSubmitting(true)
      setError('')
      const response = await fetch(`${API_BASE}/createUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) throw new Error('Failed to create user')
      
      const result = await response.json()
      console.log('Create response:', result) // debug log
      
      setFormData({ user_name: '' })
      setSuccess('User created successfully!')
      fetchUsers()
    } catch (err) {
      setError('Error creating user: ' + (err instanceof Error ? err.message : 'Unknown error'))
      console.error('Create error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update user
  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser || !formData.user_name.trim()) return

    try {
      setIsSubmitting(true)
      setError('')
      const response = await fetch(`${API_BASE}/updateUser/${editingUser.user_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) throw new Error('Failed to update user')
      
      const result = await response.json()
      console.log('Update response:', result) // debug log
      
      setFormData({ user_name: '' })
      setEditingUser(null)
      setSuccess('User updated successfully!')
      fetchUsers()
    } catch (err) {
      setError('Error updating user: ' + (err instanceof Error ? err.message : 'Unknown error'))
      console.error('Update error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Delete user
  const deleteUser = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      setError('')
      const response = await fetch(`${API_BASE}/deleteUser/${userId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete user')
      
      const result = await response.json()
      console.log('Delete response:', result) // debug log
      
      setSuccess('User deleted successfully!')
      fetchUsers()
    } catch (err) {
      setError('Error deleting user: ' + (err instanceof Error ? err.message : 'Unknown error'))
      console.error('Delete error:', err)
    }
  }

  // Start editing user
  const startEdit = (user: User) => {
    setEditingUser(user)
    setFormData({ user_name: user.user_name })
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingUser(null)
    setFormData({ user_name: '' })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // auto-clear messages after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">User Management</h1>
        </div>

        {/* Form */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            {editingUser ? 'Edit User' : 'Create New User'}
          </h2>
          
          <form onSubmit={editingUser ? updateUser : createUser} className="space-y-4">
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-300 mb-2">
                User Name
              </label>
              <input
                type="text"
                id="user_name"
                value={formData.user_name}
                onChange={(e) => setFormData({ user_name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter user name"
                required
              />
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : (editingUser ? 'Update User' : 'Create User')}
              </button>
              
              {editingUser && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* success message */}
        {success && (
          <div className="bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded-md mb-6">
            {success}
          </div>
        )}

        {/* error message */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* users list */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Users List</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="text-gray-400">Loading users...</div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400">No users found</div>
            </div>
          ) : (
            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.user_id}
                  className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <div>
                    <h3 className="text-white font-medium">{user.user_name}</h3>
                    <p className="text-sm text-gray-400">ID: {user.user_id}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(user)}
                      className="px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user.user_id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
