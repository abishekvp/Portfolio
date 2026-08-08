import { useState } from 'react'

export default function Skills({ data }) {
  const [expandedSkill, setExpandedSkill] = useState(null)

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-3">
          <span dangerouslySetInnerHTML={{ __html: data.sectionTitle }} />
        </h2>
        <p className="text-slate-600 mb-12">{data.sectionSubtitle}</p>

        <div className="space-y-8">
          {data.categories.map((category, catIdx) => (
            <div key={catIdx} className="border-l-4 border-sky-600 pl-6">
              <h3 className="text-2xl font-bold mb-6">
                <span className="text-3xl mr-3">{category.icon}</span>
                {category.name}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {category.skills.map((skill, skillIdx) => (
                  <div
                    key={skillIdx}
                    className="bg-slate-50 p-4 rounded-lg border border-slate-200 cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition"
                    onClick={() => setExpandedSkill(expandedSkill === `${catIdx}-${skillIdx}` ? null : `${catIdx}-${skillIdx}`)}
                  >
                    <h4 className="font-bold text-slate-900 mb-2">{skill.name}</h4>
                    {expandedSkill === `${catIdx}-${skillIdx}` && (
                      <div className="mt-3 pt-3 border-t border-slate-200 space-y-2 text-sm text-slate-700">
                        <div>
                          <strong>HOW I LEARNED:</strong>
                          <p>{skill.learned}</p>
                        </div>
                        <div>
                          <strong>WHERE IMPLEMENTED:</strong>
                          <p>{skill.implemented}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
