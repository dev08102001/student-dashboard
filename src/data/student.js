const student = {
  name: "Alex Johnson",
  photo: "",
  status: "Student",
  academic: {
    college: "Greenfield Institute of Technology",
    degree: "B.Sc. Computer Science",
    graduationYear: 2025
  },
  skills: ["JavaScript", "React", "TypeScript", "Tailwind CSS", "Node.js"],
  experienceSummary: "3 months internship experience building internal tools and university projects focusing on frontend development and design systems.",
  projects: [
    {
      title: "CampusConnect",
      description: "A student portal for events and announcements with real-time updates.",
      tech: ["React", "Socket.io", "Tailwind CSS"]
    },
    {
      title: "Portfolio Builder",
      description: "A segmented portfolio generator for students to showcase projects and resumes.",
      tech: ["Next.js", "Node", "Prisma"]
    }
  ],
  preferences: {
    roles: ["Frontend Engineer"],
    employmentType: "Internship",
    workMode: "Remote"
  }
};

export default student;
