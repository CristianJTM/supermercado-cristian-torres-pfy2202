const BASE =
  'inline-flex items-center justify-center rounded-full font-bold transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-40'

const VARIANTES = {
  primary:
    'bg-sf-green text-white shadow-sm hover:bg-sf-dark focus:ring-sf-green/40',
  secondary:
    'border border-solid border-sf-border bg-white text-sf-text hover:bg-sf-sand focus:ring-sf-green/30',
  danger:
    'border border-solid border-sf-border bg-white text-sf-error hover:bg-sf-sand focus:ring-sf-green/30',
  link: 'text-sf-green underline decoration-sf-green/40 decoration-2 underline-offset-4 hover:text-sf-dark focus:ring-sf-green/30',
}

const TAMANOS = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-3 text-sm',
}

export function buttonClass({ variant = 'primary', size = 'md', className = '' } = {}) {
  return [BASE, VARIANTES[variant] ?? VARIANTES.primary, TAMANOS[size] ?? TAMANOS.md, className]
    .filter(Boolean)
    .join(' ')
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, size, className })}
      {...props}
    />
  )
}
