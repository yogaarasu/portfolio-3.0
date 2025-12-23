import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t-2 border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
            Connect with me
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Open to full‑stack roles, internships, and freelance projects.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/yogaarasu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 shadow-md transition-all duration-200 hover:border-[#24292e] hover:bg-[#24292e] hover:text-white hover:shadow-[0_0_20px_rgba(36,41,46,0.5)] hover:scale-110 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-[#24292e] dark:hover:bg-[#24292e] dark:hover:text-white dark:hover:shadow-[0_0_20px_rgba(36,41,46,0.8)]"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#24292e'
              e.currentTarget.style.backgroundColor = '#24292e'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(36, 41, 46, 0.8)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = ''
              e.currentTarget.style.backgroundColor = ''
              e.currentTarget.style.color = ''
              e.currentTarget.style.boxShadow = ''
            }}
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/feed/?trk=sem-ga_campid.14650114788_asid.151761418307_crid.657403558721_kw.linkedin%20login_d.c_tid.kwd-12704335873_n.g_mt.e_geo.9182246"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 shadow-md transition-all duration-200 hover:border-[#0077b5] hover:bg-[#0077b5] hover:text-white hover:shadow-[0_0_20px_rgba(0,119,181,0.5)] hover:scale-110 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-[#0077b5] dark:hover:bg-[#0077b5] dark:hover:text-white dark:hover:shadow-[0_0_20px_rgba(0,119,181,0.8)]"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0077b5'
              e.currentTarget.style.backgroundColor = '#0077b5'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 119, 181, 0.8)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = ''
              e.currentTarget.style.backgroundColor = ''
              e.currentTarget.style.color = ''
              e.currentTarget.style.boxShadow = ''
            }}
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://www.instagram.com/yogaarasu_143/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 shadow-md transition-all duration-200 hover:border-[#E4405F] hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#cc2366] hover:text-white hover:shadow-[0_0_20px_rgba(228,64,95,0.5)] hover:scale-110 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-[#E4405F] dark:hover:shadow-[0_0_20px_rgba(228,64,95,0.8)]"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#E4405F'
              e.currentTarget.style.backgroundImage = 'linear-gradient(to bottom right, #f09433, #dc2743, #cc2366)'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(228, 64, 95, 0.8)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = ''
              e.currentTarget.style.backgroundImage = ''
              e.currentTarget.style.color = ''
              e.currentTarget.style.boxShadow = ''
            }}
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://wa.me/918248586511?text=Hello%20Yogaarasu,%20I%20visited%20your%20portfolio%20and%20want%20to%20connect%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 shadow-md transition-all duration-200 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:scale-110 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-[#25D366] dark:hover:bg-[#25D366] dark:hover:text-white dark:hover:shadow-[0_0_20px_rgba(37,211,102,0.8)]"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#25D366'
              e.currentTarget.style.backgroundColor = '#25D366'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(37, 211, 102, 0.8)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = ''
              e.currentTarget.style.backgroundColor = ''
              e.currentTarget.style.color = ''
              e.currentTarget.style.boxShadow = ''
            }}
          >
            <FaWhatsapp size={20} />
          </a>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          © {year} Yogaarasu. All rights reserved.
        </p>
      </div>
    </footer>
  )
}


