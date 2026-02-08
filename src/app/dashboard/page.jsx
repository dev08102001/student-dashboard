import ProfileCard from "../components/ProfileCard";
import AcademicCard from "../components/AcademicCard";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Preferences from "../components/Preferences";
import student from "../../data/student";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProfileCard student={student} />
          <div className="mt-6">
            <AcademicCard academic={student.academic} />
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-lg font-medium">Skills & Experience</h3>
            <Skills skills={student.skills} summary={student.experienceSummary} />
          </div>
          <div className="card">
            <h3 className="text-lg font-medium">Projects</h3>
            <Projects projects={student.projects} />
          </div>
          <div className="card">
            <h3 className="text-lg font-medium">Career Preferences</h3>
            <Preferences preferences={student.preferences} />
          </div>
        </div>
      </div>
    </div>
  );
}
