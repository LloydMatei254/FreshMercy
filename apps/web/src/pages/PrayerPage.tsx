import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Heart, CheckCircle, Shield } from 'lucide-react'
import { SEO } from '@/components/features/SEO'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { prayerService } from '@/services/prayer.service'
import type { PrayerFormData } from '@/types'

const schema = z.object({
  name:        z.string().max(100).optional(),
  email:       z.string().email('Please enter a valid email').optional().or(z.literal('')),
  request:     z.string().min(10, 'Please share at least a few words so we can pray with you.').max(2000),
  isAnonymous: z.boolean(),
})
type FormData = z.infer<typeof schema>

export default function PrayerPage() {
  const [status, setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { isAnonymous: false },
  })

  const isAnonymous = watch('isAnonymous')

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const payload: PrayerFormData = {
        request:     data.request,
        isAnonymous: data.isAnonymous,
        name:        data.isAnonymous ? undefined : data.name || undefined,
        email:       data.isAnonymous ? undefined : data.email || undefined,
      }
      const res = await prayerService.submit(payload)
      if (res.success) {
        setStatus('success')
        setMessage('Your prayer request has been received. We are praying with you.')
        reset()
      } else {
        throw new Error('Submission failed')
      }
    } catch {
      setStatus('error')
      setMessage('Unable to submit your request right now. Please try again.')
    }
  }

  return (
    <>
      <SEO
        title="Prayer"
        description="Submit your prayer request to Fresh Mercy. We read and pray over every request. You are not alone."
        url="/prayer"
      />

      {/* Header */}
      <div className="bg-forest pt-16 pb-16 px-5 text-center">
        <Heart className="h-10 w-10 text-gold mx-auto mb-4" aria-hidden="true" />
        <span className="section-label text-gold/80">You Are Covered</span>
        <h1 className="font-serif text-display-lg text-cream mt-2 mb-4">
          How Can We Pray With You?
        </h1>
        <p className="text-cream/70 max-w-xl mx-auto leading-relaxed">
          We read every prayer request and pray over each one. Nothing is too big, nothing is too small.
          Bring it all — God meets us exactly where we are.
        </p>
      </div>

      <div className="bg-cream min-h-screen py-16 px-5">
        <div className="max-w-2xl mx-auto">

          {status === 'success' ? (
            <div className="text-center py-16">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h2 className="font-serif text-2xl text-forest mb-3">We Are Praying</h2>
              <p className="text-[#4A4A3A] leading-relaxed max-w-sm mx-auto mb-8">
                {message}
              </p>
              <blockquote className="border-l-2 border-gold pl-5 text-left mb-8 max-w-sm mx-auto">
                <p className="font-serif italic text-forest text-base">
                  "The LORD is near to all who call on him, to all who call on him in truth."
                </p>
                <cite className="text-xs font-bold tracking-widest uppercase text-gold not-italic">
                  — Psalm 145:18
                </cite>
              </blockquote>
              <Button onClick={() => setStatus('idle')} variant="outline" size="lg">
                Submit Another Request
              </Button>
            </div>
          ) : (
            <>
              {/* Privacy note */}
              <div className="flex items-start gap-3 bg-parchment border border-gold/20 rounded-2xl p-5 mb-8">
                <Shield className="h-5 w-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-[#4A4A3A] leading-relaxed">
                  <strong className="text-forest">Your privacy matters.</strong> Prayer requests are
                  kept strictly private and are never shared publicly. Only our prayer team has access.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Prayer request form">
                {/* Anonymous toggle */}
                <div className="flex items-center gap-3 mb-6 p-4 bg-parchment rounded-xl border border-gold/15">
                  <input
                    type="checkbox"
                    id="isAnonymous"
                    {...register('isAnonymous')}
                    className="h-4 w-4 accent-gold"
                  />
                  <label htmlFor="isAnonymous" className="text-sm text-forest font-semibold cursor-pointer">
                    Submit anonymously
                  </label>
                </div>

                {/* Name & Email (hidden when anonymous) */}
                {!isAnonymous && (
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <Input
                      id="prayer-name"
                      label="Your Name (optional)"
                      placeholder="e.g. Sarah"
                      autoComplete="given-name"
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      id="prayer-email"
                      type="email"
                      label="Your Email (optional)"
                      placeholder="for follow-up prayer"
                      autoComplete="email"
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>
                )}

                {/* Prayer request */}
                <div className="mb-6">
                  <Textarea
                    id="prayer-request"
                    label="Your Prayer Request *"
                    placeholder="Share what's on your heart. Be as detailed or as brief as you like…"
                    rows={7}
                    error={errors.request?.message}
                    {...register('request')}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="xl"
                  loading={status === 'loading'}
                  className="w-full"
                >
                  <Heart className="h-5 w-5" />
                  Submit Prayer Request
                </Button>

                {status === 'error' && (
                  <p className="text-sm text-red-500 text-center mt-3" role="alert">
                    {message}
                  </p>
                )}

                <p className="text-xs text-[#9A9A8A] text-center mt-4">
                  We read every request. You are not alone.
                </p>
              </form>

              {/* Scripture comfort */}
              <div className="mt-12 border-t border-gold/15 pt-10">
                <div className="grid sm:grid-cols-3 gap-5">
                  {[
                    { text: "Cast all your anxiety on him because he cares for you.", ref: "1 Peter 5:7" },
                    { text: "Do not be anxious about anything, but in every situation, by prayer… present your requests to God.", ref: "Phil. 4:6" },
                    { text: "And the prayer offered in faith will make the sick person well.", ref: "James 5:15" },
                  ].map(({ text, ref }) => (
                    <blockquote key={ref} className="border-l-2 border-gold pl-4 py-1">
                      <p className="font-serif italic text-forest text-sm leading-relaxed mb-1">"{text}"</p>
                      <cite className="text-[10px] font-bold tracking-widest uppercase text-gold not-italic">— {ref}</cite>
                    </blockquote>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
