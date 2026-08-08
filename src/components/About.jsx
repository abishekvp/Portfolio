export default function About({ data }) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-3">
          <span dangerouslySetInnerHTML={{ __html: data.sectionTitle }} />
        </h2>
        <p className="text-slate-600 mb-12">{data.sectionSubtitle}</p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{data.whatIDo.title}</h3>
            <ul className="space-y-2">
              {data.whatIDo.items.map((item, i) => (
                <li key={i} className="text-slate-700 flex items-start">
                  <span className="text-sky-600 mr-3 font-bold">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4">{data.bio.title}</h3>
          <div className="space-y-4">
            {data.bio.paragraphs.map((para, i) => (
              <p key={i} className="text-slate-700 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {data.highlights.map((highlight, i) => (
            <div key={i} className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <div className="text-3xl mb-2">{highlight.icon}</div>
              <h4 className="font-bold text-lg mb-2">{highlight.title}</h4>
              <p className="text-slate-600">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
