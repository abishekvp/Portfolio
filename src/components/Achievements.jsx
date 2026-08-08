export default function Achievements({ data }) {
  const achievements = [
    {
      icon: "🏆",
      title: "SIH 2022 Winner",
      description: "Winner of Smart India Hackathon 2022, a nationwide initiative to provide students a platform to solve some of the pressing problems we face in our daily lives."
    },
    {
      icon: "🎤",
      title: "AI Horizon 2022",
      description: "Orchestrated AI Horizon 2022, leading the organization and execution of the event focused on Artificial Intelligence advancements."
    },
    {
      icon: "👨‍🏫",
      title: "Peer Mentorship",
      description: "Conducted placement training for batchmates covering Web Development (HTML, CSS, JS), Figma designing, Git/GitHub, and hosting static websites with GitHub Pages."
    },
    {
      icon: "⚖️",
      title: "Jury Member",
      description: "Served as a Jury member for St. Thomas College Internal SIH 2024, evaluating innovative projects and selecting teams for the national level."
    }
  ]

  return (
    <section id="achievements" className="py-20 bg-slate-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-3">Achievements & Recognition</h2>
        <p className="text-slate-600 mb-12">Milestones and contributions</p>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-slate-200">
              <div className="text-4xl mb-4">{achievement.icon}</div>
              <h3 className="text-xl font-bold mb-3">{achievement.title}</h3>
              <p className="text-slate-700">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
