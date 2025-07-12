import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { PosterPreview } from './components/PosterPreview';
import { SuccessModal } from './components/SuccessModal';
import { LanguageKey, LANGUAGES } from './constants';
import * as htmlToImage from 'html-to-image';
import axios from 'axios';


const App: React.FC = () => {
    const [studentName, setStudentName] = useState<string>('');
    const [studentContact, setStudentContact] = useState<string>('');
    const [selectedLanguages, setSelectedLanguages] = useState<LanguageKey[]>(["C", "Cpp", "CSharp", "Python"]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

    const handleLanguageToggle = (langKey: LanguageKey) => {
        setSelectedLanguages(prev =>
            prev.includes(langKey)
                ? prev.filter(key => key !== langKey)
                : [...prev, langKey]
        );
    };

    const handleSendToDiscord = useCallback(async () => {
        setError(null);

        if (!studentName || !studentContact) {
            setError('กรุณากรอกชื่อและช่องทางติดต่อให้ครบถ้วน');
            return;
        }
        if (selectedLanguages.length === 0) {
            setError('กรุณาเลือกคอร์สที่สนใจอย่างน้อย 1 คอร์ส');
            return;
        }
        
        setIsSubmitting(true);
        const posterElement = document.getElementById('poster');
        if (!posterElement) {
            setError('Could not find poster element to capture.');
            setIsSubmitting(false);
            return;
        }

        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

        if (!webhookUrl) {
            setError('Discord webhook URL is not configured.');
            console.error('Discord webhook URL is not configured.');
            setIsSubmitting(false);
            return;
        }

        try {
            const imageBlob = await htmlToImage.toBlob(posterElement, { pixelRatio: 2.5 });
            if (!imageBlob) {
                throw new Error('Failed to generate image blob.');
            }
            
            const selectedCourses = selectedLanguages.map(langKey => LANGUAGES[langKey]);
            const totalPrice = selectedCourses.reduce((sum, course) => {
                const priceNum = parseInt(course.price.replace(/[^0-9]/g, ''), 10);
                return sum + (isNaN(priceNum) ? 0 : priceNum);
            }, 0);

            const discordPayload = {
                content: `✨ New course interest submission!`,
                embeds: [
                    {
                        title: 'Course Interest Details',
                        color: 3447003, // A nice cyan color
                        fields: [
                            {
                                name: '🧑‍🎓 Student Name',
                                value: studentName,
                                inline: false,
                            },
                            {
                                name: '📞 Contact Info',
                                value: studentContact,
                                inline: false,
                            },
                            {
                                name: '📚 Selected Courses',
                                value: selectedCourses.length > 0 ? selectedCourses.map(c => c.name).join(', ') : 'None',
                            },
                            {
                                name: '💰 Total Price',
                                value: `**${totalPrice.toLocaleString('th-TH')}฿**`,
                            },
                        ],
                        timestamp: new Date().toISOString(),
                        footer: {
                            text: 'Lemonadier Courses Interest Submission',
                        },
                        image: {
                            url: 'attachment://promo-poster.png'
                        }
                    },
                ],
            };

            const formData = new FormData();
            formData.append('payload_json', JSON.stringify(discordPayload));
            formData.append('files[0]', imageBlob, 'promo-poster.png');

            await axios.post(webhookUrl, formData);

            setShowSuccessModal(true);
            setStudentName('');
            setStudentContact('');
            setSelectedLanguages([]);

        } catch (err) {
            console.error('Failed to send to Discord:', err);
            setError('ไม่สามารถส่งข้อมูลไปที่ Discord ได้ กรุณาลองอีกครั้ง');
        } finally {
            setIsSubmitting(false);
        }
    }, [studentName, studentContact, selectedLanguages]);


    const handleDownloadImage = useCallback(() => {
        setError(null);
        const posterElement = document.getElementById('poster');
        if (posterElement === null) {
            setError("ไม่สามารถหาองค์ประกอบของโปสเตอร์ได้");
            return;
        }

        htmlToImage.toPng(posterElement, { cacheBust: true, pixelRatio: 2.5 })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'course-promo.png';
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error('oops, something went wrong!', err);
                setError("ไม่สามารถสร้างรูปภาพได้ กรุณาลองใหม่อีกครั้ง");
            });
    }, [setError]);

    return (
        <div 
            className="text-white min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
            style={{
                backgroundSize: '200% 200%',
                animation: 'gradient-move 18s ease infinite'
            }}>
            <main className="flex flex-col lg:flex-row">
                <Sidebar
                    studentName={studentName}
                    setStudentName={setStudentName}
                    studentContact={studentContact}
                    setStudentContact={setStudentContact}
                    selectedLanguages={selectedLanguages}
                    onLanguageToggle={handleLanguageToggle}
                    onSendToDiscord={handleSendToDiscord}
                    onDownloadImage={handleDownloadImage}
                    isSubmitting={isSubmitting}
                    error={error}
                    setError={setError}
                />
                <PosterPreview
                    studentName={studentName}
                    studentContact={studentContact}
                    selectedLanguages={selectedLanguages}
                />
            </main>
            {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
        </div>
    );
};

export default App;