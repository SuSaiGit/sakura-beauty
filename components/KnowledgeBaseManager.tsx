import React, { useState, useEffect } from 'react';
import { KnowledgeItem } from '../types';
import { getKnowledgeBase, addKnowledgeItem, deleteKnowledgeItem } from '../services/knowledgeService';
import { Plus, Trash2, BookOpen } from 'lucide-react';

export const KnowledgeBaseManager: React.FC = () => {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', category: 'General', content: '' });

  useEffect(() => {
    setItems(getKnowledgeBase());
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title || !newItem.content) return;
    
    const added = addKnowledgeItem({
      title: newItem.title,
      category: newItem.category as any,
      content: newItem.content
    });
    
    setItems([added, ...items]);
    setIsAdding(false);
    setNewItem({ title: '', category: 'General', content: '' });
  };

  const handleDelete = (id: string) => {
    deleteKnowledgeItem(id);
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fade-in">
      
      <div className="flex justify-between items-end mb-8 border-b border-stone-200 pb-4">
        <div>
          <h2 className="text-2xl font-serif text-stone-800 flex items-center gap-2">
            <BookOpen className="text-sakura-500" />
            Beauty Wisdom
          </h2>
          <p className="text-stone-500 text-sm mt-1">
            Add tips here. The AI will use this knowledge during consultation.
          </p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors text-sm"
        >
          <Plus size={16} /> {isAdding ? 'Cancel' : 'Add Tip'}
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl shadow-md border border-sakura-100 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">Title</label>
              <input 
                type="text" 
                value={newItem.title}
                onChange={e => setNewItem({...newItem, title: e.target.value})}
                className="w-full p-2 border border-stone-200 rounded focus:ring-2 focus:ring-sakura-300 outline-none"
                placeholder="e.g., Rice Water Toner"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
              <select 
                value={newItem.category}
                onChange={e => setNewItem({...newItem, category: e.target.value})}
                className="w-full p-2 border border-stone-200 rounded focus:ring-2 focus:ring-sakura-300 outline-none"
              >
                <option value="Skin">Skin</option>
                <option value="Makeup">Makeup</option>
                <option value="Health">Health</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Knowledge Content</label>
            <textarea 
              value={newItem.content}
              onChange={e => setNewItem({...newItem, content: e.target.value})}
              className="w-full p-2 border border-stone-200 rounded focus:ring-2 focus:ring-sakura-300 outline-none h-24"
              placeholder="Explain the tip..."
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-6 py-2 bg-sakura-500 text-white rounded-lg hover:bg-sakura-600">
              Save Wisdom
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="grid gap-4">
        {items.length === 0 && (
          <div className="text-center py-12 text-stone-400 bg-white rounded-xl border border-dashed border-stone-300">
            No wisdom shared yet. Add some tips!
          </div>
        )}
        
        {items.map(item => (
          <div key={item.id} className="bg-white p-5 rounded-lg border-l-4 border-l-sakura-300 shadow-sm hover:shadow-md transition-shadow flex justify-between group">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  item.category === 'Skin' ? 'bg-blue-50 text-blue-700' :
                  item.category === 'Health' ? 'bg-green-50 text-green-700' :
                  item.category === 'Makeup' ? 'bg-purple-50 text-purple-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {item.category}
                </span>
                <h3 className="font-serif font-medium text-stone-800">{item.title}</h3>
              </div>
              <p className="text-stone-600 text-sm mt-2">{item.content}</p>
            </div>
            <button 
              onClick={() => handleDelete(item.id)}
              className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-500 ml-4 transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};