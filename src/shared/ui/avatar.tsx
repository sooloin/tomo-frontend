import { cva, type VariantProps } from 'class-variance-authority';
import { Avatar as AvatarPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../lib/cn';

const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-tomato-soft text-accent-tomato select-none',
  {
    variants: {
      size: {
        sm: 'size-32 text-label-bold',
        md: 'size-40 text-body-bold',
        lg: 'size-[96px] text-heading-1',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export type AvatarProps = Omit<ComponentProps<typeof AvatarPrimitive.Root>, 'children'> &
  VariantProps<typeof avatarVariants> & {
    name: string;
    src?: string | null;
  };

// 이미지가 없거나 불러오지 못하면 닉네임 첫 글자를 보여 준다.
export function Avatar({ name, src, size, className, ...props }: AvatarProps) {
  const initial = Array.from(name.trim())[0] ?? '';

  return (
    <AvatarPrimitive.Root className={cn(avatarVariants({ size }), className)} {...props}>
      {src && <AvatarPrimitive.Image src={src} alt={name} className="size-full object-cover" />}
      <AvatarPrimitive.Fallback role="img" aria-label={name}>
        {initial}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
