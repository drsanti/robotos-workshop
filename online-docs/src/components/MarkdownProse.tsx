import type { Components } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { classifyCodeSpan } from '../lib/classifyCodeSpan'

function CodeSpan({ text }: { text: string }) {
  const kind = classifyCodeSpan(text)
  if (kind === 'kbd') return <kbd>{text}</kbd>
  if (kind === 'app') return <span className="app-name">{text}</span>
  return <code>{text}</code>
}

type Props = {
  children: string
  /** When true, do not wrap in <p> (for use inside an existing paragraph/title). */
  inline?: boolean
  className?: string
}

/** Render markdown prose; backticks become one precise <code>/<kbd>/.app-name span. */
export function MarkdownProse({ children, inline = false, className }: Props) {
  const components: Components = {
    p: ({ children: c }) => (inline ? <>{c}</> : <p className={className}>{c}</p>),
    strong: ({ children: c }) => <strong>{c}</strong>,
    em: ({ children: c }) => <em>{c}</em>,
    a: ({ href, children: c }) => (
      <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {c}
      </a>
    ),
    code: ({ children: c }) => {
      const text = String(c).replace(/\n$/, '')
      return <CodeSpan text={text} />
    },
    // Tables / lists when prose includes them
    ul: ({ children: c }) => <ul className="my-3 space-y-1 pl-5">{c}</ul>,
    ol: ({ children: c }) => <ol className="my-3 list-decimal space-y-1 pl-5">{c}</ol>,
    li: ({ children: c }) => <li>{c}</li>,
    table: ({ children: c }) => (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">{c}</table>
      </div>
    ),
    thead: ({ children: c }) => <thead>{c}</thead>,
    tbody: ({ children: c }) => <tbody>{c}</tbody>,
    tr: ({ children: c }) => <tr className="border-b border-[var(--line)]">{c}</tr>,
    th: ({ children: c }) => <th className="py-2 pr-3 font-semibold">{c}</th>,
    td: ({ children: c }) => <td className="py-2 pr-3">{c}</td>,
  }

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  )
}
