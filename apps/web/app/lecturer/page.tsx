'use client';

import React, { useState } from 'react';
import { TopNavBar } from '@/components/TopNavBar';
import Link from 'next/link';

interface Lecturer {
  id: string;
  name: string;
  title: string;
  department: string;
  specialization: string;
  status: 'available' | 'busy' | 'away';
  image: string;
  email: string;
}

const LECTURERS: Lecturer[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Senior Lecturer',
    department: 'Computer Science',
    specialization: 'Artificial Intelligence',
    status: 'available',
    image: 'https://i.pravatar.cc/150?u=sarah',
    email: 's.johnson@university.edu',
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    title: 'Professor',
    department: 'Information Systems',
    specialization: 'Data Science & Big Data',
    status: 'busy',
    image: 'https://i.pravatar.cc/150?u=michael',
    email: 'm.chen@university.edu',
  },
  {
    id: '3',
    name: 'Dr. Emily Brown',
    title: 'Associate Professor',
    department: 'Computer Science',
    specialization: 'Cybersecurity',
    status: 'available',
    image: 'https://i.pravatar.cc/150?u=emily',
    email: 'e.brown@university.edu',
  },
  {
    id: '4',
    name: 'Robert Wilson, M.Sc.',
    title: 'Lecturer',
    department: 'Software Engineering',
    specialization: 'Full-stack Development',
    status: 'away',
    image: 'https://i.pravatar.cc/150?u=robert',
    email: 'r.wilson@university.edu',
  },
  {
    id: '5',
    name: 'Dr. Jessica Lee',
    title: 'Senior Lecturer',
    department: 'Computer Science',
    specialization: 'Human-Computer Interaction',
    status: 'available',
    image: 'https://i.pravatar.cc/150?u=jessica',
    email: 'j.lee@university.edu',
  },
  {
    id: '6',
    name: 'Prof. David Miller',
    title: 'Professor',
    department: 'Information Technology',
    specialization: 'Cloud Computing',
    status: 'busy',
    image: 'https://i.pravatar.cc/150?u=david',
    email: 'd.miller@university.edu',
  },
];

export default function LecturerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = ['All', ...Array.from(new Set(LECTURERS.map((l) => l.department)))];

  const filteredLecturers = LECTURERS.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         l.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || l.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="bg-background font-body-base text-on-background min-h-screen">
      <TopNavBar />

      <main className="max-w-[1280px] mx-auto px-6 py-stack-lg">
        <div className="space-y-stack-lg">
          {/* Header Section */}
          <section className="space-y-4">
            <h1 className="font-display-lg text-4xl font-bold text-on-surface">Lecturers</h1>
            <p className="text-on-surface-variant max-w-2xl">
              Connect with our world-class faculty members. Find experts in your field of study, 
              view their availability, and reach out for academic guidance.
            </p>
          </section>

          {/* Search and Filters */}
          <section className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-outline-variant shadow-sm">
            <div className="relative w-full md:w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input
                type="text"
                placeholder="Search by name or specialization..."
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    selectedDept === dept
                      ? 'bg-primary text-on-primary shadow-md'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </section>

          {/* Lecturer Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLecturers.map((lecturer) => (
              <div
                key={lecturer.id}
                className="group bg-white border border-outline-variant rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="h-24 bg-gradient-to-r from-primary to-tertiary opacity-80 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="px-6 pb-6 flex-1 flex flex-col items-center -mt-12">
                  <div className="relative">
                    <img
                      src={lecturer.image}
                      alt={lecturer.name}
                      className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform"
                    />
                    <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                      lecturer.status === 'available' ? 'bg-secondary' : 
                      lecturer.status === 'busy' ? 'bg-error' : 'bg-outline'
                    }`}></div>
                  </div>

                  <div className="mt-4 text-center space-y-1">
                    <h3 className="font-headline-md text-xl font-bold text-on-surface">{lecturer.name}</h3>
                    <p className="text-sm font-medium text-primary uppercase tracking-wider">{lecturer.title}</p>
                    <p className="text-sm text-on-surface-variant font-medium">{lecturer.department}</p>
                  </div>

                  <div className="mt-4 w-full bg-surface-container-low p-3 rounded-xl border border-outline-variant/30 flex-1">
                    <p className="text-xs font-label-caps text-outline uppercase mb-1">Specialization</p>
                    <p className="text-sm text-on-surface font-medium">{lecturer.specialization}</p>
                  </div>

                  <div className="mt-6 w-full flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-surface-container-high text-on-surface font-semibold rounded-lg hover:bg-surface-variant transition-colors flex items-center justify-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-sm">mail</span>
                      Email
                    </button>
                    <button className="flex-1 px-4 py-2 bg-primary text-on-primary font-semibold rounded-lg hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-sm">chat</span>
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {filteredLecturers.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <span className="material-symbols-outlined text-6xl text-outline-variant">person_search</span>
              <h3 className="text-xl font-bold text-on-surface-variant">No lecturers found</h3>
              <p className="text-outline">Try adjusting your search or filters to find what you're looking for.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedDept('All'); }}
                className="text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-tertiary text-on-tertiary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group">
        <span className="material-symbols-outlined">help</span>
        <span className="absolute right-full mr-4 bg-on-surface text-white text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Contact Office</span>
      </button>
    </div>
  );
}
