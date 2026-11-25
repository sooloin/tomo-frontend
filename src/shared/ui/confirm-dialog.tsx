import { AlertDialog } from 'radix-ui';
import type { ReactNode } from 'react';

import { Button } from './button';
import {
  dialogActionsClass,
  dialogContentClass,
  dialogDescriptionClass,
  dialogHeaderClass,
  dialogOverlayClass,
  dialogTitleClass,
} from './dialog-styles';

export type ConfirmDialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  // 파괴적 동작이면 "종료하기"처럼 동사로 쓴다.
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
};

export function ConfirmDialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>}
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={dialogOverlayClass} />
        <AlertDialog.Content
          className={dialogContentClass}
          // 설명이 없으면 Radix 경고가 뜨지 않도록 aria-describedby를 비운다는 걸 명시한다.
          {...(!description && { 'aria-describedby': undefined })}
        >
          <div className={dialogHeaderClass}>
            <AlertDialog.Title className={dialogTitleClass}>{title}</AlertDialog.Title>
            {description && (
              <AlertDialog.Description className={dialogDescriptionClass}>
                {description}
              </AlertDialog.Description>
            )}
          </div>
          <div className={dialogActionsClass}>
            {cancelLabel && (
              <AlertDialog.Cancel asChild>
                <Button variant="secondary">{cancelLabel}</Button>
              </AlertDialog.Cancel>
            )}
            <AlertDialog.Action asChild>
              <Button variant="primary" onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
