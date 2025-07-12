
import React from 'react';
import { LanguageKey, LANGUAGES } from '../constants';
import { Language, TopicSections } from '../types';

interface PosterPreviewProps {
    studentName: string;
    studentContact: string;
    selectedLanguages: LanguageKey[];
}

const LanguageSection: React.FC<{ language: Language, columns: number }> = ({ language, columns }) => {
    const topicEntries = Object.entries(language.topics);
    const topicsPerColumn = Math.ceil(topicEntries.length / columns);

    const columnChunks = Array.from({ length: columns }, (_, colIndex) => 
        topicEntries.slice(colIndex * topicsPerColumn, (colIndex + 1) * topicsPerColumn)
    );

    const gridColsClass = columns === 2 ? 'grid-cols-2' : 'grid-cols-1';

    return (
        <div className={`p-6 rounded-2xl ${language.theme.bg} border border-slate-700/50 backdrop-blur-sm shadow-lg flex flex-col`}>
            <div className={`flex flex-wrap items-baseline justify-between gap-4 mb-4 pb-3 border-b border-slate-700/50`}>
                <div className="flex items-center gap-4">
                    {language.logo}
                    <h3 className={`text-2xl md:text-3xl font-bold ${language.theme.accent}`}>{language.name}</h3>
                </div>
                <div className="text-right flex items-baseline gap-2 flex-shrink-0">
                    <span className="text-2xl md:text-3xl font-bold text-white">{language.price}</span>
                    <s className="text-lg md:text-xl text-slate-500">{language.originalPrice}</s>
                </div>
            </div>
            <div className={`grid ${gridColsClass} gap-x-6 gap-y-4`}>
                {columnChunks.map((chunk, index) => (
                    <div key={index} className="flex flex-col space-y-4">
                        {chunk.map(([title, topics]) => (
                            <div key={title}>
                                <h4 className="font-semibold text-slate-200 mb-1.5">{title}</h4>
                                <ul className="text-sm text-slate-400 space-y-1">
                                    {(topics as string[]).map(topic => <li key={topic}>{topic}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};


export const PosterPreview: React.FC<PosterPreviewProps> = ({ studentName, studentContact, selectedLanguages }) => {
    const visibleLanguages = selectedLanguages.map(key => LANGUAGES[key]);
    const gridCols = visibleLanguages.length > 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1';
    
    const getTopicColumns = (topics: TopicSections) => {
        const totalTopics = (Object.values(topics) as string[][]).reduce((acc, val) => acc + val.length, 0);
        return totalTopics > 35 ? 2 : 1;
    }

    const generateBackgroundStyle = (keys: LanguageKey[]): React.CSSProperties => {
        const defaultBackground = 'radial-gradient(circle at top right, rgba(0, 128, 128, 0.2), transparent 40%), radial-gradient(circle at bottom left, rgba(128, 0, 128, 0.2), transparent 50%)';

        if (!keys || keys.length === 0) {
            return { backgroundImage: defaultBackground };
        }
        
        const positions = [
            'circle at 20% 20%', 'circle at 80% 80%', 'circle at 80% 20%',
            'circle at 20% 80%', 'circle at 50% 10%', 'circle at 50% 90%',
            'circle at 10% 50%', 'circle at 90% 50%',
        ];

        const gradients = keys
            .map((key, index) => {
                const color = LANGUAGES[key]?.theme.gradientColor;
                if (!color) return null;
                const position = positions[index % positions.length];
                return `radial-gradient(${position}, ${color}, transparent 60%)`;
            })
            .filter(Boolean)
            .join(', ');

        return { backgroundImage: gradients || defaultBackground };
    };

    const posterStyle = generateBackgroundStyle(selectedLanguages);

    const totalPrice = selectedLanguages
        .map(key => LANGUAGES[key].price)
        .reduce((sum, priceStr) => {
            const priceNum = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
            return sum + (isNaN(priceNum) ? 0 : priceNum);
        }, 0);


    return (
        <div className="w-full lg:w-2/3 xl:w-3/4 p-4 md:p-8 flex items-center justify-center bg-slate-900">
            <div className="w-full max-w-5xl">
                <div 
                    id="poster" 
                    className="bg-slate-900 text-white w-full h-auto p-6 md:p-12 flex flex-col origin-center transition-all duration-500"
                    style={posterStyle}>
                    <header className="text-center mb-6">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 leading-tight">
                            Basic Programming Courses
                        </h1>
                        <p className="text-slate-300 text-lg sm:text-xl lg:text-2xl mt-2 font-medium">สอนตัวต่อตัวผ่าน Zoom, Discord และวิดีโอ</p>
                    </header>

                    <div className="text-center text-slate-400 text-base mb-8 max-w-3xl mx-auto border border-slate-700/80 p-4 rounded-lg bg-slate-800/50 shadow-inner">
                        <p className="font-semibold text-slate-200 text-lg mb-2">สนใจเรียนใช่ไหม? กรอกข้อมูล, เลือกคอร์ส, แล้วแคปหน้านี้ส่งมาได้เลย!</p>
                        <p>ข้อมูลการเรียน, โจทย์, และไฟล์โค้ดจะถูกอัปโหลดขึ้น GitHub หรือ Discord ส่วนตัว</p>
                         <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                            <span className="font-semibold text-slate-300">ส่งข้อมูลมาที่: </span>
                            <a href="https://www.instagram.com/lxmonadier._/" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center gap-2 font-semibold text-fuchsia-400 hover:text-fuchsia-300 transition-colors group">
                                <span className="relative flex h-2 w-2 mr-1">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
                                </span>
                                Instagram
                            </a>
                            <a href="https://www.facebook.com/LemonadeX20" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center gap-2 font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group">
                                <span className="relative flex h-2 w-2 mr-1">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                </span>
                                Facebook
                            </a>
                            <a href="https://discord.gg/96yzWZkG" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center gap-2 font-semibold text-blue-500 hover:text-blue-300 transition-colors group">
                                <span className="relative flex h-2 w-2 mr-1">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                                </span>
                                Discord
                            </a>
                            <a href="https://line.me/ti/p/BI6O7ex0-x" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center gap-2 font-semibold text-green-400 hover:text-cyan-300 transition-colors group">
                                <span className="relative flex h-2 w-2 mr-1">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Line
                            </a>
                        </div>
                    </div>

                    {totalPrice > 0 && (
                        <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-xl font-bold text-slate-200">ราคารวมทั้งหมด</h3>
                                <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                                    {totalPrice.toLocaleString('th-TH')}฿
                                </p>
                            </div>
                        </div>
                    )}

                    <main className={`flex-grow grid gap-8 ${gridCols} grid-cols-1`}>
                        {visibleLanguages.length > 0 ? visibleLanguages.map(lang => (
                            <LanguageSection key={lang.name} language={lang} columns={getTopicColumns(lang.topics)} />
                        )) : (
                            <div className="flex items-center justify-center h-full text-slate-500 text-2xl col-span-full">
                                <p>เลือกคอร์สที่สนใจในเมนูด้านข้าง</p>
                            </div>
                        )}
                    </main>

                    <footer className="mt-8 pt-6 border-t-2 border-slate-700 space-y-4">
                         <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                            <h3 className="text-xl font-bold text-cyan-400 mb-2">ข้อมูลผู้เรียนสำหรับติดต่อกลับ</h3>
                            <p className="text-lg md:text-xl font-semibold text-slate-200 leading-relaxed">
                                <span className="text-slate-400 font-medium">ชื่อ:</span> {studentName || <span className="text-slate-500">ยังไม่ได้กรอก</span>}
                            </p>
                            <p className="text-lg md:text-xl font-semibold text-slate-200 leading-relaxed">
                                <span className="text-slate-400 font-medium">ติดต่อ:</span> {studentContact || <span className="text-slate-500">ยังไม่ได้กรอก</span>}
                            </p>
                        </div>
                        
                    </footer>
                </div>
            </div>
        </div>
    );
};
