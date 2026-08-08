export default function Contact({ data }) {
  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-3">
          <span dangerouslySetInnerHTML={{ __html: data.sectionTitle }} />
        </h2>
        <p className="text-slate-600 mb-12">{data.sectionSubtitle}</p>

        <div className="mb-12">
          <p className="text-lg text-slate-700 mb-4">{data.intro}</p>
          <p className="text-slate-700">{data.roles}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {data.methods.map((method, i) => (
            <a key={i} href={method.link} className="bg-white p-6 rounded-lg border border-slate-200 hover:border-sky-400 hover:bg-sky-50 transition text-center">
              <div className="text-4xl mb-3">{method.icon}</div>
              <h3 className="font-bold mb-2">{method.name}</h3>
              <p className="text-sky-600 hover:text-sky-700 font-semibold text-sm break-all">{method.value}</p>
            </a>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg border border-slate-200">
          <h3 className="text-xl font-bold mb-6">Connect With Me</h3>
          <div className="flex flex-wrap gap-4">
            {data.socials.map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:text-sky-700 font-semibold"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
