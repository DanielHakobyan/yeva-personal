import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../api/client';

const CATEGORIES = ['Personal', 'Philosophical', 'Political'];

const emptyForm = () => ({
  title: '',
  category: 'Personal',
  content: '',
});

const ManageEssays = () => {
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(() => emptyForm());

  const loadEssays = useCallback(async () => {
    setError('');
    try {
      const { data } = await api.get('/api/essays');
      setEssays(data);
    } catch (e) {
      setError(e.response?.data?.msg || e.message || 'Could not load essays');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEssays();
  }, [loadEssays]);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editingId) {
        const { data } = await api.put(`/api/essays/${editingId}`, form);
        setEssays((prev) => prev.map((x) => (x._id === data._id ? data : x)));
      } else {
        const { data } = await api.post('/api/essays', form);
        setEssays((prev) => [data, ...prev]);
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.msg || err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (essay) => {
    setEditingId(essay._id);
    setForm({
      title: essay.title,
      category: essay.category,
      content: essay.content,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this essay permanently?')) return;
    setError('');
    try {
      await api.delete(`/api/essays/${id}`);
      setEssays((prev) => prev.filter((x) => x._id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      setError(err.response?.data?.msg || err.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link
          to="/admin"
          className="text-sm uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-accent transition-colors w-fit"
        >
          ← Control Center
        </Link>
      </div>

      <motion.form
        layout
        onSubmit={handleSubmit}
        className="glass-card p-6 sm:p-8 rounded-xl sm:rounded-2xl space-y-6"
      >
        <h2 className="text-xl sm:text-2xl font-display font-bold">
          {editingId ? 'Edit essay' : 'New essay'}
        </h2>
        {error && (
          <div className="bg-red-500/15 text-red-400 border border-red-500/30 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm uppercase tracking-widest opacity-60 mb-2">Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full text-base bg-white/5 border border-white/10 rounded-lg px-4 py-3 min-h-[48px] focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm uppercase tracking-widest opacity-60 mb-2">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full text-base bg-white/5 border border-white/10 rounded-lg px-4 py-3 min-h-[48px] focus:outline-none focus:border-accent transition-colors"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm uppercase tracking-widest opacity-60 mb-2">Content</label>
          <textarea
            required
            rows={14}
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            className="w-full text-base bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors font-serif leading-relaxed resize-y min-h-[200px]"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="touch-manipulation min-h-[48px] px-6 bg-accent hover:bg-accent/90 disabled:opacity-60 text-white font-medium rounded-lg transition-colors shadow-lg shadow-accent/20"
          >
            {saving ? 'Saving…' : editingId ? 'Update essay' : 'Publish essay'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="touch-manipulation min-h-[48px] px-6 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel edit
            </button>
          )}
        </div>
      </motion.form>

      <div className="glass-card p-6 sm:p-8 rounded-xl sm:rounded-2xl">
        <h3 className="text-lg font-display font-bold mb-6">Published essays</h3>
        {loading ? (
          <p className="opacity-60">Loading…</p>
        ) : essays.length === 0 ? (
          <p className="opacity-60">No essays yet. Add one above.</p>
        ) : (
          <ul className="space-y-4">
            {essays.map((essay) => (
              <li
                key={essay._id}
                className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold tracking-widest uppercase text-accent mb-1">
                    {essay.category}
                  </p>
                  <p className="font-display font-semibold text-lg break-words">{essay.title}</p>
                  <p className="text-sm opacity-50 mt-1">
                    {new Date(essay.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => startEdit(essay)}
                    className="text-xs uppercase tracking-widest px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 touch-manipulation"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(essay._id)}
                    className="text-xs uppercase tracking-widest px-4 py-2 border border-red-500/40 text-red-400 rounded-lg hover:bg-red-500/10 touch-manipulation"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageEssays;
