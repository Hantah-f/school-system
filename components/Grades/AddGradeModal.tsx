import React, { useState } from 'react';

interface AddGradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddGrade: (data: { subject: string, score: number }) => void;
}

const AddGradeModal: React.FC<AddGradeModalProps> = ({ isOpen, onClose, onAddGrade }) => {
    const [subject, setSubject] = useState('');
    const [score, setScore] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const scoreNum = parseInt(score, 10);
        if (!subject.trim()) {
            setError('Subject is required.');
            return;
        }
        if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
            setError('Score must be a number between 0 and 100.');
            return;
        }
        onAddGrade({ subject, score: scoreNum });
        setSubject('');
        setScore('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 m-4" role="dialog" aria-modal="true">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-800">Add New Grade</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-slate-700">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="score" className="block text-sm font-medium text-slate-700">Score (%)</label>
                        <input
                            type="number"
                            id="score"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g., 88"
                            required
                            min="0"
                            max="100"
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                            Save Grade
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddGradeModal;
