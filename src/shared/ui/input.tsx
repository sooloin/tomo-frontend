import { type ComponentProps, type ReactNode, useId } from 'react';

import { cn } from '../lib/cn';
import { FieldFrame } from './field';
import { fieldControlVariants, type FieldStatus, focusRing, helperId } from './field-control';
import { Icon, type IconName } from './icon';

export type InputProps = Omit<ComponentProps<'input'>, 'size'> & {
  label?: ReactNode;
  helper?: ReactNode;
  status?: FieldStatus;
  trailingIcon?: IconName;
};

export function Input({
  id,
  label,
  helper,
  status = 'default',
  trailingIcon,
  disabled,
  className,
  ...props
}: InputProps) {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;

  return (
    <FieldFrame
      id={inputId}
      label={label}
      helper={helper}
      status={status}
      disabled={disabled}
      className={className}
    >
      <div
        className={cn(
          fieldControlVariants({ status }),
          status !== 'error' && focusRing.within,
          disabled && 'border-transparent bg-bg-disabled text-text-disabled',
        )}
      >
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={helper ? helperId(inputId) : undefined}
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-text-muted disabled:cursor-not-allowed disabled:placeholder:text-text-disabled"
          {...props}
        />
        {trailingIcon && (
          <Icon
            name={trailingIcon}
            className={cn('size-20', disabled ? 'text-text-disabled' : 'text-text-secondary')}
          />
        )}
      </div>
    </FieldFrame>
  );
}
