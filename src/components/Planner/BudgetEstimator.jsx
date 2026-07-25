import React from 'react';
import { IndianRupee, Utensils, Car, Ticket, Home, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function BudgetEstimator({ targetBudget, breakdown }) {
  const { lodging, food, transport, tickets, total } = breakdown;
  
  const isOverBudget = total > targetBudget;
  const budgetPercentage = Math.min(100, Math.round((total / targetBudget) * 100));

  const items = [
    { name: 'Lodging (Est.)', value: lodging, icon: Home, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20' },
    { name: 'Food (Est.)', value: food, icon: Utensils, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' },
    { name: 'Local Transport', value: transport, icon: Car, color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/20' },
    { name: 'Entry Tickets', value: tickets, icon: Ticket, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20' }
  ];

  return (
    <div className="bg-white dark:bg-brand-slate-900 border border-brand-slate-200 dark:border-brand-slate-800 p-6 rounded-2xl shadow-xl flex flex-col gap-5">
      <h2 className="text-xl font-bold text-brand-slate-900 dark:text-white pb-3 border-b border-brand-slate-100 dark:border-brand-slate-800 flex items-center gap-2">
        <span>Budget Estimator</span>
      </h2>

      {/* Budget Summary Ring/Status */}
      <div className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
        isOverBudget 
          ? 'bg-red-50 dark:bg-red-950/10 border-red-200 dark:border-red-900/30 text-red-800 dark:text-red-300' 
          : 'bg-green-50 dark:bg-green-950/10 border-green-200 dark:border-green-900/30 text-green-800 dark:text-green-300'
      }`}>
        {isOverBudget ? (
          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-500 mt-0.5" />
        ) : (
          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500 mt-0.5" />
        )}
        <div>
          <h3 className="text-sm font-bold">
            {isOverBudget ? 'Exceeds Target Budget' : 'Within Budget Target'}
          </h3>
          <p className="text-xs text-brand-slate-500 dark:text-brand-slate-400 mt-0.5">
            {isOverBudget 
              ? `Your plan is ₹${(total - targetBudget).toLocaleString('en-IN')} over your budget goal. Consider choosing "Budget" style or reducing days.`
              : `Awesome! You are using ${budgetPercentage}% of your target budget goal.`
            }
          </p>
        </div>
      </div>

      {/* Itemized list */}
      <div className="grid grid-cols-2 gap-4">
        {items.map(item => (
          <div 
            key={item.name}
            className="flex items-center gap-3 p-3 rounded-xl border border-brand-slate-100 dark:border-brand-slate-800 bg-brand-slate-50/45 dark:bg-brand-slate-900"
          >
            <div className={`p-2.5 rounded-lg ${item.color}`}>
              <item.icon className="h-4 w-4" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold text-brand-slate-400 dark:text-brand-slate-500 uppercase tracking-wider block">
                {item.name}
              </span>
              <span className="text-sm font-extrabold text-brand-slate-800 dark:text-white">
                ₹{item.value.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col gap-1.5 pt-2 border-t border-brand-slate-100 dark:border-brand-slate-800">
        <div className="flex justify-between items-center text-xs font-bold text-brand-slate-500 dark:text-brand-slate-400">
          <span>Target: ₹{targetBudget.toLocaleString('en-IN')}</span>
          <span>Actual: ₹{total.toLocaleString('en-IN')}</span>
        </div>
        <div className="w-full h-3 bg-brand-slate-150 dark:bg-brand-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              isOverBudget ? 'bg-red-500' : 'bg-brand-teal-600 dark:bg-brand-teal-400'
            }`}
            style={{ width: `${budgetPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Grand Total */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-brand-slate-900 text-white dark:bg-brand-slate-950 border border-brand-slate-800">
        <div className="text-left">
          <span className="text-xs text-brand-slate-400 block font-medium">Estimated Total Cost</span>
          <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-teal-400 to-brand-gold">
            ₹{total.toLocaleString('en-IN')}
          </span>
        </div>
        <IndianRupee className="h-8 w-8 text-brand-gold opacity-80" />
      </div>
    </div>
  );
}
