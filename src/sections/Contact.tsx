import { useState } from 'react'
import * as React from 'react'
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { saveMessage } from '../utils/storage'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

type FormState = {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

function ContactHeader() {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`text-center ${
        isVisible ? 'animate-fade-in-up' : 'translate-y-8 opacity-0'
      }`}
      style={{
        transition: isVisible ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
      }}
    >
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400">
        Contact
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Let&apos;s build something together
      </h2>
      <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
        Whether you have an opportunity, an idea, or just want to say hi,
        feel free to reach out using the form below.
      </p>
    </div>
  )
}

function ContactForm({
  form,
  errors,
  status,
  handleChange,
  handleSubmit,
}: {
  form: { name: string; email: string; message: string }
  errors: { name?: string; email?: string; message?: string }
  status: 'idle' | 'success' | 'error'
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
}) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <Card
      ref={ref}
      className={`p-6 ${
        isVisible ? 'animate-fade-in-up' : 'translate-y-8 opacity-0'
      }`}
      style={{
        transition: isVisible ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
        transitionDelay: '0.1s',
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Name
            </label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-2 text-xs text-red-500 font-medium">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Email
            </label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email address"
            />
            {errors.email && (
              <p className="mt-2 text-xs text-red-500 font-medium ">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            Message
          </label>
          <Textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            placeholder="Tell me briefly about your project, idea, or question..."
          />
          {errors.message && (
            <p className="mt-2 text-xs text-red-500 font-medium ">
              {errors.message}
            </p>
          )}
        </div>

        <Button type="submit" className="mt-2 w-full sm:w-auto animate-float-horizontal" size="md">
          Send message
        </Button>

        {status === 'success' && (
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-100/20 rounded-md p-2">
            Thanks for reaching out! Your message has been sent successfully 😊
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-600 dark:text-red-400 font-medium bg-red-100/20 rounded-md p-2">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </Card>
  )
}

function SocialLink({
  href,
  icon,
  label,
  color,
}: {
  href: string
  icon: string
  label: string
  color: string
}) {
  const iconMap: Record<string, React.ReactNode> = {
    github: <FaGithub size={18} />,
    linkedin: <FaLinkedin size={18} />,
    twitter: <FaInstagram size={18} />,
    email: <FaWhatsapp size={18} />,
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-md transition-all duration-200 hover:text-white hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 "
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color
        e.currentTarget.style.backgroundColor = color
        e.currentTarget.style.boxShadow = `0 0 20px ${color}80`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = ''
        e.currentTarget.style.backgroundColor = ''
        e.currentTarget.style.boxShadow = ''
      }}
    >
      {iconMap[icon]}
      {label}
    </a>
  )
}

function ContactSocialLinks() {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <Card
      ref={ref}
      className={`p-6 h-fit ${
        isVisible ? 'animate-fade-in-up' : 'translate-y-8 opacity-0'
      }`}
      style={{
        transition: isVisible ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
        transitionDelay: '0.2s',
      }}
    >
      <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 mb-4">
        Connect with me
      </h3>
      <div className="space-x-3 space-y-3">
        <SocialLink
          href="https://github.com/yogaarasu"
          icon="github"
          label="GitHub"
          color="#333"
        />
        <SocialLink
          href="https://www.linkedin.com/feed/?trk=sem-ga_campid.14650114788_asid.151761418307_crid.657403558721_kw.linkedin%20login_d.c_tid.kwd-12704335873_n.g_mt.e_geo.9182246"
          icon="linkedin"
          label="LinkedIn"
          color="#0077B5"
        />
        <SocialLink
          href="tel:+918248586511"
          icon="email"
          label="Phone"
          color="#1DA1F2"
        />
        <SocialLink
          href="mailto:yogaarasu465@gmail.com"
          icon="email"
          label="Email"
          color="#EA4335"
        />
      </div>
    </Card>
  )
}

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = (): boolean => {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.'
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = 'Please write a message with at least 10 characters.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      saveMessage({
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: '',
        message: form.message.trim(),
        createdAt: new Date().toISOString(),
      })
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="space-y-10">
      <ContactHeader />
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <ContactForm
          form={form}
          errors={errors}
          status={status}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <ContactSocialLinks />
      </div>
    </div>
  )
}


