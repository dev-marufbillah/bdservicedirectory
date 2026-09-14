import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_SERVICES } from '../data/mockData';
import type { Service, BrokenReport } from '../types';

interface ServiceContextType {
  services: Service[];
  reports: BrokenReport[];
  addService: (newService: Omit<Service, 'id'>) => void;
  updateService: (id: string, updatedData: Partial<Service>) => void;
  deleteService: (id: string) => void;
  toggleVerifyService: (id: string) => void;
  addReport: (serviceName: string, officialUrl: string, issueType: string, details: string) => void;
  resolveReport: (id: string) => void;
  deleteReport: (id: string) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

// v7 = ১৮টি ক্যাটাগরি + সম্পূর্ণ সেবা ডাটাবেস লোড হবে
const LOCAL_STORAGE_KEY_SERVICES = 'eksheba_services_data_v7';
const LOCAL_STORAGE_KEY_REPORTS = 'eksheba_reports_data_v7';

const sampleReports: BrokenReport[] = [
  {
    id: 'rep-1',
    serviceName: 'ই-ট্রেড লাইসেন্স পোর্টাল',
    officialUrl: 'https://etradelicense.gov.bd/',
    issueType: 'সার্ভার স্লো (Link Slow)',
    details: 'মাঝে মাঝে সার্ভিস পেজটি লোড হতে সময় নিচ্ছে।',
    date: '২০২৫-০২-২০',
    status: 'pending'
  }
];

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SERVICES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_SERVICES;
  });

  const [reports, setReports] = useState<BrokenReport[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_REPORTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return sampleReports;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_REPORTS, JSON.stringify(reports));
  }, [reports]);

  const addService = (newServiceData: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...newServiceData,
      id: `service-${Date.now()}`,
    };
    setServices((prev) => [newService, ...prev]);
  };

  const updateService = (id: string, updatedData: Partial<Service>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedData } : s))
    );
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleVerifyService = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, verified: !s.verified } : s))
    );
  };

  const addReport = (
    serviceName: string,
    officialUrl: string,
    issueType: string,
    details: string
  ) => {
    const newReport: BrokenReport = {
      id: `rep-${Date.now()}`,
      serviceName,
      officialUrl,
      issueType,
      details,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setReports((prev) => [newReport, ...prev]);
  };

  const resolveReport = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'resolved' } : r))
    );
  };

  const deleteReport = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <ServiceContext.Provider
      value={{
        services,
        reports,
        addService,
        updateService,
        deleteService,
        toggleVerifyService,
        addReport,
        resolveReport,
        deleteReport,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
};