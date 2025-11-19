// Example async action for fetching destinations (mocked)
export async function fetchDestinations() {
  // In a real app, fetch from an API
  return [
    {
      icon: "Landmark",
      title: "Paro Valley",
      description:
        "Known for the iconic Tiger’s Nest Monastery and serene valleys.",
    },
    {
      icon: "Mountain",
      title: "Thimphu City",
      description:
        "Experience Bhutan’s modern capital blended with cultural heritage.",
    },
    {
      icon: "Castle",
      title: "Punakha Dzong",
      description:
        "Visit the stunning fortress at the confluence of Pho and Mo Chhu rivers.",
    },
  ];
}
