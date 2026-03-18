import React, { useMemo, useState } from "react";

// CollegeDirectory.tsx
// A self-contained React component (TypeScript) that renders 100+ dummy college cards,
// dynamic search (by name, stream, location), card details modal, and course roadmap UI.
// Uses Tailwind CSS classes for styling. Default export a React component.

type College = {
  id: number;
  name: string;
  location: string;
  fees: string;
  streams: string[];
  campus: {
    placements: string;
    events: string;
    infrastructure: string;
  };
  reviews: { user: string; rating: number; comment: string }[];
};

const STREAM_POOL = [
  "B.Tech",
  "BBA",
  "MBA",
  "MBBS",
  "BSc",
  "BA",
  "BCA",
  "MCA",
  "M.Tech",
  "B.Com",
  "Law (LLB)",
  "Pharmacy",
  "Design",
  "Architecture",
  "Nursing",
];

function randomFrom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateCollege(i: number): College {
  const cityPool = [
    "Mumbai, Maharashtra",
    "Delhi",
    "Bengaluru, Karnataka",
    "Chennai, Tamil Nadu",
    "Kolkata, West Bengal",
    "Hyderabad, Telangana",
    "Pune, Maharashtra",
    "Jaipur, Rajasthan",
    "Lucknow, Uttar Pradesh",
    "Ahmedabad, Gujarat",
    "Chandigarh",
    "Bhopal, Madhya Pradesh",
    "Indore, Madhya Pradesh",
    "Nagpur, Maharashtra",
    "Visakhapatnam, Andhra Pradesh",
  ];

  const streamCount = 2 + (i % 4);
  const streams = Array.from({ length: streamCount }, (_, idx) =>
    STREAM_POOL[(i + idx) % STREAM_POOL.length]
  ).filter((v, idx) => idx === 0 || Math.random() > 0.25);

  const fees = `${50 + (i % 20) * 10}k - ${150 + (i % 30) * 10}k / year`;

  const reviews = Array.from({ length: 3 }, (_, r) => ({
    user: `Student ${i}-${r + 1}`,
    rating: Math.round(3 + Math.random() * 2),
    comment:
      [
        "Great campus life and supportive faculty.",
        "Placements are improving year on year.",
        "A few infrastructure upgrades needed, good labs though.",
        "Loved the clubs and events!",
        "Good value for money for the streams offered.",
      ][Math.floor(Math.random() * 5)],
  }));

  return {
    id: i,
    name: `Institute of Technology & Sciences ${i}`,
    location: randomFrom(cityPool),
    fees,
    streams,
    campus: {
      placements: `${60 + (i % 30)}% average placement rate, top recruiters include TCS, Infosys, Amazon`,
      events: "Annual tech fest, cultural nights, entrepreneurship cell events",
      infrastructure: "Modern labs, central library, hostels, sports complex",
    },
    reviews,
  };
}

// ✅ Featured College: NIST UNIVERSITY
const featuredCollege: College = {
  id: 0,
  name: "National Institute of Science and Technology University (NIST UNIVERSITY)",
  location: "Berhampur, Odisha",
  fees: "₹80k - ₹1.5L / year",
  streams: ["B.Tech", "MBA", "MCA", "BSc", "BBA"],
  campus: {
    placements:
      "90% average placement rate, top recruiters include Infosys, TCS, Wipro, Tech Mahindra, and Amazon.",
    events:
      "Annual Techno-Cultural Fest (Conoscenza), Hackathons, Entrepreneurship Drives, and Sports Meets.",
    infrastructure:
      "Modern digital classrooms, central library, advanced labs, research centers, hostels, sports complex, and innovation hub.",
  },
  reviews: [
    {
      user: "Student - Final Year",
      rating: 5,
      comment:
        "Excellent faculty support, great campus environment, and strong placement record.",
    },
    {
      user: "Alumni 2023",
      rating: 4,
      comment:
        "Infrastructure and learning resources are top-notch; helped me get placed in a reputed MNC.",
    },
    {
      user: "Student - 2nd Year",
      rating: 5,
      comment:
        "Balanced focus on academics, research, and extracurricular activities. Highly recommended.",
    },
  ],
};

// ✅ Combine featured college + generated colleges
const COLLEGES: College[] = [
  featuredCollege,
  ...Array.from({ length: 120 }, (_, i) => generateCollege(i + 1)),
];

