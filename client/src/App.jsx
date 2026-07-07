import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-trust-100 text-trust-600 rounded-full mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Suraksha Setu <span className="text-trust-600">(सुरक्षा सेतु)</span>
        </h1>
        <p className="text-slate-600 mb-6">
          Financial Safety for Rural India — AI Fraud Detection Assistant
        </p>
        <div className="p-4 bg-trust-50 rounded-xl border border-trust-100 text-sm text-trust-800 font-medium">
          🚀 Milestone 1 (Project Setup & Architecture) Initialized Successfully!
        </div>
      </div>
    </div>
  );
}
