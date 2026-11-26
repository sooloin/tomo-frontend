import { Switch as SwitchPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../lib/cn';

export type ToggleProps = ComponentProps<typeof SwitchPrimitive.Root>;

export function Toggle({ className, ...props }: ToggleProps) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        // 높이는 손잡이 20 + 안쪽 여백 4×2 = 28, 너비 48이라 손잡이가 정확히 자기 너비(20)만큼 움직인다.
        'inline-flex w-48 shrink-0 cursor-pointer items-center rounded-full bg-bg-control-off p-4 transition-colors',
        'data-[state=checked]:bg-accent-tomato',
        'disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:data-[state=checked]:bg-bg-disabled',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="size-20 rounded-full bg-bg-card shadow-card transition-transform data-[state=checked]:translate-x-full" />
    </SwitchPrimitive.Root>
  );
}
