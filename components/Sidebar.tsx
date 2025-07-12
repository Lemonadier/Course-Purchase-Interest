
import React from 'react';
import { LANGUAGES, LanguageKey } from '../constants';
import { Language } from '../types';

interface SidebarProps {
    studentName: string;
    setStudentName: (value: string) => void;
    studentContact: string;
    setStudentContact: (value: string) => void;
    selectedLanguages: LanguageKey[];
    onLanguageToggle: (langKey: LanguageKey) => void;
    onSendToDiscord: () => void;
    onDownloadImage: () => void;
    isSubmitting: boolean;
    error: string | null;
    setError: (error: string | null) => void;
}

const TextInput: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string }> = ({ label, value, onChange, placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />
    </div>
);

const LanguageCheckbox: React.FC<{ langKey: LanguageKey; language: Language; isSelected: boolean; onToggle: (key: LanguageKey) => void }> = ({ langKey, language, isSelected, onToggle }) => (
     <label htmlFor={String(langKey)} className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${isSelected ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/10' : 'bg-slate-800 border-slate-700 hover:bg-slate-700/50'}`}>
        <input
            type="checkbox"
            id={String(langKey)}
            checked={isSelected}
            onChange={() => onToggle(langKey)}
            className="hidden"
        />
        <div className={`w-5 h-5 rounded-md border-2 ${isSelected ? 'bg-cyan-500 border-cyan-400' : 'bg-slate-600 border-slate-500'} flex items-center justify-center mr-3 transition-all duration-200 flex-shrink-0`}>
             {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
        </div>
        <div className="flex items-center gap-3 mr-auto">
           {language.logo}
           <span className="font-semibold text-slate-100">{language.name}</span>
        </div>
        <div className="text-right">
            <p className="font-semibold text-white">{language.price}</p>
            <s className="text-slate-400 text-sm">{language.originalPrice}</s>
        </div>
    </label>
);

export const Sidebar: React.FC<SidebarProps> = ({
    studentName, setStudentName, studentContact, setStudentContact,
    selectedLanguages, onLanguageToggle, onSendToDiscord, onDownloadImage,
    isSubmitting, error, setError
}) => {
    return (
        <aside className="w-full lg:w-1/3 xl:w-1/4 p-6 bg-slate-800/50 border-b lg:border-b-0 lg:border-r border-slate-700/50 flex flex-col lg:h-screen lg:sticky lg:top-0 overflow-y-auto">
            <header className="mb-8">
                <h1 className="text-xl sm:text-2xl font-bold text-white">Course Purchase Interest</h1>
                <p className="text-slate-400">กรอกข้อมูล เลือกคอร์ส และส่งข้อมูลผ่าน Discord</p>
            </header>

            <div className="flex-grow space-y-6">
                <section>
                    <h2 className="text-lg font-semibold text-cyan-400 mb-3">1. กรอกข้อมูลผู้เรียน</h2>
                    <div className="space-y-4">
                        <TextInput label="ชื่อผู้เรียน" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="ชื่อ-นามสกุล" />
                        <TextInput label="ช่องทางติดต่อ" value={studentContact} onChange={(e) => setStudentContact(e.target.value)} placeholder="IG, Facebook, เบอร์โทร, ฯลฯ" />
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-cyan-400 mb-3">2. เลือกคอร์สที่สนใจ</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                        {(Object.keys(LANGUAGES) as LanguageKey[]).map(key => (
                            <LanguageCheckbox
                                key={String(key)}
                                langKey={key}
                                language={LANGUAGES[key]}
                                isSelected={selectedLanguages.includes(key)}
                                onToggle={onLanguageToggle}
                            />
                        ))}
                    </div>
                </section>
            </div>

            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md text-sm flex justify-between items-center mt-6">
                    <p>{error}</p>
                    <button onClick={() => setError(null)} className="text-red-300 hover:text-white">&times;</button>
                </div>
            )}

            <div className="mt-auto pt-6 space-y-3">
                 <button
                    onClick={onSendToDiscord}
                    disabled={isSubmitting}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งข้อมูลไปที่ Discord'}
                </button>
                <button
                    onClick={onDownloadImage}
                    disabled={isSubmitting}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2.5 px-4 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                    ดาวน์โหลดรูปภาพ
                </button>
                <p className="text-center text-xs text-slate-500">
                    กดปุ่มเพื่อส่งข้อมูลไปยัง Discord โดยตรง หรือดาวน์โหลดเป็นรูปภาพ
                </p>
            </div>
        </aside>
    );
};