'use client';

import { useState, useEffect } from 'react';
import { Download, Plus, BarChart3 } from 'lucide-react';
import { Expense, ExpenseFormData } from '@/types/expense';
import { ExpenseStorage } from '@/lib/storage';
import { generateId, exportToCSV, formatDate } from '@/lib/utils';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import Dashboard from '@/components/Dashboard';
import ExpenseChart from '@/components/ExpenseChart';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'add' | 'list' | 'analytics'>('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadExpenses = () => {
      try {
        const savedExpenses = ExpenseStorage.getExpenses();
        setExpenses(savedExpenses);
      } catch (error) {
        console.error('Error loading expenses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadExpenses();
  }, []);

  const handleAddExpense = async (formData: ExpenseFormData) => {
    const newExpense: Expense = {
      id: generateId(),
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description.trim(),
      date: formData.date,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedExpenses = ExpenseStorage.addExpense(newExpense);
    setExpenses(updatedExpenses);
    setActiveTab('list');
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setActiveTab('add');
  };

  const handleUpdateExpense = async (formData: ExpenseFormData) => {
    if (!editingExpense) return;

    const updatedExpense = {
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description.trim(),
      date: formData.date,
    };

    const updatedExpenses = ExpenseStorage.updateExpense(editingExpense.id, updatedExpense);
    setExpenses(updatedExpenses);
    setEditingExpense(null);
    setActiveTab('list');
  };

  const handleDeleteExpense = (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      const updatedExpenses = ExpenseStorage.deleteExpense(id);
      setExpenses(updatedExpenses);
    }
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
    setActiveTab('list');
  };

  const handleExportCSV = () => {
    const exportData = expenses.map(expense => ({
      Date: formatDate(expense.date),
      Amount: expense.amount,
      Category: expense.category,
      Description: expense.description,
    }));

    exportToCSV(exportData, `expenses-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const tabs = [
    { id: 'overview' as const, name: 'Overview', icon: BarChart3 },
    { id: 'add' as const, name: editingExpense ? 'Edit Expense' : 'Add Expense', icon: Plus },
    { id: 'list' as const, name: 'Expenses', icon: BarChart3 },
    { id: 'analytics' as const, name: 'Analytics', icon: BarChart3 },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
            </div>
            <div className="flex items-center gap-4">
              {expenses.length > 0 && (
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <Dashboard expenses={expenses} />
            <ExpenseChart expenses={expenses} />
          </div>
        )}

        {activeTab === 'add' && (
          <div className="max-w-2xl mx-auto">
            <ExpenseForm
              onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
              initialData={editingExpense ? {
                amount: editingExpense.amount.toString(),
                category: editingExpense.category,
                description: editingExpense.description,
                date: editingExpense.date,
              } : undefined}
              isEditing={!!editingExpense}
              onCancel={handleCancelEdit}
            />
          </div>
        )}

        {activeTab === 'list' && (
          <ExpenseList
            expenses={expenses}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <ExpenseChart expenses={expenses} />
            <Dashboard expenses={expenses} />
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 Expense Tracker. Built with Next.js and Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}