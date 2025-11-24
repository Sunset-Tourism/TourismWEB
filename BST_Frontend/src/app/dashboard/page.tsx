"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Calendar,
  Heart,
  Clock,
  Star,
  Plane,
  Camera,
  Award,
  TrendingUp,
  Bookmark,
  Users,
  Navigation,
  X,
} from "lucide-react";
import "./dashboard.css"; // Import dashboard-specific CSS

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userStats] = useState({
    tripsCompleted: 12,
    countriesVisited: 8,
    upcomingTrips: 3,
    rewardPoints: 2450,
  });
  const [selectedDestination, setSelectedDestination] = useState<number | null>(
    null
  );

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const upcomingTrips = [
    {
      id: "TR001",
      destination: "Paris, France",
      startDate: "2024-02-15",
      endDate: "2024-02-22",
      status: "confirmed",
      image: "/paris.jpg",
      daysLeft: 12,
    },
    {
      id: "TR002",
      destination: "Tokyo, Japan",
      startDate: "2024-03-10",
      endDate: "2024-03-18",
      status: "pending",
      image: "/tokyo.jpg",
      daysLeft: 35,
    },
    {
      id: "TR003",
      destination: "Bali, Indonesia",
      startDate: "2024-04-05",
      endDate: "2024-04-12",
      status: "confirmed",
      image: "/bali.jpg",
      daysLeft: 61,
    },
  ];

  const savedDestinations = [
    {
      name: "Paro Taktsang (Tiger's Nest)",
      saves: "3.2k travelers",
      images: [
        "/tigers-nest-1.jpg",
        "/tigers-nest-2.jpg",
        "/tigers-nest-3.jpg",
      ],
      description:
        "Perched dramatically on a cliff 900m above Paro valley, this iconic monastery is Bhutan's most revered spiritual site. The challenging hike rewards visitors with breathtaking views and profound spiritual atmosphere.",
      highlights: [
        "Sacred Monastery",
        "Cliff-side Hike",
        "Panoramic Views",
        "Buddhist Heritage",
      ],
    },
    {
      name: "Punakha Dzong",
      saves: "2.8k travelers",
      images: ["/punakha-1.jpg", "/punakha-2.jpg", "/punakha-3.jpg"],
      description:
        "The 'Palace of Great Happiness' stands majestically at the confluence of two rivers. This architectural masterpiece serves as the winter residence of the Je Khenpo and houses sacred relics.",
      highlights: [
        "Royal Palace",
        "River Confluence",
        "Jacaranda Gardens",
        "Traditional Architecture",
      ],
    },
    {
      name: "Thimphu Valley",
      saves: "2.1k travelers",
      images: ["/thimphu-1.jpg", "/thimphu-2.jpg", "/thimphu-3.jpg"],
      description:
        "Bhutan's capital seamlessly blends tradition with modernity. Explore the impressive Buddha Dordenma statue, bustling weekend markets, and traditional handicraft centers in this unique mountain city.",
      highlights: [
        "Buddha Dordenma",
        "Weekend Market",
        "National Memorial Chorten",
        "City Life",
      ],
    },
    {
      name: "Phobjikha Valley",
      saves: "1.5k travelers",
      images: ["/phobjikha-1.jpg", "/phobjikha-2.jpg", "/phobjikha-3.jpg"],
      description:
        "A glacial valley of stunning natural beauty, famous for the endangered black-necked cranes that migrate here each winter. Experience pristine landscapes and authentic Bhutanese village life.",
      highlights: [
        "Black-necked Cranes",
        "Valley Hikes",
        "Gangtey Monastery",
        "Rural Villages",
      ],
    },
  ];

  const recentActivity = [
    {
      type: "booking",
      message: "Booked Paris Adventure Package",
      time: "2 hours ago",
      icon: "plane",
    },
    {
      type: "review",
      message: "Reviewed your trip to Dubai",
      time: "1 day ago",
      icon: "star",
    },
    {
      type: "save",
      message: "Saved 'Swiss Alps Winter Tour'",
      time: "3 days ago",
      icon: "bookmark",
    },
  ];

  const achievements = [
    {
      title: "Explorer",
      description: "Visited 5+ countries",
      earned: true,
    },
    {
      title: "Adventure Seeker",
      description: "Completed 10 trips",
      earned: true,
    },
    {
      title: "Early Bird",
      description: "Book 3 months in advance",
      earned: false,
    },
    {
      title: "Photo Master",
      description: "Upload 50+ photos",
      earned: true,
    },
  ];

  const travelPreferences = [
    { category: "Beach", percentage: 65 },
    { category: "Adventure", percentage: 45 },
    { category: "Culture", percentage: 80 },
    { category: "City", percentage: 55 },
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div>
            <h1 className="dashboard-title">My Travel Dashboard</h1>
            <p className="dashboard-subtitle">
              Welcome back, Explorer! Plan your next adventure
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
          title="Trips Completed"
          value={userStats.tripsCompleted.toString()}
          subtitle="This year"
          icon={<Plane className="dashboard-card-icon" />}
        />
        <UserStatCard
          title="Countries Visited"
          value={userStats.countriesVisited.toString()}
          subtitle="Lifetime"
          icon={<MapPin className="dashboard-card-icon" />}
        />
        <UserStatCard
          title="Upcoming Trips"
          value={userStats.upcomingTrips.toString()}
          subtitle="Next 6 months"
          icon={<Calendar className="dashboard-card-icon" />}
        />
        <UserStatCard
          title="Reward Points"
          value={userStats.rewardPoints.toLocaleString()}
          subtitle="Available to redeem"
          icon={<Award className="dashboard-card-icon" />}
        />
      </div>

      {/* Upcoming Trips & Saved Destinations */}
      <div className="dashboard-content-grid">
        {/* Upcoming Trips */}
        <div className="dashboard-chart-card">
          <h2 className="dashboard-card-title">
            <Calendar className="dashboard-card-icon" />
            Upcoming Trips
          </h2>
          <div className="dashboard-upcoming-trips-list">
            {upcomingTrips.map((trip) => (
              <div key={trip.id} className="dashboard-trip-card">
                <div className="dashboard-trip-header">
                  <div className="dashboard-trip-destination">
                    <MapPin className="dashboard-trip-icon" />
                    <h3>{trip.destination}</h3>
                  </div>
                  <span
                    className={`dashboard-trip-status dashboard-status-${trip.status}`}
                  >
                    {trip.status}
                  </span>
                </div>
                <div className="dashboard-trip-body">
                  <div className="dashboard-trip-dates">
                    <Clock className="dashboard-trip-icon-small" />
                    <span>
                      {trip.startDate} - {trip.endDate}
                    </span>
                  </div>
                  <div className="dashboard-trip-countdown">
                    <span className="dashboard-countdown-value">
                      {trip.daysLeft}
                    </span>
                    <span className="dashboard-countdown-label">days left</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Destinations */}
        <div className="dashboard-side-card">
          <h2 className="dashboard-card-title">
            <Heart className="dashboard-card-icon" />
            Saved Destinations
          </h2>
          <div className="dashboard-destinations-list">
            {savedDestinations.map((dest, i) => (
              <div key={i} className="dashboard-destination-item">
                <div className="dashboard-destination-info">
                  <p className="dashboard-destination-name">{dest.name}</p>
                  <p className="dashboard-destination-bookings">{dest.saves}</p>
                </div>
                <button
                  className="dashboard-destination-view-btn"
                  onClick={() => setSelectedDestination(i)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Destination Preview Modal/Sidebar */}
      {selectedDestination !== null && (
        <div
          className="destination-preview-overlay"
          onClick={() => setSelectedDestination(null)}
        >
          <div
            className="destination-preview-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="destination-preview-close"
              onClick={() => setSelectedDestination(null)}
              aria-label="Close preview"
            >
              <X size={20} />
            </button>

            <div className="destination-preview-header">
              <h3>{savedDestinations[selectedDestination].name}</h3>
              <p className="destination-preview-saves">
                <Heart className="preview-heart-icon" fill="currentColor" />
                {savedDestinations[selectedDestination].saves}
              </p>
            </div>

            <div className="destination-preview-images">
              {savedDestinations[selectedDestination].images.map((img, idx) => (
                <div key={idx} className="destination-preview-image-wrapper">
                  <div className="destination-preview-image-placeholder">
                    <Camera size={40} strokeWidth={1.5} />
                    <span className="image-label">Photo {idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="destination-preview-description">
              <h4>About This Destination</h4>
              <p>{savedDestinations[selectedDestination].description}</p>
            </div>

            <div className="destination-preview-highlights">
              <h4>Highlights & Activities</h4>
              <div className="highlights-grid">
                {savedDestinations[selectedDestination].highlights.map(
                  (highlight, idx) => (
                    <span key={idx} className="highlight-badge">
                      <Star size={14} />
                      {highlight}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="destination-preview-actions">
              <button className="destination-preview-book-btn">
                <Plane size={20} />
                Book This Trip
              </button>
              <button className="destination-preview-save-btn">
                <Bookmark size={20} />
                Remove from Saved
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activity & Achievements */}
      <div className="dashboard-activity-grid">
        {/* Recent Activity */}
        <div className="dashboard-side-card">
          <h2 className="dashboard-card-title">
            <Clock className="dashboard-card-icon" />
            Recent Activity
          </h2>
          <div className="dashboard-activity-list">
            {recentActivity.map((activity, i) => (
              <div key={i} className="dashboard-activity-item">
                <div className="dashboard-activity-icon-wrapper">
                  {activity.icon === "plane" && (
                    <Plane className="dashboard-activity-icon" />
                  )}
                  {activity.icon === "star" && (
                    <Star className="dashboard-activity-icon" />
                  )}
                  {activity.icon === "bookmark" && (
                    <Bookmark className="dashboard-activity-icon" />
                  )}
                </div>
                <div className="dashboard-activity-details">
                  <p className="dashboard-activity-message">
                    {activity.message}
                  </p>
                  <p className="dashboard-activity-date">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements & Preferences */}
        <div className="dashboard-alerts-container">
          {/* Achievements */}
          <div className="dashboard-side-card">
            <h2 className="dashboard-card-title">
              <Award className="dashboard-card-icon" />
              Achievements
            </h2>
            <div className="dashboard-achievements-grid">
              {achievements.map((achievement, i) => (
                <div
                  key={i}
                  className={`dashboard-achievement-badge ${
                    achievement.earned ? "earned" : "locked"
                  }`}
                >
                  <Award className="dashboard-achievement-icon" />
                  <div className="dashboard-achievement-info">
                    <p className="dashboard-achievement-title">
                      {achievement.title}
                    </p>
                    <p className="dashboard-achievement-desc">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Preferences */}
          <div className="dashboard-side-card">
            <h2 className="dashboard-card-title">
              <TrendingUp className="dashboard-card-icon" />
              Travel Preferences
            </h2>
            <div className="dashboard-preferences-list">
              {travelPreferences.map((pref, i) => (
                <div key={i} className="dashboard-preference-item">
                  <div className="dashboard-preference-header">
                    <span className="dashboard-preference-name">
                      {pref.category}
                    </span>
                    <span className="dashboard-preference-percent">
                      {pref.percentage}%
                    </span>
                  </div>
                  <div className="dashboard-preference-bar">
                    <div
                      className="dashboard-preference-fill"
                      style={{ width: `${pref.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-quick-actions-card">
        <h2 className="dashboard-card-title">Quick Actions</h2>
        <div className="dashboard-quick-actions-grid">
          <UserQuickAction
            icon={<Navigation />}
            label="Explore Destinations"
            color="blue"
          />
          <UserQuickAction
            icon={<Calendar />}
            label="Plan New Trip"
            color="green"
          />
          <UserQuickAction
            icon={<Camera />}
            label="Share Photos"
            color="purple"
          />
          <UserQuickAction
            icon={<Users />}
            label="Invite Friends"
            color="orange"
          />
        </div>
      </div>
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
  color: "blue" | "green" | "purple" | "orange";
};

function UserQuickAction({ icon, label, color }: UserQuickActionProps) {
  return (
    <button
      className={`dashboard-quick-action-btn dashboard-quick-action-${color}`}
    >
      <div className="dashboard-quick-action-icon">{icon}</div>
      <span className="dashboard-quick-action-label">{label}</span>
    </button>
  );
}
