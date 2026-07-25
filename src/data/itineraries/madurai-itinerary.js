export const maduraiItinerary = {
  // Key: ${days}_days_${type}
  // Fallbacks are supported in the resolver
  "1_days_family": {
    days: [
      {
        day: 1,
        title: "Highlights of Madurai",
        activities: ["meenakshi-temple", "thirumalai-palace", "gandhi-museum"],
        routes: [
          { from: "meenakshi-temple", to: "thirumalai-palace", distance: "2.5 km", time: "10 mins" },
          { from: "thirumalai-palace", to: "gandhi-museum", distance: "1.8 km", time: "8 mins" }
        ]
      }
    ]
  },
  "2_days_family": {
    days: [
      {
        day: 1,
        title: "Heritage & Culture Walk",
        activities: ["meenakshi-temple", "thirumalai-palace", "gandhi-museum"],
        routes: [
          { from: "meenakshi-temple", to: "thirumalai-palace", distance: "2.5 km", time: "10 mins" },
          { from: "thirumalai-palace", to: "gandhi-museum", distance: "1.8 km", time: "8 mins" }
        ]
      },
      {
        day: 2,
        title: "Temples & Hill Sights",
        activities: ["alagar-kovil", "pazhamudhir-solai", "mariamman-teppakulam"],
        routes: [
          { from: "alagar-kovil", to: "pazhamudhir-solai", distance: "3.5 km", time: "12 mins" },
          { from: "pazhamudhir-solai", to: "mariamman-teppakulam", distance: "18.2 km", time: "35 mins" }
        ]
      }
    ]
  },
  "3_days_family": {
    days: [
      {
        day: 1,
        title: "Heritage & Culture Walk",
        activities: ["meenakshi-temple", "thirumalai-palace", "gandhi-museum"],
        routes: [
          { from: "meenakshi-temple", to: "thirumalai-palace", distance: "2.5 km", time: "10 mins" },
          { from: "thirumalai-palace", to: "gandhi-museum", distance: "1.8 km", time: "8 mins" }
        ]
      },
      {
        day: 2,
        title: "Temples & Hill Sights",
        activities: ["alagar-kovil", "pazhamudhir-solai", "mariamman-teppakulam"],
        routes: [
          { from: "alagar-kovil", to: "pazhamudhir-solai", distance: "3.5 km", time: "12 mins" },
          { from: "pazhamudhir-solai", to: "mariamman-teppakulam", distance: "18.2 km", time: "35 mins" }
        ]
      },
      {
        day: 3,
        title: "Scenic Views & Local Cuisine",
        activities: ["samanar-hills", "local-food-street"],
        routes: [
          { from: "samanar-hills", to: "local-food-street", distance: "14.5 km", time: "30 mins" }
        ]
      }
    ]
  },
  
  // Custom variations for Friends
  "2_days_friends": {
    days: [
      {
        day: 1,
        title: "Historical Explore & Street Food",
        activities: ["meenakshi-temple", "thirumalai-palace", "local-food-street"],
        routes: [
          { from: "meenakshi-temple", to: "thirumalai-palace", distance: "2.5 km", time: "10 mins" },
          { from: "thirumalai-palace", to: "local-food-street", distance: "1.2 km", time: "5 mins" }
        ]
      },
      {
        day: 2,
        title: "Adventure Trek & Hills",
        activities: ["samanar-hills", "alagar-kovil", "pazhamudhir-solai"],
        routes: [
          { from: "samanar-hills", to: "alagar-kovil", distance: "32.0 km", time: "55 mins" },
          { from: "alagar-kovil", to: "pazhamudhir-solai", distance: "3.5 km", time: "12 mins" }
        ]
      }
    ]
  },
  
  // Budget options (uses lower entry fee attractions)
  "2_days_budget": {
    days: [
      {
        day: 1,
        title: "Free Attractions & Heritage Walk",
        activities: ["meenakshi-temple", "gandhi-museum", "mariamman-teppakulam"],
        routes: [
          { from: "meenakshi-temple", to: "gandhi-museum", distance: "4.1 km", time: "15 mins" },
          { from: "gandhi-museum", to: "mariamman-teppakulam", distance: "3.8 km", time: "12 mins" }
        ]
      },
      {
        day: 2,
        title: "Spiritual Hill Walk",
        activities: ["alagar-kovil", "pazhamudhir-solai"],
        routes: [
          { from: "alagar-kovil", to: "pazhamudhir-solai", distance: "3.5 km", time: "12 mins" }
        ]
      }
    ]
  }
};

// Add fallbacks for standard types (Solo, etc.)
maduraiItinerary["2_days_solo"] = maduraiItinerary["2_days_friends"];
maduraiItinerary["1_days_friends"] = maduraiItinerary["1_days_family"];
maduraiItinerary["1_days_solo"] = maduraiItinerary["1_days_family"];
maduraiItinerary["1_days_budget"] = maduraiItinerary["1_days_family"];
maduraiItinerary["3_days_friends"] = maduraiItinerary["3_days_family"];
maduraiItinerary["3_days_solo"] = maduraiItinerary["3_days_family"];
maduraiItinerary["3_days_budget"] = maduraiItinerary["3_days_family"];

// Auto-populate 4 days and 5 days by duplicating day 3 or spreading
maduraiItinerary["4_days_family"] = {
  days: [
    ...maduraiItinerary["3_days_family"].days,
    {
      day: 4,
      title: "Relaxed shopping and leisure",
      activities: ["mariamman-teppakulam", "local-food-street"],
      routes: [
        { from: "mariamman-teppakulam", to: "local-food-street", distance: "5.5 km", time: "15 mins" }
      ]
    }
  ]
};
maduraiItinerary["4_days_friends"] = maduraiItinerary["4_days_family"];
maduraiItinerary["4_days_solo"] = maduraiItinerary["4_days_family"];
maduraiItinerary["4_days_budget"] = maduraiItinerary["4_days_family"];

maduraiItinerary["5_days_family"] = {
  days: [
    ...maduraiItinerary["4_days_family"].days,
    {
      day: 5,
      title: "Village Excursion and Local Temples",
      activities: ["samanar-hills"],
      routes: []
    }
  ]
};
maduraiItinerary["5_days_friends"] = maduraiItinerary["5_days_family"];
maduraiItinerary["5_days_solo"] = maduraiItinerary["5_days_family"];
maduraiItinerary["5_days_budget"] = maduraiItinerary["5_days_family"];
