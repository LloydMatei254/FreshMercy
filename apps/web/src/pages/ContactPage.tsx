import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, CheckCircle } from 'lucide-react'
import { SEO } from '@/components/features/SEO'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { contactService } from '@/services/contact.service'
import type { ContactFormData } from '@/types'

const schema = z.object({
  name:    z.string().min(2, 'Please enter your name').max(100),
  email:   z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Please write at least a few words').max(3000),
})

export default function ContactPage() {
  const [status, setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')
    try {
      const res = await contactService.send(data)
      if (res.success) {
        setStatus('success')
        reset()
      } else {
        throw new Error()
      }
    } catch {
      setStatus('error')
      setMessage('Unable to send your message right now. Please try again or email us directly.')
    }
  }

  return (
    <>
      <SEO
        title="Contact"
        description="Reach out to Fresh Mercy. We are here — no judgment, no conditions, just grace."
        url="/contact"
      />

      <div className="bg-forest pt-16 pb-16 px-5 text-center">
        <span className="section-label text-gold/80">Reach Out</span>
        <h1 className="font-serif text-display-lg text-cream mt-2 mb-4">
          Where Mercy Meets You
        </h1>
        <p className="text-cream/70 max-w-lg mx-auto leading-relaxed">
          Whether you have questions, need prayer, want to partner, or just want to say hello —
          we are here. No judgment, no conditions. Just grace.
        </p>
      </div>

      <div className="bg-cream min-h-screen py-16 px-5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12">

          {/* Contact info */}
          <div className="md:col-span-2">
            <h2 className="font-serif text-xl text-forest mb-6">Get in Touch</h2>
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-[#4A4A3A]">
                <Mail className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                <a
                  href="mailto:hello@freshmercy.org"
                  className="hover:text-gold transition-colors"
                >
                  hello@freshmercy.org
                </a>
              </div>
            </div>

            <div className="bg-parchment rounded-2xl border border-gold/15 p-6">
              <p className="font-serif italic text-forest text-base leading-relaxed mb-3">
                "Come to me, all you who are weary and burdened, and I will give you rest."
              </p>
              <cite className="text-[10px] font-bold tracking-widest uppercase text-gold not-italic">
                — Matthew 11:28
              </cite>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {status === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-5" />
                <h2 className="font-serif text-2xl text-forest mb-3">Message Received</h2>
                <p className="text-[#4A4A3A] mb-6">
                  We read every message and will get back to you soon. You matter here.
                </p>
                <Button onClick={() => setStatus('idle')} variant="outline" size="lg">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <div className="bg-parchment rounded-2xl border border-gold/15 p-8">
                <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Contact form">
                  <div className="flex flex-col gap-5">
                    <Input
                      id="contact-name"
                      label="Your Name *"
                      placeholder="e.g. David Osei"
                      autoComplete="name"
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      id="contact-email"
                      type="email"
                      label="Email Address *"
                      placeholder="you@example.com"
                      autoComplete="email"
                      error={errors.email?.message}
                      {...register('email')}
                    />
                    <Textarea
                      id="contact-message"
                      label="Your Message *"
                      placeholder="Share your heart, your question, or just say hello…"
                      rows={6}
                      error={errors.message?.message}
                      {...register('message')}
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="xl"
                      loading={status === 'loading'}
                      className="w-full"
                    >
                      Send Message
                    </Button>
                    {status === 'error' && (
                      <p className="text-sm text-red-500 text-center" role="alert">
                        {message}
                      </p>
                    )}
                    <p className="text-xs text-[#9A9A8A] text-center">
                      We read every message. You matter here.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  )
}
