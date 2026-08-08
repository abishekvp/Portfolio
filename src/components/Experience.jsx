export default function Experience({ data }) {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-3">
          <span dangerouslySetInnerHTML={{ __html: data.sectionTitle }} />
        </h2>
        <p className="text-slate-600 mb-12">{data.sectionSubtitle}</p>

        <div className="space-y-8">
          {data.jobs.map((job, i) => (
            <div key={i} className="border-l-4 border-sky-600 pl-6 pb-8">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-2xl font-bold">{job.title}</h3>
                  <a href={job.companyUrl} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 font-semibold">
                    {job.company} ↗
                  </a>
                </div>
                <span className="text-slate-600 font-semibold whitespace-nowrap ml-4">{job.period}</span>
              </div>
              <p className="text-slate-600 mb-4">{job.description}</p>
              <ul className="space-y-2">
                {job.achievements.map((achievement, j) => (
                  <li key={j} className="text-slate-700 flex items-start">
                    <span className="text-sky-600 mr-3 font-bold">▸</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
