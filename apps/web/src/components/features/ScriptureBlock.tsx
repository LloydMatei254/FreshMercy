import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { copyToClipboard } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface ScriptureBlockProps {
  text: string
  reference: string
  className?: string
  showCopy?: boolean
}

export function ScriptureBlock({
  text,
  reference,
  className,
  showCopy = true,
}: ScriptureBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const success = await copyToClipboard(`"${text}" — ${reference}`)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div
      className={cn(
        'relative border-l-2 border-gold pl-6 py-3 my-6 group',
        className,
      )}
      role="blockquote"
      aria-label={`Scripture: ${reference}`}
    >
      <p className="font-serif italic text-forest text-lg leading-relaxed mb-2">
        "{text}"
      </p>
      <cite className="text-xs font-bold tracking-widest uppercase text-gold not-italic">
        — {reference}
      </cite>
      {showCopy && (
        <button
          onClick={handleCopy}
          className="absolute top-3 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-gold/10"
          aria-label="Copy scripture to clipboard"
          title="Copy scripture"
        >
          {copied
            ? <Check className="h-4 w-4 text-green-600" />
            : <Copy className="h-4 w-4 text-gold" />
          }
        </button>
      )}
    </div>
  )
}
