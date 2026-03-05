import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export type MarkdownProps = {
  content: string;
};

export function Markdown({ content }: MarkdownProps) {
  return (
    <div className='space-y-4 text-sm text-muted-foreground sm:text-base'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h2: ({ children, ...props }) => (
            <h2 className='scroll-m-20 border-b border-border/60 pb-2 text-lg font-semibold text-foreground' {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className='scroll-m-20 text-base font-semibold text-foreground sm:text-lg' {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className='scroll-m-20 text-sm font-semibold text-foreground sm:text-base' {...props}>
              {children}
            </h4>
          ),
          p: ({ children, ...props }) => (
            <p className='leading-7 [&:not(:first-child)]:mt-3' {...props}>
              {children}
            </p>
          ),
          strong: ({ children, ...props }) => (
            <strong className='font-semibold text-foreground' {...props}>
              {children}
            </strong>
          ),
          ul: ({ children, ...props }) => (
            <ul className='list-disc space-y-1 pl-5' {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className='list-decimal space-y-1 pl-5' {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className='leading-6' {...props}>
              {children}
            </li>
          ),
          hr: (props) => <hr className='border-border/60' {...props} />,
          a: ({ children, ...props }) => (
            <a className='text-primary underline underline-offset-4 hover:opacity-90' {...props}>
              {children}
            </a>
          ),
          table: ({ children, ...props }) => (
            <div className='overflow-x-auto rounded-md border border-border/60'>
              <table className='w-full border-collapse text-left text-sm' {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className='bg-muted/30 text-foreground' {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th className='border-b border-border/60 px-3 py-2 font-semibold' {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className='border-b border-border/40 px-3 py-2 align-top' {...props}>
              {children}
            </td>
          ),
          code: ({ children, ...props }) => (
            <code className='rounded bg-muted/40 px-1 py-0.5 font-mono text-[0.9em] text-foreground' {...props}>
              {children}
            </code>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote className='border-l-2 border-border/60 pl-4 italic' {...props}>
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}


