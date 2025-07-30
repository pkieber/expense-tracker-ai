'use client';

import { useMemo } from 'react';
import { DollarSign, TrendingUp, Calendar, BarChart3 } from 'lucide-react';
import { Expense, ExpenseSummary, ExpenseCategory } from '@/types/expense';
import { formatCurrency } from '@/lib/utils';

interface DashboardProps {
  expenses: Expense[];
}

export default function Dashboard({ expenses }: DashboardProps) {
  const summary: ExpenseSummary = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.entries(categoryTotals).reduce(
      (max, [category, amount]) => {
        return amount > max.amount ? { category, amount } : max;
      },
      { category: '', amount: 0 }
    );

    return {
      totalExpenses,
      monthlyTotal,
      topCategory: topCategory.amount > 0 ? { category: topCategory.category as ExpenseCategory, amount: topCategory.amount } : null,
      categoryTotals: categoryTotals as Record<ExpenseCategory, number>,
    };
  }, [expenses]);

  const stats = [
    {
      name: 'Total Expenses',
      value: formatCurrency(summary.totalExpenses),
      icon: DollarSign,
      change: expenses.length > 0 ? `${expenses.length} transactions` : 'No transactions',
      changeType: 'neutral' as const,
    },
    {
      name: 'This Month',
      value: formatCurrency(summary.monthlyTotal),
      icon: Calendar,
      change: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      changeType: 'neutral' as const,
    },
    {
      name: 'Top Category',
      value: summary.topCategory ? summary.topCategory.category : 'None',
      icon: BarChart3,
      change: summary.topCategory ? formatCurrency(summary.topCategory.amount) : 'No expenses',
      changeType: 'neutral' as const,
    },
    {
      name: 'Average/Day',
      value: expenses.length > 0 
        ? formatCurrency(summary.monthlyTotal / new Date().getDate())
        : formatCurrency(0),
      icon: TrendingUp,
      change: 'Current month',
      changeType: 'neutral' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className="flex-shrink-0">
                <Icon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}