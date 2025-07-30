# Expense Tracker

A modern, professional expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS. This application helps users manage their personal finances with an intuitive interface and comprehensive features.

## Features

### Core Functionality
- ✅ **Add Expenses** - Create new expenses with date, amount, category, and description
- ✅ **View Expenses** - Clean, organized list view of all expenses
- ✅ **Filter & Search** - Filter by date range, category, and search by description
- ✅ **Edit & Delete** - Full CRUD operations for expense management
- ✅ **Data Persistence** - All data stored in localStorage for demo purposes

### Dashboard & Analytics
- ✅ **Summary Cards** - Total expenses, monthly spending, top category, and daily average
- ✅ **Visual Charts** - Pie chart for category breakdown and bar chart for monthly trends
- ✅ **Category Insights** - Spending patterns by category with color-coded visualization

### Export & Utility
- ✅ **CSV Export** - Export all expenses to CSV format for external analysis
- ✅ **Form Validation** - Comprehensive validation for all user inputs
- ✅ **Loading States** - Professional loading indicators and error handling
- ✅ **Responsive Design** - Fully responsive for desktop, tablet, and mobile devices

### Categories Supported
- Food
- Transportation
- Entertainment
- Shopping
- Bills
- Other

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for modern, responsive design
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: Native JavaScript Date and date-fns utilities

## Getting Started

### Prerequisites
- Node.js 18+ installed on your system
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd expense-tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

To create a production build:

```bash
npm run build
npm start
```

## Usage Guide

### Adding Your First Expense
1. Click on the "Add Expense" tab
2. Fill in the amount, select a category, add a description, and choose a date
3. Click "Add Expense" to save

### Viewing and Managing Expenses
1. Go to the "Expenses" tab to see all your expenses
2. Use the search bar to find specific expenses
3. Use filters to narrow down by category or date range
4. Click the edit (pencil) icon to modify an expense
5. Click the delete (trash) icon to remove an expense

### Analytics and Insights
1. The "Overview" tab shows your financial summary at a glance
2. View spending patterns by category in the pie chart
3. Track monthly spending trends in the bar chart
4. Monitor key metrics like total spending and top categories

### Exporting Data
1. Click the "Export CSV" button in the header (appears when you have expenses)
2. Your data will be downloaded as a CSV file with all expense details

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── Dashboard.tsx      # Summary dashboard with cards
│   ├── ExpenseChart.tsx   # Chart components for visualization
│   ├── ExpenseForm.tsx    # Form for adding/editing expenses
│   └── ExpenseList.tsx    # List view with search and filters
├── lib/                   # Utility functions and services
│   ├── storage.ts         # localStorage management
│   └── utils.ts           # Helper functions and utilities
└── types/                 # TypeScript type definitions
    └── expense.ts         # Expense-related types and interfaces
```

## Key Features Tested

✅ **Form Validation** - All inputs are validated with appropriate error messages
✅ **Data Persistence** - Expenses are saved to localStorage and persist between sessions
✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
✅ **Search & Filter** - Real-time search and multiple filter options work correctly
✅ **CRUD Operations** - Create, read, update, and delete operations function properly
✅ **CSV Export** - Export functionality generates properly formatted CSV files
✅ **Charts & Analytics** - Visual representations update dynamically with data changes
✅ **Loading States** - Professional loading indicators throughout the application
✅ **Error Handling** - Graceful error handling for edge cases

## Browser Support

This application supports all modern browsers including:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Data Storage

This demo application uses localStorage for data persistence. In a production environment, you would typically integrate with a backend API and database for proper data management.

## Contributing

The application is built with clean, maintainable code following modern React and TypeScript best practices. The modular component structure makes it easy to extend and customize.

## License

This project is created for educational and demonstration purposes.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**