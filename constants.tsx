import React from 'react';
import { LanguagesData } from './types';

// SVG Icons for Logos
const CLogo = () => (
  <img src="https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/7c0ac2ceb9f9d24992ec393d11fa7337d2f92466/programming%20languages/c.svg" alt="Python Logo" className="w-10 h-10 rounded-full object-cover" />
);

const CppLogo = () => (
  <img src="https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/7c0ac2ceb9f9d24992ec393d11fa7337d2f92466/programming%20languages/c++.svg" alt="Python Logo" className="w-10 h-10 rounded-full object-cover" />
);

const CSharpLogo = () => (
  <img src="https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/7c0ac2ceb9f9d24992ec393d11fa7337d2f92466/programming%20languages/c%23.svg" alt="Python Logo" className="w-10 h-10 rounded-full object-cover" />
);

const PythonLogo = () => (
  <img src="https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/7c0ac2ceb9f9d24992ec393d11fa7337d2f92466/programming%20languages/python.svg" alt="Python Logo" className="w-10 h-10 rounded-full object-cover" />
);


export const LANGUAGES: LanguagesData = {
    C: {
        name: "C",
        logo: <CLogo />,
        theme: { 
            bg: 'bg-blue-600/10', 
            accent: 'text-blue-400',
            gradientColor: 'rgba(59, 130, 246, 0.15)'
        },
        price: '459฿', originalPrice: '659฿',
        topics: {
            "พื้นฐาน": ["Syntax", "Output", "Comments", "Variables", "Data Types", "Constants", "Operators", "User Input"],
            "การควบคุม": ["Booleans", "If...Else", "Switch", "While Loop", "For Loop", "Break/Continue"],
            "โครงสร้างข้อมูล": ["Arrays", "Strings", "Structures", "Structs & Pointers", "Unions", "Enums"],
            "หน่วยความจำ": ["Memory Address", "Pointers", "Memory Management"],
            "ฟังก์ชัน": ["Functions", "Parameters", "Scope", "Declaration", "Recursion", "Math Functions"],
            "ไฟล์": ["Create Files", "Write To Files", "Read Files"],
            "ข้อผิดพลาด & อื่นๆ": ["Errors", "Debugging", "NULL", "Error Handling", "Input Validation", "Date", "Macros", "Storage Classes"],
            "Reference": ["Keywords", "<stdio.h>", "<stdlib.h>", "<string.h>", "<math.h>", "<ctype.h>", "<time.h>"],
        }
    },
    Cpp: {
        name: "C++",
        logo: <CppLogo />,
        theme: { 
            bg: 'bg-sky-600/10', 
            accent: 'text-sky-400',
            gradientColor: 'rgba(14, 165, 233, 0.15)'
        },
        price: '729฿', originalPrice: '929฿',
        topics: {
            "พื้นฐาน": ["Syntax", "Output", "Comments", "Variables", "User Input", "Data Types", "Operators", "Strings", "Math"],
            "การควบคุม": ["Booleans", "If...Else", "Switch", "While Loop", "For Loop", "Break/Continue"],
            "โครงสร้างพื้นฐาน": ["Arrays", "Structures", "Enums", "References", "Pointers", "Memory Management"],
            "ฟังก์ชัน": ["Functions", "Parameters", "Overloading", "Scope", "Recursion", "Lambda"],
            "OOP": ["Classes/Objects", "Class Methods", "Constructors", "Access Specifiers", "Encapsulation", "Inheritance", "Polymorphism", "Templates"],
            "ไฟล์ & วันที่": ["Files", "Date", "Friend Functions"],
            "ข้อผิดพลาด": ["Debugging", "Exceptions", "Input Validation"],
            "Data Structures & STL": ["Vectors", "List", "Stacks", "Queues", "Deque", "Sets", "Maps", "Iterators", "Algorithms", "Namespaces"],
            "Reference": ["Keywords", "<iostream>", "<fstream>", "<cmath>", "<string>", "<vector>", "<algorithm>"],
        }
    },
    CSharp: {
        name: "C#",
        logo: <CSharpLogo />,
        theme: { 
            bg: 'bg-violet-600/10', 
            accent: 'text-violet-400',
            gradientColor: 'rgba(139, 92, 246, 0.15)'
        },
        price: '1,459฿', originalPrice: '1,859฿',
        topics: {
            "พื้นฐาน": ["Syntax", "Output", "Comments", "Variables", "Data Types", "Type Casting", "User Input", "Operators", "Math", "Strings"],
            "การควบคุม": ["Booleans", "If...Else", "Switch", "While Loop", "For Loop", "Break/Continue", "Arrays"],
            "เมธอด": ["Methods", "Parameters", "Overloading"],
            "OOP": ["Classes/Objects", "Class Members", "Constructors", "Access Modifiers", "Properties (Get/Set)", "Inheritance", "Polymorphism", "Abstraction", "Interface"],
            "ขั้นสูง": ["Enums", "Files", "Exceptions", "Add Two Numbers"],
        }
    },
    Python: {
        name: "Python",
        logo: <PythonLogo />,
        theme: { 
            bg: 'bg-yellow-600/10', 
            accent: 'text-yellow-400',
            gradientColor: 'rgba(252, 211, 77, 0.2)'
        },
        price: '459฿', originalPrice: '659฿',
        topics: {
            "พื้นฐาน": ["Syntax", "Comments", "Variables", "Data Types", "Numbers", "Casting", "Strings", "Booleans", "Operators"],
            "โครงสร้างข้อมูล": ["Lists", "Tuples", "Sets", "Dictionaries", "Arrays"],
            "การควบคุม": ["If...Else", "Match", "While Loops", "For Loops"],
            "ฟังก์ชัน & OOP": ["Functions", "Lambda", "Classes/Objects", "Inheritance", "Iterators", "Polymorphism", "Scope"],
            "โมดูล & แพ็คเกจ": ["Modules", "Dates", "Math", "JSON", "RegEx", "PIP", "VirtualEnv"],
            "ไฟล์ & ข้อผิดพลาด": ["Try...Except", "File Handling", "Read Files", "Write/Create", "Delete Files"],
            "การจัดการข้อมูล": ["User Input", "String Formatting"],
            "Matplotlib": ["Intro", "Pyplot", "Plotting", "Markers", "Line", "Labels", "Grid", "Subplot", "Scatter", "Bars", "Histograms", "Pie Charts"],
        }
    }
};

export type LanguageKey = keyof typeof LANGUAGES;