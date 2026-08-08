export default function Projects({ data }) {
  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-3">
          <span dangerouslySetInnerHTML={{ __html: data.sectionTitle }} />
        </h2>
        <p className="text-slate-600 mb-12">{data.sectionSubtitle}</p>

        <div className="grid md:grid-cols-1 gap-8">
          {data.items.map(project => (
            <div key={project.id} className="bg-white p-6 rounded-lg border border-slate-200 hover:border-sky-400 transition">
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-slate-700 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 font-semibold">
                    Demo
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 font-semibold">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
