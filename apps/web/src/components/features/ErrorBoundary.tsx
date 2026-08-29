import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[FreshMercy] Page error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-6 text-center">
          <div className="max-w-md">
            <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
            <h2 className="font-serif text-2xl text-forest mb-3">
              Something went wrong
            </h2>
            <p className="text-sm text-[#7A7A6A] mb-6 leading-relaxed">
              {this.state.error?.message ?? 'An unexpected error occurred loading this page.'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: undefined })
                window.location.reload()
              }}
              className="bg-gold text-forest font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:bg-[#b8922e] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
