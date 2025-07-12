import React from 'react';

export interface TopicSections {
    [sectionTitle: string]: string[];
}

export interface Language {
    name: string;
    logo: React.ReactNode;
    theme: {
        bg: string;
        accent: string;
        gradientColor: string;
    };
    topics: TopicSections;
    price: string;
    originalPrice: string;
}

export interface LanguagesData {
    [key: string]: Language;
}