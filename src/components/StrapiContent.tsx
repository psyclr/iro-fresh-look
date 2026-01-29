import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

interface StrapiContentProps {
  content: BlocksContent;
  className?: string;
}

const StrapiContent = ({ content, className }: StrapiContentProps) => {
  return (
    <div className={className}>
      <BlocksRenderer
        content={content}
        blocks={{
          // Кастомизация блоков
          paragraph: ({ children }) => (
            <p className="mb-4 text-base leading-relaxed">{children}</p>
          ),
          heading: ({ children, level }) => {
            const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
            const headingClasses = {
              1: 'text-4xl font-bold mb-6 mt-8',
              2: 'text-3xl font-bold mb-5 mt-7',
              3: 'text-2xl font-semibold mb-4 mt-6',
              4: 'text-xl font-semibold mb-3 mt-5',
              5: 'text-lg font-semibold mb-2 mt-4',
              6: 'text-base font-semibold mb-2 mt-3',
            };

            return (
              <HeadingTag className={headingClasses[level as keyof typeof headingClasses]}>
                {children}
              </HeadingTag>
            );
          },
          list: ({ children, format }) => {
            if (format === 'ordered') {
              return <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>;
            }
            return <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>;
          },
          'list-item': ({ children }) => (
            <li className="ml-4">{children}</li>
          ),
          quote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
              <code className="text-sm">{children}</code>
            </pre>
          ),
          image: ({ image }) => (
            <figure className="my-6">
              <img
                src={image.url}
                alt={image.alternativeText || ''}
                width={image.width}
                height={image.height}
                className="rounded-lg w-full h-auto"
              />
              {image.caption && (
                <figcaption className="text-sm text-muted-foreground text-center mt-2">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ),
          link: ({ children, url }) => (
            <a
              href={url}
              className="text-primary hover:underline"
              target={url.startsWith('http') ? '_blank' : undefined}
              rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
        }}
        modifiers={{
          bold: ({ children }) => <strong className="font-bold">{children}</strong>,
          italic: ({ children }) => <em className="italic">{children}</em>,
          underline: ({ children }) => <u className="underline">{children}</u>,
          strikethrough: ({ children }) => <s className="line-through">{children}</s>,
          code: ({ children }) => (
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
          ),
        }}
      />
    </div>
  );
};

export default StrapiContent;
