import { Expense } from '@/types/expense';

const STORAGE_KEY = 'expense-tracker-data';

export class ExpenseStorage {
  static getExpenses(): Expense[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading expenses from localStorage:', error);
      return [];
    }
  }

  static saveExpenses(expenses: Expense[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expenses to localStorage:', error);
    }
  }

  static addExpense(expense: Expense): Expense[] {
    const expenses = this.getExpenses();
    expenses.push(expense);
    this.saveExpenses(expenses);
    return expenses;
  }

  static updateExpense(id: string, updatedExpense: Partial<Expense>): Expense[] {
    const expenses = this.getExpenses();
    const index = expenses.findIndex(expense => expense.id === id);
    
    if (index !== -1) {
      expenses[index] = {
        ...expenses[index],
        ...updatedExpense,
        updatedAt: new Date().toISOString()
      };
      this.saveExpenses(expenses);
    }
    
    return expenses;
  }

  static deleteExpense(id: string): Expense[] {
    const expenses = this.getExpenses();
    const filteredExpenses = expenses.filter(expense => expense.id !== id);
    this.saveExpenses(filteredExpenses);
    return filteredExpenses;
  }

  static clearAllExpenses(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }
}