const {
  getDashboardStats,
  getRecentMessages,
  getRecentProjects,
} = require("../models/dashboardModel");

const getDashboard = async (req, res) => {
  try {
    const [stats, recentMessages, recentProjects] = await Promise.all([
      getDashboardStats(),
      getRecentMessages(),
      getRecentProjects(),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          projects: Number(stats.projects),
          skills: Number(stats.skills),
          experience: Number(stats.experience),
          education: Number(stats.education),
          achievements: Number(stats.achievements),
          certificates: Number(stats.certificates),
          messages: Number(stats.messages),
          unreadMessages: Number(stats.unread_messages),
        },
        recentMessages,
        recentProjects,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
    });
  }
};

module.exports = {
  getDashboard,
};
