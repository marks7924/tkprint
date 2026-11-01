'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CommunityGallerySection } from '@/components/CommunityGallerySection';

export default function CommunityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-4">
        <CommunityGallerySection />
      </main>

      <Footer />
    </div>
  );
}
