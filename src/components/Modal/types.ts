export interface ModalProps {
  isOpen: boolean;
  shouldCloseWhenPressESC?: boolean;
  shouldCloseWhenClickBackdrop?: boolean;
  onClose?: () => void;
}

export interface ModalManagedProps {
  style: Pick<React.CSSProperties, 'zIndex'>;
}

export interface StaticModal<P> {
  update(props: Partial<P>): void;
  close(): void;
}

export interface OpenStaticModalFn<P> {
  (initialState?: P): StaticModal<P>;
}

export type ModalWithOpenStaticModalFn<P extends ModalProps> = React.FC<P> & {
  open: OpenStaticModalFn<P>;
};
