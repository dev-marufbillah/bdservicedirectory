import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SEOHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === '/') {
      document.title = 'বাংলাদেশ সার্ভিস ডিরেক্টরি | সরকারি সেবা, এক জায়গা থেকে';
    } else if (path === '/services') {
      document.title = 'সকল সরকারি সেবা | বাংলাদেশ সার্ভিস ডিরেক্টরি';
    } else if (path === '/categories') {
      document.title = 'সকল বিভাগ | বাংলাদেশ সার্ভিস ডিরেক্টরি';
    } else if (path.startsWith('/categories/')) {
      const slug = path.split('/categories/')[1];
      document.title = `${slug.toUpperCase()} সেবাসমূহ | বাংলাদেশ সার্ভিস ডিরেক্টরি`;
    } else if (path.startsWith('/services/')) {
      const slug = path.split('/services/')[1];
      document.title = `${slug.toUpperCase()} | অফিশিয়াল সরকারি ওয়েবসাইট | বাংলাদেশ সার্ভিস ডিরেক্টরি`;
    } else if (path === '/search') {
      document.title = 'অনুসন্ধান ফলাফল | বাংলাদেশ সার্ভিস ডিরেক্টরি';
    } else if (path === '/help') {
      document.title = 'সহায়তা ও জিজ্ঞাসিত প্রশ্নাবলী | বাংলাদেশ সার্ভিস ডিরেক্টরি';
    } else if (path === '/about') {
      document.title = 'আমাদের সম্পর্কে | বাংলাদেশ সার্ভিস ডিরেক্টরি';
    } else if (path === '/contact') {
      document.title = 'যোগাযোগ | বাংলাদেশ সার্ভিস ডিরেক্টরি';
    } else if (path === '/report-broken-link') {
      document.title = 'ব্রোকেন লিংক রিপোর্ট | বাংলাদেশ সার্ভিস ডিরেক্টরি';
    } else if (path === '/login') {
      document.title = 'লগইন ও নিবন্ধন | বাংলাদেশ সার্ভিস ডিরেক্টরি';
    } else if (path === '/admin') {
      document.title = 'অ্যাডমিন ড্যাশবোর্ড | বাংলাদেশ সার্ভিস ডিরেক্টরি';
    } else {
      document.title = 'পেজ পাওয়া যায়নি | বাংলাদেশ সার্ভিস ডিরেক্টরি';
    }
  }, [location]);

  return null;
};