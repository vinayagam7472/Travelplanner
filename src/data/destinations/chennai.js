export const chennaiData = {
  id: "chennai",
  name: "Chennai",
  tagline: "The Gateway to the South & Capital City",
  description: "A bustling metropolis combining modern urban life with deeply rooted traditions. Chennai features gorgeous beaches, historical colonial architecture, historic temples, and a thriving classical music and culinary scene.",
  coverImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80", // Will use a beach/city view if possible
  category: "Beaches",
  bestTimeToVisit: "November to February",
  budgetLevel: "Medium",
  attractions: [
    {
      id: "marina-beach",
      name: "Marina Beach",
      description: "Running a distance of 13 km, Marina Beach is the second-longest natural urban beach in the world. It is a vital social hub for locals, famous for its lighthouse, food stalls selling fresh fried fish, and equestrian rides at sunset.",
      category: "Beaches",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
      openingHours: "Open 24 hours",
      entryFee: { domestic: 0, foreign: 0 },
      bestTimeToVisit: "5:00 PM - 7:30 PM (Sunset)",
      googleMapsLink: "https://maps.google.com/?q=Marina+Beach+Chennai",
      estimatedTimeSpent: "2 hours",
      familyFriendly: true,
      adventureLevel: "Low"
    },
    {
      id: "kapaleeshwarar-temple",
      name: "Kapaleeshwarar Temple",
      description: "A majestic 7th-century Hindu temple dedicated to Lord Shiva, located in Mylapore. Built in Dravidian architecture, it features a towering gopuram, a large temple tank, and beautiful bronze idols of the 63 Nayanmars.",
      category: "Temples",
      image: "https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=800&q=80",
      openingHours: "5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM (Closed on Mondays)",
      entryFee: { domestic: 0, foreign: 0 },
      bestTimeToVisit: "4:30 PM (Evening prayer time)",
      googleMapsLink: "https://maps.google.com/?q=Kapaleeshwarar+Temple+Mylapore+Chennai",
      estimatedTimeSpent: "1.5 hours",
      familyFriendly: true,
      adventureLevel: "Low"
    },
    {
      id: "fort-st-george",
      name: "Fort St. George & Museum",
      description: "Founded in 1640 by the British East India Company, this is the first English fortress in India. It now houses the Tamil Nadu Legislative Assembly and a museum showcasing colonial-era weapons, coins, uniforms, and letters.",
      category: "Historical Sites",
      image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      openingHours: "9:00 AM - 5:00 PM (Closed on Fridays)",
      entryFee: { domestic: 20, foreign: 250 },
      bestTimeToVisit: "Morning",
      googleMapsLink: "https://maps.google.com/?q=Fort+St.+George+Chennai",
      estimatedTimeSpent: "2 hours",
      familyFriendly: true,
      adventureLevel: "Low"
    },
    {
      id: "santhome-cathedral",
      name: "Santhome Cathedral Basilica",
      description: "A stunning Neo-Gothic Roman Catholic basilica built over the tomb of St. Thomas, one of the twelve apostles of Jesus. It is one of only three basilicas in the world built over the tomb of an apostle, featuring stained glass windows and a tall spire.",
      category: "Historical Sites",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
      openingHours: "6:00 AM - 9:00 PM",
      entryFee: { domestic: 0, foreign: 0 },
      bestTimeToVisit: "Afternoon",
      googleMapsLink: "https://maps.google.com/?q=Santhome+Cathedral+Basilica+Chennai",
      estimatedTimeSpent: "1 hour",
      familyFriendly: true,
      adventureLevel: "Low"
    },
    {
      id: "dakshinachitra",
      name: "DakshinaChitra Heritage Museum",
      description: "Located on the East Coast Road, this is an exciting cross-cultural living museum showcasing the lifestyle, art, architecture, and crafts of South India. It features 18 authentic historical houses reconstructed by master craftsmen.",
      category: "Historical Sites",
      image: "https://images.unsplash.com/photo-1561361062-6522c0cf04d6?auto=format&fit=crop&w=800&q=80",
      openingHours: "10:00 AM - 6:00 PM (Closed on Tuesdays)",
      entryFee: { domestic: 150, foreign: 350, student: 50 },
      bestTimeToVisit: "10:30 AM (Plan for a half-day trip)",
      googleMapsLink: "https://maps.google.com/?q=DakshinaChitra+Muttukadu+Tamil+Nadu",
      estimatedTimeSpent: "3.5 hours",
      familyFriendly: true,
      adventureLevel: "Low"
    }
  ]
};
