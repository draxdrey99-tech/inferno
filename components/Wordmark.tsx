import Image from 'next/image';
import Link from 'next/link';

export default function Wordmark({
  variant = 'light',
  className = '',
  priority = false,
}: {
  variant?: 'light' | 'dark';
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Inferno Emails, home"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src={variant === 'light' ? '/images/wordmark-light.png' : '/images/wordmark-dark.png'}
        alt="Inferno Emails"
        width={466}
        height={284}
        priority={priority}
        className="h-9 w-auto md:h-10"
      />
    </Link>
  );
}