export default function CollegeDirectory({ onBack }: { onBack?: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [selectedStream, setSelectedStream] = useState<string | null>(null);

  // Dynamic filtering: by name, stream, or location
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COLLEGES;

    return COLLEGES.filter((c) => {
      if (c.name.toLowerCase().includes(q)) return true;
      if (c.location.toLowerCase().includes(q)) return true;
      if (c.streams.some((s) => s.toLowerCase().includes(q))) return true;
      return false;
    });
  }, [query]);

  // Build stream roadmap data
  function buildRoadmapForStream(stream: string) {
    const roadmapBase: Record<string, any> = {
      "B.Tech": {
        steps: [
          "Complete 10+2 with PCM",
          "Prepare for JEE Main / State CET",
          "Take counselling and choose top institutes",
          "4-year undergraduate program",
        ],
        impact:
          "Software, Core Engineering, R&D roles. Average starting salary: ₹3.5L–₹12L depending on institute and skills.",
        popularity: 35,
        skills: ["Programming", "Mathematics", "Problem solving", "Electronics basics"],
        industries: ["IT", "Manufacturing", "Auto", "Aerospace", "Startups"],
      },
      MBA: {
        steps: [
          "Complete undergraduate degree",
          "Prepare for CAT / XAT / GMAT",
          "1–2 years full-time MBA at top B-schools",
          "Internships and final placements",
        ],
        impact:
          "Management, strategy, consulting roles. Average starting salary: ₹6L–₹25L at top schools.",
        popularity: 14,
        skills: ["Analytical thinking", "Communication", "Finance basics", "Leadership"],
        industries: ["Consulting", "Finance", "FMCG", "Tech product management"],
      },
      MBBS: {
        steps: [
          "Complete 10+2 with PCB",
          "Prepare for NEET",
          "5.5 years MBBS (including internship)",
          "Post-grad specialization (MD/MS) optional",
        ],
        impact:
          "Clinical practice, research, hospital roles. Starting salary varies widely, private hospitals pay higher.",
        popularity: 8,
        skills: ["Medicine knowledge", "Empathy", "Long-term focus", "Clinical skills"],
        industries: ["Healthcare", "Research", "Pharma"],
      },
    } as Record<string, any>;

    if (roadmapBase[stream]) return roadmapBase[stream];
    return {
      steps: ["Complete required eligibility", "Entrance / merit list if applicable", "Complete course duration"],
      impact: "Good career prospects depending on specialization.",
      popularity: Math.round(5 + Math.random() * 10),
      skills: ["Domain skills", "Communication", "Teamwork"],
      industries: ["Relevant industry 1", "Relevant industry 2"],
    };
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="px-3 py-2 rounded-md text-sm bg-white shadow-sm"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-semibold">Explore Colleges</h1>
            <p className="text-sm text-gray-500">Showing {filtered.length} results</p>
          </div>

          <div className="w-full max-w-md">
            <label className="relative block">
              <span className="sr-only">Search colleges</span>
              <input
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-200 rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Search by name, stream, or location..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <svg
                className="pointer-events-none absolute top-2 left-2 h-5 w-5 text-slate-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </label>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: College list */}
          <section className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {filtered.map((college) => (
                <article
                  key={college.id}
                  className={`bg-white rounded-2xl p-4 shadow hover:shadow-lg transition duration-150 ${
                    college.id === 0 ? "border-2 border-yellow-400" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-200 to-indigo-400 flex items-center justify-center text-white text-lg font-semibold">
                      {college.name
                        .split(" ")
                        .slice(0, 2)
                        .map((p) => p[0])
                        .join("")}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{college.name}</h3>
                      <p className="text-sm text-gray-600">{college.location}</p>

                      <div className="mt-2 text-sm text-gray-700">
                        <strong>Fees:</strong> {college.fees}
                      </div>

                      <div className="mt-2 text-sm text-gray-600">
                        <strong>Streams:</strong> {college.streams.slice(0, 3).join(", ")}
                      </div>

                      <div className="mt-3 flex items-center gap-2 justify-between">
                        <div className="text-sm text-gray-500">
                          Avg Review:{" "}
                          {(
                            college.reviews.reduce((s, r) => s + r.rating, 0) /
                            college.reviews.length
                          ).toFixed(1)}{" "}
                          / 5
                        </div>
                        <button
                          onClick={() => {
                            setSelectedCollege(college);
                            setSelectedStream(null);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm shadow"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Right: Details panel */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-2xl p-4 shadow">
                <h2 className="text-lg font-semibold mb-2">College Details</h2>
                {selectedCollege ? (
                  <div>
                    <h3 className="font-bold">{selectedCollege.name}</h3>
                    <p className="text-sm text-gray-600">{selectedCollege.location}</p>
                    <div className="mt-3 text-sm">
                      <strong>Fees:</strong> {selectedCollege.fees}
                      <div className="mt-2">
                        <strong>Campus:</strong>
                        <div className="text-xs text-gray-700 mt-1">
                          <div>
                            <strong>Placements:</strong> {selectedCollege.campus.placements}
                          </div>
                          <div>
                            <strong>Events:</strong> {selectedCollege.campus.events}
                          </div>
                          <div>
                            <strong>Infrastructure:</strong> {selectedCollege.campus.infrastructure}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <strong>Student Reviews</strong>
                        <div className="mt-2 space-y-2">
                          {selectedCollege.reviews.map((r, idx) => (
                            <div key={idx} className="text-sm border rounded p-2">
                              <div className="flex items-center justify-between">
                                <div className="font-semibold">{r.user}</div>
                                <div className="text-xs text-gray-600">{r.rating} / 5</div>
                              </div>
                              <div className="text-gray-700 mt-1">{r.comment}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3">
                        <strong>Available Streams</strong>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedCollege.streams.map((s) => (
                            <button
                              key={s}
                              onClick={() => setSelectedStream(s)}
                              className={`px-3 py-1 rounded-full border text-sm ${
                                selectedStream === s
                                  ? "bg-indigo-600 text-white border-indigo-600"
                                  : "bg-white text-gray-700 border-gray-200"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                      {selectedStream && (
                        <div className="mt-4 p-3 border rounded-lg bg-gray-50">
                          <h4 className="font-semibold">Roadmap: {selectedStream}</h4>
                          <Roadmap stream={selectedStream} />
                        </div>
                      )}
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedCollege(null);
                            setSelectedStream(null);
                          }}
                          className="px-3 py-2 rounded-md border"
                        >
                          Close
                        </button>
                        <a
                          className="px-3 py-2 rounded-md bg-emerald-600 text-white"
                          href="#apply"
                        >
                          Apply / Visit
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">
                    Select a college to view details. You can also search by stream (e.g. "B.Tech") or location.
                  </div>
                )}
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

// --- Roadmap Component ---
function Roadmap({ stream }: { stream: string }) {
  const data = useMemo(() => buildRoadmap(stream), [stream]);

  return (
    <div className="mt-3 space-y-3">
      <div>
        <h5 className="text-sm font-medium">Steps to pursue</h5>
        <ol className="list-decimal ml-5 text-sm mt-2 text-gray-700">
          {data.steps.map((s: string, idx: number) => (
            <li key={idx} className="mb-1">
              {s}
            </li>
          ))}
        </ol>
      </div>
      <div>
        <h5 className="text-sm font-medium">Career impact</h5>
        <p className="text-sm text-gray-700 mt-1">{data.impact}</p>
      </div>
      <div>
        <h5 className="text-sm font-medium">Popularity</h5>
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              style={{ width: `${data.popularity}%` }}
              className="h-4 rounded-full bg-gradient-to-r from-green-400 to-green-600"
            />
          </div>
          <div className="text-xs text-gray-600 mt-1">
            ~{data.popularity}% of students choose this stream
          </div>
        </div>
      </div>
      <div>
        <h5 className="text-sm font-medium">Skills required</h5>
        <div className="mt-2 flex flex-wrap gap-2">
          {data.skills.map((s: string) => (
            <span key={s} className="text-xs px-2 py-1 bg-white border rounded">
              {s}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h5 className="text-sm font-medium">Industries hiring</h5>
        <div className="mt-2 flex flex-wrap gap-2">
          {data.industries.map((s: string) => (
            <span key={s} className="text-xs px-2 py-1 bg-white border rounded">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Local roadmap builder ---
function buildRoadmap(stream: string) {
  const roadmapBase: Record<string, any> = {
    "B.Tech": {
      steps: [
        "Complete 10+2 with PCM",
        "Prepare for JEE Main / State CET",
        "Take counselling and choose top institutes",
        "4-year undergraduate program",
      ],
      impact:
        "Software, Core Engineering, R&D roles. Average starting salary: ₹3.5L–₹12L depending on institute and skills.",
      popularity: 35,
      skills: ["Programming", "Mathematics", "Problem solving", "Electronics basics"],
      industries: ["IT", "Manufacturing", "Auto", "Aerospace", "Startups"],
    },
    MBA: {
      steps: [
        "Complete undergraduate degree",
        "Prepare for CAT / XAT / GMAT",
        "1–2 years full-time MBA at top B-schools",
        "Internships and final placements",
      ],
      impact:
        "Management, strategy, consulting roles. Average starting salary: ₹6L–₹25L at top schools.",
      popularity: 14,
      skills: ["Analytical thinking", "Communication", "Finance basics", "Leadership"],
      industries: ["Consulting", "Finance", "FMCG", "Tech product management"],
    },
    MBBS: {
      steps: [
        "Complete 10+2 with PCB",
        "Prepare for NEET",
        "5.5 years MBBS (including internship)",
        "Post-grad specialization (MD/MS) optional",
      ],
      impact:
        "Clinical practice, research, hospital roles. Starting salary varies widely, private hospitals pay higher.",
      popularity: 8,
      skills: ["Medicine knowledge", "Empathy", "Long-term focus", "Clinical skills"],
      industries: ["Healthcare", "Research", "Pharma"],
    },
  } as Record<string, any>;

  if (roadmapBase[stream]) return roadmapBase[stream];

  return {
    steps: ["Complete required eligibility", "Entrance / merit list if applicable", "Complete course duration"],
    impact: "Good career prospects depending on specialization.",
    popularity: Math.round(5 + Math.random() * 20),
    skills: ["Domain skills", "Communication", "Teamwork"],
    industries: ["Relevant industry 1", "Relevant industry 2"],
  };
}
