import { ToggleGroup } from 'radix-ui';
import { type ComponentProps, useState } from 'react';

import { cn } from '../lib/cn';

export type SegmentedProps = Omit<
  ComponentProps<typeof ToggleGroup.Root>,
  'type' | 'value' | 'defaultValue' | 'onValueChange'
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

// 단일 선택 ToggleGroup은 선택된 항목을 다시 누르면 빈 값이 되지만,
// 일·주·월 전환은 항상 하나가 선택돼 있어야 하므로 빈 값을 무시한다.
export function Segmented({
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: SegmentedProps) {
  const [innerValue, setInnerValue] = useState(defaultValue);

  return (
    <ToggleGroup.Root
      type="single"
      role="radiogroup"
      value={value ?? innerValue}
      onValueChange={(next) => {
        if (!next) return;
        setInnerValue(next);
        onValueChange?.(next);
      }}
      className={cn('inline-flex items-center gap-4 rounded-lg bg-bg-well p-4', className)}
      {...props}
    />
  );
}

export type SegmentedItemProps = ComponentProps<typeof ToggleGroup.Item>;

export function SegmentedItem({ className, ...props }: SegmentedItemProps) {
  return (
    <ToggleGroup.Item
      className={cn(
        'inline-flex h-[36px] shrink-0 cursor-pointer items-center justify-center rounded-md px-16 whitespace-nowrap transition-[background-color,box-shadow,color]',
        'text-label text-text-secondary hover:bg-bg-soft',
        'data-[state=on]:bg-bg-card data-[state=on]:text-label-bold data-[state=on]:text-text-primary data-[state=on]:shadow-card',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
        className,
      )}
      {...props}
    />
  );
}
