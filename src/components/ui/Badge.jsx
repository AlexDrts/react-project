import styled, { css } from "styled-components";

const VARIANTS = {
  sale: css`
    background: var(--accent);
    color: var(--on-accent);
  `,
  muted: css`
    background: var(--surface-2);
    color: var(--muted);
    border: 1px solid var(--line);
  `,
  ok: css`
    background: transparent;
    color: var(--ok);
    border: 1px solid var(--ok);
  `,
  danger: css`
    background: transparent;
    color: var(--danger);
    border: 1px solid var(--danger);
  `,
};

/** Dynamic styles: the look is picked by the `$variant` prop. */
const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1.4;
  white-space: nowrap;
  ${({ $variant = "muted" }) => VARIANTS[$variant]}
`;

export default Badge;
