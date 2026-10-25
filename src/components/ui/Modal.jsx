import { Fragment, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(8, 4, 16, 0.65);
  backdrop-filter: blur(3px);
`;

const Dialog = styled.div`
  position: fixed;
  z-index: 51;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(36rem, calc(100vw - 2rem));
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  background: var(--surface);
  color: var(--fg);
  border: 1px solid var(--line);
  border-radius: 1.1rem;
  padding: 1.5rem;
  box-shadow: 0 0 60px var(--glow);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  border: 1px solid var(--line);
  background: transparent;
  color: var(--fg);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
`;

/**
 * Modal rendered into document.body through a Portal.
 * Fragment lets us return the backdrop and the dialog as siblings.
 */
export default function Modal({ title, onClose, children }) {
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  return createPortal(
    <Fragment>
      <Backdrop onClick={onClose} />
      <Dialog role="dialog" aria-modal="true" aria-label={title}>
        <Header>
          <h2 className="text-xl font-bold">{title}</h2>
          <CloseButton ref={closeRef} type="button" onClick={onClose} aria-label="Close">
            ×
          </CloseButton>
        </Header>
        {children}
      </Dialog>
    </Fragment>,
    document.body,
  );
}
