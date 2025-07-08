import React, { useState, useRef, useEffect } from "react";

const projects = [
  {
    status: "Waiting for Jammer",
    statusColor: "bg-[#feefd0] text-[#faad14]",
    title: "Mobile app for fitness startup",
    description:
      "Playwrite is an online exam prep platform that helps Primary 3-6 students (9-12 years old) master PSLE English with regular practice and AI feedback.",
    tag: "Mobile App",
    date: "Nov 13, 2023",
  },
  {
    status: "Completed",
    statusColor: "bg-[#d1e9ff] text-[#628ef8]",
    title: "Mobile app for fitness startup",
    description:
      "Playwrite is an online exam prep platform that helps Primary 3-6 students (9-12 years old) master PSLE English with regular practice and AI feedback.",
    tag: "Mobile App",
    date: "Nov 13, 2023",
  },
  {
    status: "Completed",
    statusColor: "bg-[#d1e9ff] text-[#628ef8]",
    title: "Mobile app for fitness startup",
    description:
      "Playwrite is an online exam prep platform that helps Primary 3-6 students (9-12 years old) master PSLE English with regular practice and AI feedback.",
    tag: "Mobile App",
    date: "Nov 13, 2023",
  },
  {
    status: "Waiting for Jammer",
    statusColor: "bg-[#feefd0] text-[#faad14]",
    title: "Mobile app for fitness startup",
    description:
      "Playwrite is an online exam prep platform that helps Primary 3-6 students (9-12 years old) master PSLE English with regular practice and AI feedback.",
    tag: "Mobile App",
    date: "Nov 13, 2023",
  },
  {
    status: "In Response",
    statusColor: "bg-[#cdeadd] text-[#039855]",
    title: "Mobile app for fitness startup",
    description:
      "Playwrite is an online exam prep platform that helps Primary 3-6 students (9-12 years old) master PSLE English with regular practice and AI feedback.",
    tag: "Mobile App",
    date: "Nov 13, 2023",
  },
  {
    status: "Draft",
    statusColor: "bg-[#eaecf0] text-[#667085]",
    title: "Mobile app for fitness startup",
    description:
      "Playwrite is an online exam prep platform that helps Primary 3-6 students (9-12 years old) master PSLE English with regular practice and AI feedback.",
    tag: "Mobile App",
    date: "Nov 13, 2023",
  },
];

