import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import { apiClient } from '@/lib/axios'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { slugify } from '@/lib/utils'
import type { ApiResponse, Devotional } from '@/types'

const schema = z.object({
  title:              z.string().min(3, 'Title is required').max(200),
  slug:               z.string().min(3).max(200),
  excerpt:            z.string().min(10, 'Excerpt is required').max(500),
  content:            z.string().min(50, 'Content is required'),
  scripture:          z.string().min(5, 'Scripture is required'),
  scriptureReference: z.string().min(3, 'Scripture reference is required'),
  prayer:             z.string().optional(),
  author:             z.string().min(2, 'Author is required'),
  status:             z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
})
type FormData = z.infer<typeof schema>

export default function AdminDevotionalEditor() {
  const { id }      = useParams<{ id: string }>()
  const navigate    = useNavigate()
  const queryClient = useQueryClient()
  const isNew       = !id || id === 'new'

  // Fetch existing for edit
  const { data: existing } = useQuery({
    queryKey: ['admin', 'devotional', id],
    queryFn:  async () => {
      const res = await apiClient.get<ApiResponse<Devotional>>(`/admin/devotionals/${id}`)
      return res.data
    },
    enabled: !isNew && !!id,
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'DRAFT', author: 'Fresh Mercy' },
  })

  // Populate form when editing
  useEffect(() => {
    if (existing?.data) {
      const d = existing.data
      reset({
        title:              d.title,
        slug:               d.slug,
        excerpt:            d.excerpt,
        content:            d.content,
        scripture:          d.scripture,
        scriptureReference: d.scriptureReference,
        prayer:             d.prayer ?? '',
        author:             d.author,
        status:             d.status,
      })
    }
  }, [existing, reset])

  // Auto-slug from title (only for new)
  const title = watch('title')
  useEffect(() => {
    if (isNew && title) setValue('slug', slugify(title))
  }, [title, isNew, setValue])

  const saveMutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (isNew) {
        return apiClient.post('/admin/devotionals', data)
      }
      return apiClient.put(`/admin/devotionals/${id}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'devotionals'] })
      navigate('/admin/devotionals')
    },
  })

  const onSubmit = (data: FormData) => saveMutation.mutate(data)

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/admin/devotionals"
          className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#7A7A6A] hover:text-forest transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Devotionals
        </Link>
        <h1 className="font-serif text-2xl text-forest">
          {isNew ? 'New Devotional' : 'Edit Devotional'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-parchment rounded-2xl border border-gold/15 p-6 flex flex-col gap-5">
              <Input
                id="title"
                label="Title *"
                placeholder="e.g. Running Toward the Prodigal"
                error={errors.title?.message}
                {...register('title')}
              />
              <Input
                id="slug"
                label="URL Slug *"
                placeholder="running-toward-the-prodigal"
                error={errors.slug?.message}
                {...register('slug')}
              />
              <Textarea
                id="excerpt"
                label="Excerpt *"
                placeholder="A brief summary shown on devotional cards (max 500 chars)"
                rows={3}
                error={errors.excerpt?.message}
                {...register('excerpt')}
              />
            </div>

            <div className="bg-parchment rounded-2xl border border-gold/15 p-6 flex flex-col gap-5">
              <Textarea
                id="content"
                label="Full Content * (HTML supported)"
                placeholder="Write the full devotional here. HTML tags are supported."
                rows={16}
                error={errors.content?.message}
                {...register('content')}
              />
            </div>

            <div className="bg-parchment rounded-2xl border border-gold/15 p-6">
              <Textarea
                id="prayer"
                label="Closing Prayer (optional)"
                placeholder="A short prayer for the reader to close with…"
                rows={4}
                {...register('prayer')}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Publish box */}
            <div className="bg-parchment rounded-2xl border border-gold/15 p-6 flex flex-col gap-4">
              <h2 className="font-serif text-lg text-forest">Publish</h2>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-wider uppercase text-forest">Status</label>
                <select
                  {...register('status')}
                  className="w-full rounded-xl border border-gold/30 bg-cream px-3 py-2.5 text-sm text-forest focus:outline-none focus:border-gold"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 pt-2 border-t border-gold/15">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={saveMutation.isPending}
                  className="w-full"
                >
                  <Save className="h-4 w-4" />
                  {isNew ? 'Create Devotional' : 'Save Changes'}
                </Button>
                {!isNew && (
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <a
                      href={`/devotionals/${existing?.data?.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </a>
                  </Button>
                )}
              </div>
              {saveMutation.isError && (
                <p className="text-xs text-red-500 text-center" role="alert">
                  Failed to save. Please try again.
                </p>
              )}
            </div>

            {/* Scripture */}
            <div className="bg-parchment rounded-2xl border border-gold/15 p-6 flex flex-col gap-4">
              <h2 className="font-serif text-lg text-forest">Scripture</h2>
              <Textarea
                id="scripture"
                label="Scripture Text *"
                placeholder="The full scripture verse…"
                rows={4}
                error={errors.scripture?.message}
                {...register('scripture')}
              />
              <Input
                id="scriptureReference"
                label="Reference *"
                placeholder="e.g. Luke 15:20"
                error={errors.scriptureReference?.message}
                {...register('scriptureReference')}
              />
            </div>

            {/* Author */}
            <div className="bg-parchment rounded-2xl border border-gold/15 p-6">
              <Input
                id="author"
                label="Author *"
                placeholder="e.g. Fresh Mercy"
                error={errors.author?.message}
                {...register('author')}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
