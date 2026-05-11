const MAX_WIDTHS = {
  container: 'max-w-container',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  full: 'max-w-none',
}

export default function Container({
  as: Tag = 'div',
  maxWidth = 'container',
  className = '',
  children,
  ...rest
}) {
  const maxWClass = MAX_WIDTHS[maxWidth] || MAX_WIDTHS.container
  return (
    <Tag
      className={`mx-auto w-full ${maxWClass} px-6 md:px-8 lg:px-12 xl:px-16 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