function Toggle() {
  return (
    <div className="relative w-11 h-6">
      <div className="absolute bg-[#cecece] inset-0 rounded-[40px]" />
      <div className="absolute left-[6.8%] top-[12.5%] bottom-[12.5%] right-[52.3%]">
        <svg className="block w-full h-full" fill="none" viewBox="0 0 18 18">
          <circle cx="9" cy="9" r="9" fill="white" />
        </svg>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="bg-[#f7f5f0] min-h-screen font-gilroy">
      {/* Top Bar */}
      <div className="bg-[#f7f5f0] shadow-sm w-full">
        <div className="flex flex-row items-center w-full px-28 py-8 justify-between">
          {/* Logo */}
          <div className="flex flex-row gap-[18px] items-center">
            <div className="h-[46px] w-[104px]">
              {/* Replace with your logo SVG or img */}
              <img src="/logo.png" alt="Logo" className="h-full w-full object-contain" />
            </div>
            <div className="h-[19px] w-[62px]" />
          </div>
          {/* User Dropdown */}
          <div className="flex flex-row gap-3 items-center h-12 relative" ref={dropdownRef}>
            <button
              className="flex flex-row gap-3 items-center focus:outline-none"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <div className="w-12 h-12 rounded-full bg-[#EEE] overflow-hidden">
                {/* Replace with user avatar */}
                <img src="/public/assets/images/default_profile_image.png" alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <div className="text-[#051d56] text-[16px] font-semibold leading-[22px]">Justin Chong</div>
              </div>
              <svg className={`w-4 h-4 ml-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 20 20">
                <path d="M6 8l4 4 4-4" stroke="#051D56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-16 z-10 w-48 bg-white rounded-xl shadow-lg border border-[#eaecf0] py-2 animate-fade-in">
                <button className="w-full text-left px-4 py-2 text-[#051d56] hover:bg-[#f7f5f0] font-gilroy text-[16px]">Profile</button>
                <button className="w-full text-left px-4 py-2 text-[#051d56] hover:bg-[#f7f5f0] font-gilroy text-[16px]">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="w-full px-28 py-[30px]">
        {/* Greeting and Create Button */}
        <div className="flex flex-row items-center justify-between w-full mb-[30px]">
          <div className="text-[24px] font-bold text-[#000] leading-[28px] font-gilroy">Good morning, Justin</div>
          <button className="bg-[#7ad38e] flex flex-row gap-2 items-center px-7 py-2.5 rounded-[22px]">
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 12 12">
              <path d="M12 6.85714H6.85714V12H5.14286V6.85714H0V5.14286H5.14286V0H6.85714V5.14286H12V6.85714Z" fill="#051D56" />
            </svg>
            <span className="text-[#051d56] text-[16px] font-semibold leading-[20px]">Create Projects</span>
          </button>
        </div>
        {/* Projects Card List */}
        <div className="flex flex-wrap gap-8 w-full">
          {projects.map((project, i) => (
            <div key={i} className="bg-white rounded-2xl w-[362px] relative border border-[#eaecf0] flex flex-col gap-6 p-5">
              {/* Status */}
              <div className="flex flex-row items-center justify-between w-full">
                <div className={`rounded px-1 pt-1 pb-0.5 text-[12px] font-semibold leading-[18px] ${project.statusColor}`}>{project.status}</div>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 15 4">
                  <path d="M7.5 0C7.17 0 6.85 0.1 6.57 0.28C6.3 0.46 6.09 0.72 5.96 1.03C5.83 1.33 5.8 1.67 5.87 1.99C5.93 2.32 6.09 2.61 6.32 2.85C6.55 3.08 6.85 3.24 7.17 3.3C7.5 3.37 7.83 3.33 8.14 3.21C8.44 3.08 8.7 2.87 8.89 2.59C9.07 2.32 9.17 2 9.17 1.67C9.17 1.22 8.99 0.8 8.68 0.49C8.37 0.18 7.94 0 7.5 0ZM1.67 0C1.34 0 1.01 0.1 0.74 0.28C0.47 0.46 0.25 0.72 0.13 1.03C0 1.33 -0.03 1.67 0.03 1.99C0.1 2.32 0.26 2.61 0.49 2.85C0.72 3.08 1.02 3.24 1.34 3.3C1.66 3.37 2 3.33 2.3 3.21C2.61 3.08 2.87 2.87 3.05 2.59C3.24 2.32 3.33 2 3.33 1.67C3.33 1.22 3.16 0.8 2.85 0.49C2.53 0.18 2.11 0 1.67 0ZM13.33 0C13 0 12.68 0.1 12.41 0.28C12.13 0.46 11.92 0.72 11.79 1.03C11.67 1.33 11.63 1.67 11.7 1.99C11.76 2.32 11.92 2.61 12.15 2.85C12.39 3.08 12.68 3.24 13.01 3.3C13.33 3.37 13.67 3.33 13.97 3.21C14.28 3.08 14.54 2.87 14.72 2.59C14.9 2.32 15 2 15 1.67C15 1.22 14.82 0.8 14.51 0.49C14.2 0.18 13.78 0 13.33 0Z" fill="#475467" />
                </svg>
              </div>
              {/* Title/Description */}
              <div className="flex flex-col gap-1 w-full">
                <div className="text-[20px] font-semibold leading-[24px] text-[#1d2939]">{project.title}</div>
                <div className="text-[14px] text-[#475467] leading-[20px] h-10 overflow-hidden text-ellipsis">{project.description}</div>
              </div>
              {/* Stats */}
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row gap-2 items-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 15 15">
                    <path d="M10.3 4.5L10.3 4.5M12.4 1.3L8.55 1C8.21 0.98 7.87 1.1 7.62 1.34L1.34 7.62C0.88 8.08 0.88 8.83 1.34 9.29L5.51 13.46C5.97 13.92 6.72 13.92 7.18 13.46L13.46 7.18C13.7 6.93 13.82 6.59 13.8 6.25L13.5 2.38C13.45 1.81 12.99 1.35 12.42 1.3Z" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[14px] text-[#475467]">{project.tag}</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 13 14">
                    <path d="M3.67 10.48V10.43M6.67 10.48V10.43M6.67 7.69V7.63M9.33 7.69V7.63M1.67 4.94H11M2.87 1V2.03M9.67 1V2.03M9.67 2.03H3C1.9 2.03 1 2.95 1 4.09V10.94C1 12.08 1.9 13 3 13H9.67C10.77 13 11.67 12.08 11.67 10.94V4.09C11.67 2.95 10.77 2.03 9.67 2.03Z" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[14px] text-[#475467]">{project.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex flex-row gap-2 items-center mt-8">
          <button className="w-5 h-5 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 7 12">
              <path d="M0.25 6.25L5 10.92C5.33 11.25 5.83 11.25 6.17 10.92C6.5 10.58 6.5 10.08 6.17 9.75L2.08 5.58L6.17 1.42C6.5 1.08 6.5 0.58 6.17 0.25C6 0.08 5.83 0 5.58 0C5.33 0 5.17 0.08 5 0.25L0.25 4.92C-0.08 5.33 -0.08 5.83 0.25 6.25Z" fill="#D0D5DD" />
            </svg>
          </button>
          <div className="flex flex-row gap-1 items-center">
            <span className="bg-[#7ad38e] rounded-[60px] w-6 h-6 flex items-center justify-center text-[14px] font-semibold text-black">1</span>
            <span className="w-6 h-6 flex items-center justify-center text-[14px] text-[#667085]">2</span>
            <span className="w-6 h-6 flex items-center justify-center text-[14px] text-[#667085]">3</span>
            <span className="w-6 h-6 flex items-center justify-center text-[14px] text-[#667085]">4</span>
          </div>
          <button className="w-5 h-5 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 7 12">
              <path d="M6.14 4.95L1.43 0.25C1.35 0.17 1.26 0.11 1.15 0.06C1.05 0.02 0.94 0 0.83 0C0.72 0 0.62 0.02 0.51 0.06C0.41 0.11 0.32 0.17 0.24 0.25C0.09 0.4 0 0.61 0 0.83C0 1.05 0.09 1.27 0.24 1.42L4.37 5.59L0.24 9.71C0.09 9.87 0 10.08 0 10.3C0 10.52 0.09 10.73 0.24 10.89C0.32 10.97 0.41 11.03 0.51 11.07C0.61 11.12 0.72 11.14 0.83 11.14C0.94 11.14 1.05 11.12 1.15 11.07C1.26 11.03 1.35 10.97 1.43 10.89L6.14 6.18C6.23 6.1 6.29 6.01 6.34 5.9C6.39 5.8 6.41 5.68 6.41 5.57C6.41 5.45 6.39 5.34 6.34 5.23C6.29 5.13 6.23 5.03 6.14 4.95Z" fill="#475467" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
// Add to your global CSS: @font-face for Gilroy, or ensure Tailwind config includes it.
