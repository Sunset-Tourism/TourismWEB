"use client";

import { useEffect, useRef, useState } from "react";
import type { DragEvent } from "react";
import { MapPin, Navigation, TrendingUp, Camera } from "lucide-react";
import "./dashboard.css"; // Import dashboard-specific CSS

type SectionKey = "journey" | "progress";

type ActionPrompt = {
  section: SectionKey;
  message: string;
};

type QuickActionColor = "blue" | "green" | "purple" | "orange";

type QuickActionConfig = {
  label: string;
  color: QuickActionColor;
  icon: React.ReactNode;
  section: SectionKey;
  prompt: string;
};

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null);
  const [photoUploads, setPhotoUploads] = useState<Record<string, string>>({});
  const [userStats] = useState({
    bhutanPlaces: 18,
    bhutanDzongs: 9,
    bhutanDistance: 486,
    districtsCovered: 6,
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [highlightedSection, setHighlightedSection] =
    useState<SectionKey | null>(null);
  const [actionPrompt, setActionPrompt] = useState<ActionPrompt | null>(null);
  const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const journeyLogRef = useRef<HTMLDivElement | null>(null);
  const progressSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) {
        clearTimeout(highlightTimerRef.current);
      }
    };
  }, []);
  const mindfulProgress = [
    {
      label: "District coverage",
      current: userStats.districtsCovered,
      goal: 20,
    },
    { label: "Sacred sites journaled", current: 14, goal: 30 },
    { label: "Nature treks logged", current: 9, goal: 18 },
  ];

  const formatDistance = (distanceKm: number) => {
    if (distanceKm >= 100) {
      return `${distanceKm.toLocaleString()} km`;
    }
    return `${distanceKm.toFixed(1)} km`;
  };

  const buildPhotoKey = (place: string, label: string) => `${place}::${label}`;

  const sanitizeForId = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const getPhotoInputId = (place: string, label: string) =>
    `photo-upload-${sanitizeForId(`${place}-${label}`)}`;

  const handlePhotoFiles = (
    place: string,
    label: string,
    files: FileList | null,
  ) => {
    if (!files?.length) {
      return;
    }

    const [file] = files;
    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    const photoKey = buildPhotoKey(place, label);
    reader.onload = () => {
      setPhotoUploads((prev) => ({
        ...prev,
        [photoKey]: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoDrop = (
    event: DragEvent<HTMLLabelElement>,
    place: string,
    label: string,
  ) => {
    event.preventDefault();
    handlePhotoFiles(place, label, event.dataTransfer?.files ?? null);
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";
    }
  };

  const bhutanJourney = [
    {
      place: "Paro Taktsang",
      district: "Paro",
      distanceKm: 6.4,
      elevation: "3,120 m cliffside",
      mood: "Sunrise pilgrimage",
      overview:
        "Tracked ascent time, rest points, and prayer flag stops to compare stamina across seasons.",
      insight: {
        bestSeason: "March - May for clear ridgelines",
        essentials: ["Hydration tabs", "Prayer scarf", "Layered fleece"],
        community:
          "Donated notebooks to nearby Shari village school—log keeps contact info + follow-ups.",
        photos: [
          { label: "Taktsang ridge overlook", src: undefined },
          { label: "Prayer flag checkpoint", src: undefined },
        ],
      },
    },
    {
      place: "Dochula → Punakha",
      district: "Thimphu & Punakha",
      distanceKm: 51.2,
      elevation: "3,100 m mountain pass",
      mood: "Cloud-forest drive",
      overview:
        "Recorded cloud cover, Druk Wangyel chorten visits, and river levels entering Punakha valley.",
      insight: {
        bestSeason: "Oct - Dec for Himalayan vistas",
        essentials: ["Prayer flags", "Wide-angle lens", "Thermal flask"],
        community:
          "Planted two saplings via Royal Botanical Park volunteer drive; reminders stored in app.",
        photos: [
          { label: "Dochula chortens", src: undefined },
          { label: "Punakha Dzong bridge", src: undefined },
        ],
      },
    },
    {
      place: "Gangtey Nature Trail",
      district: "Wangdue",
      distanceKm: 4.1,
      elevation: "2,900 m wetlands",
      mood: "Crane migration journal",
      overview:
        "Pinned black-necked crane sightings with timestamps and shared with local conservation club.",
      insight: {
        bestSeason: "Nov - Feb when cranes roost",
        essentials: ["Binoculars", "Soft-soled shoes", "Windproof shell"],
        community:
          "Support Gangtey school canteen—app tracks contribution receipts + next visit dates.",
        photos: [
          { label: "Black-necked cranes", src: undefined },
          { label: "Valley boardwalk", src: undefined },
        ],
      },
    },
    {
      place: "Bumthang Cultural Circuit",
      district: "Bumthang",
      distanceKm: 160,
      elevation: "2,600 m valleys",
      mood: "Heritage immersion",
      overview:
        "Linked Kurje, Tamshing, and textile studios into one narrative thread with audio notes.",
      insight: {
        bestSeason: "Sept tshechu festivals",
        essentials: [
          "Audio recorder",
          "Kira fabric samples",
          "Light rain jacket",
        ],
        community:
          "Documented artisans to revisit for custom weaves; contact list synced to dashboard.",
        photos: [
          { label: "Kurje Lhakhang courtyard", src: undefined },
          { label: "Bumthap farmhouse stay", src: undefined },
        ],
      },
    },
  ];

  const impactHighlights = [
    {
      title: "Community connections",
      detail:
        "4 host families logged with contact reminders for return journeys.",
    },
    {
      title: "Cultural gifts tracked",
      detail:
        "12 butter-lamp offerings + school supplies recorded for future giving.",
    },
    {
      title: "Wellness stats",
      detail:
        "Avg 11,200 steps/day on treks with rest + acclimatization notes.",
    },
  ];

  const quickActions: QuickActionConfig[] = [
    {
      label: "Log new village",
      color: "blue",
      icon: <MapPin />,
      section: "journey",
      prompt:
        "Journey log is ready—tap any View insight to capture the new village details.",
    },
    {
      label: "Track distance",
      color: "green",
      icon: <Navigation />,
      section: "progress",
      prompt:
        "Bhutan pulse is highlighted so you can append trek and drive totals.",
    },
    {
      label: "Add photo story",
      color: "purple",
      icon: <Camera />,
      section: "journey",
      prompt:
        "Open an insight in the journey log and drop your next photo story.",
    },
  ];

  const scrollToSection = (section: SectionKey) => {
    const targetElement =
      section === "journey"
        ? journeyLogRef.current
        : progressSectionRef.current;

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleQuickAction = (action: QuickActionConfig) => {
    scrollToSection(action.section);
    setHighlightedSection(action.section);
    setActionPrompt({ section: action.section, message: action.prompt });

    if (highlightTimerRef.current) {
      clearTimeout(highlightTimerRef.current);
    }

    highlightTimerRef.current = setTimeout(() => {
      setHighlightedSection((current) =>
        current === action.section ? null : current,
      );
      setActionPrompt((current) =>
        current?.section === action.section ? null : current,
      );
    }, 2600);
  };

  const activeInsight =
    selectedInsight !== null ? bhutanJourney[selectedInsight] : null;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div>
            <h1 className="dashboard-title">Bhutan Travel Dashboard</h1>
            <p className="dashboard-subtitle">
              Everything here is Bhutan-specific—district coverage, dzongs, and
              treks I log only within the country.
            </p>
          </div>
          <div className="dashboard-time">
            <p className="dashboard-time-label">Current Time</p>
            <p className="dashboard-time-value">
              {currentTime.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      {/* User Stats Cards */}
      <div className="dashboard-stats-grid">
        <UserStatCard
          title="Places logged"
          value={`${userStats.bhutanPlaces} spots`}
          subtitle={`${userStats.districtsCovered} districts covered`}
          icon={<MapPin className="dashboard-card-icon" />}
        />
        <UserStatCard
          title="Dzongs + monasteries"
          value={userStats.bhutanDzongs.toString()}
          subtitle="Documented with rituals + offerings"
          icon={<TrendingUp className="dashboard-card-icon" />}
        />
        <UserStatCard
          title="Distance in Bhutan"
          value={`${userStats.bhutanDistance} km`}
          subtitle="Hikes + drives tracked"
          icon={<Navigation className="dashboard-card-icon" />}
        />
      </div>

      {/* Bhutan Progress Snapshot */}
      <section
        className={`bhutan-progress-section ${
          highlightedSection === "progress" ? "section-highlight" : ""
        }`}
        ref={progressSectionRef}
      >
        <h2 className="dashboard-card-title">
          <TrendingUp className="dashboard-card-icon" />
          Bhutan pulse
        </h2>
        {actionPrompt?.section === "progress" && (
          <div className="action-prompt-banner">{actionPrompt.message}</div>
        )}
        <div className="bhutan-progress-grid">
          {mindfulProgress.map((metric) => {
            const percent = Math.min(
              Math.round((metric.current / metric.goal) * 100),
              100,
            );
            return (
              <div key={metric.label} className="bhutan-progress-card">
                <p className="bhutan-progress-label">{metric.label}</p>
                <p className="bhutan-progress-value">
                  {metric.current} / {metric.goal}
                </p>
                <div className="bhutan-progress-bar">
                  <div style={{ width: `${percent}%` }} />
                </div>
                <span className="bhutan-progress-caption">
                  {percent}% of personal goal
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="dashboard-content-grid">
        <div
          className={`dashboard-chart-card ${
            highlightedSection === "journey" ? "section-highlight" : ""
          }`}
          ref={journeyLogRef}
        >
          <h2 className="dashboard-card-title">
            <MapPin className="dashboard-card-icon" />
            Bhutan journey log
          </h2>
          {actionPrompt?.section === "journey" && (
            <div className="action-prompt-banner">{actionPrompt.message}</div>
          )}
          <p className="journey-log-intro">
            Every entry is a Bhutan story—open an insight to view rituals,
            essentials, and on-the-ground logistics.
          </p>
          <div className="journey-log-list">
            {bhutanJourney.map((entry, index) => (
              <div key={entry.place} className="journey-log-item">
                <div className="journey-log-header">
                  <div>
                    <p className="journey-log-place">{entry.place}</p>
                    <p className="journey-log-district">{entry.district}</p>
                  </div>
                  <button
                    className="journey-view-btn"
                    onClick={() => setSelectedInsight(index)}
                  >
                    View insight
                  </button>
                </div>
                <div className="journey-metrics">
                  <span className="journey-distance">
                    {formatDistance(entry.distanceKm)} recorded
                  </span>
                  <span className="journey-elevation">{entry.elevation}</span>
                  <span className="journey-mood">{entry.mood}</span>
                </div>
                <p className="journey-overview">{entry.overview}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-activity-grid">
        <div className="dashboard-side-card impact-card">
          <h2 className="dashboard-card-title">
            <TrendingUp className="dashboard-card-icon" />
            Impact highlights
          </h2>
          <div className="impact-list">
            {impactHighlights.map((item) => (
              <div key={item.title} className="impact-item">
                <p className="impact-title">{item.title}</p>
                <p className="impact-detail">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-side-card perspective-card">
          <h2 className="dashboard-card-title">
            <Navigation className="dashboard-card-icon" />
            How I use this log
          </h2>
          <p className="perspective-intro">
            This dashboard is purely for Bhutan: it lets me compare dzongs,
            track distances, and see where points should go next.
          </p>
          <div className="perspective-list">
            <span className="perspective-pill">
              Bhutan-only stats + rituals remembered
            </span>
            <span className="perspective-pill">
              Journey insights open as reference before each trip
            </span>
          </div>
          <p className="perspective-note">
            Even if I travel elsewhere, I run a separate dashboard. This one is
            dedicated to Bhutan so nothing competes with it.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-quick-actions-card">
        <h2 className="dashboard-card-title">Quick Actions</h2>
        <div className="dashboard-quick-actions-grid">
          {quickActions.map((action) => (
            <UserQuickAction
              key={action.label}
              icon={action.icon}
              label={action.label}
              color={action.color}
              onClick={() => handleQuickAction(action)}
            />
          ))}
        </div>
      </div>

      {activeInsight && (
        <div
          className="journey-insight-overlay"
          onClick={() => setSelectedInsight(null)}
        >
          <div
            className="journey-insight-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="journey-insight-close"
              onClick={() => setSelectedInsight(null)}
              aria-label="Close insight"
            >
              ✕
            </button>
            <p className="journey-insight-eyebrow">Bhutan insight</p>
            <h3 className="journey-insight-title">{activeInsight.place}</h3>
            <p className="journey-insight-district">{activeInsight.district}</p>
            <div className="journey-insight-tags">
              <span>{formatDistance(activeInsight.distanceKm)}</span>
              <span>{activeInsight.elevation}</span>
              <span>{activeInsight.mood}</span>
            </div>
            <p className="journey-insight-overview">{activeInsight.overview}</p>

            <div className="journey-insight-grid">
              <div>
                <p className="journey-insight-label">Best season</p>
                <p className="journey-insight-value">
                  {activeInsight.insight.bestSeason}
                </p>
              </div>
              <div>
                <p className="journey-insight-label">Recommended kit</p>
                <ul className="journey-insight-list">
                  {activeInsight.insight.essentials.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {activeInsight.insight.photos &&
              activeInsight.insight.photos.length > 0 && (
                <div className="journey-insight-photos">
                  {activeInsight.insight.photos.map((photo) => {
                    const photoKey = buildPhotoKey(
                      activeInsight.place,
                      photo.label,
                    );
                    const storedImage = photoUploads[photoKey];
                    const displaySrc = storedImage || photo.src;
                    const inputId = getPhotoInputId(
                      activeInsight.place,
                      photo.label,
                    );

                    return (
                      <div key={photo.label} className="journey-insight-photo">
                        <label
                          htmlFor={inputId}
                          className={`journey-insight-photo-dropzone${
                            displaySrc ? " has-image" : ""
                          }`}
                          onDragOver={handleDragOver}
                          onDrop={(event) =>
                            handlePhotoDrop(
                              event,
                              activeInsight.place,
                              photo.label,
                            )
                          }
                        >
                          <input
                            id={inputId}
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(event) =>
                              handlePhotoFiles(
                                activeInsight.place,
                                photo.label,
                                event.target.files,
                              )
                            }
                          />
                          {displaySrc ? (
                            <>
                              <img
                                src={displaySrc}
                                alt={`${activeInsight.place} – ${photo.label}`}
                              />
                              <span className="photo-drop-hint">
                                Drop or click to replace
                              </span>
                            </>
                          ) : (
                            <div className="journey-insight-photo-placeholder">
                              <Camera size={28} />
                              <span>{photo.label}</span>
                              <small>Drop an image or click to upload</small>
                            </div>
                          )}
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}

            <div className="journey-insight-note">
              <p className="journey-insight-label">Community follow-up</p>
              <p className="journey-insight-value">
                {activeInsight.insight.community}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type UserStatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
};

function UserStatCard({ title, value, subtitle, icon }: UserStatCardProps) {
  return (
    <div className="dashboard-stat-card dashboard-user-stat-card">
      <div className="dashboard-stat-header">
        <div className="dashboard-stat-icon">{icon}</div>
      </div>
      <h3 className="dashboard-stat-title">{title}</h3>
      <p className="dashboard-stat-value">{value}</p>
      <p className="dashboard-stat-subtitle">{subtitle}</p>
    </div>
  );
}

type UserQuickActionProps = {
  icon: React.ReactNode;
  label: string;
  color: QuickActionColor;
  onClick: () => void;
};

function UserQuickAction({
  icon,
  label,
  color,
  onClick,
}: UserQuickActionProps) {
  return (
    <button
      className={`dashboard-quick-action-btn dashboard-quick-action-${color}`}
      onClick={onClick}
      type="button"
    >
      <div className="dashboard-quick-action-icon">{icon}</div>
      <span className="dashboard-quick-action-label">{label}</span>
    </button>
  );
}
