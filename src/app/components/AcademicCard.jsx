export default function AcademicCard({ academic }) {
  return (
    <div className="card">
      <h4 className="font-medium">Academic Details</h4>
      <div className="mt-3 space-y-2 text-sm text-slate-700">
        <div><span className="text-slate-500">College:</span> {academic.college}</div>
        <div><span className="text-slate-500">Degree:</span> {academic.degree}</div>
        <div><span className="text-slate-500">Graduation:</span> {academic.graduationYear}</div>
      </div>
    </div>
  );
}

