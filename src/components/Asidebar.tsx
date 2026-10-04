import * as React from "react";

export interface AsideNavItem {
  /** Unique key for the item */
  id: string;
  /** Text shown next to the icon (used as tooltip when collapsed) */
  label: string;
  /** Optional icon, e.g. an SVG element */
  icon?: React.ReactNode;
  /** If set, the item renders as a link */
  href?: string;
  /** Marks the item as the current page */
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface AsideProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Color scheme */
  mode?: "dark" | "light";
  /** Navigation entries */
  items?: AsideNavItem[];
  /** Content at the top, e.g. a logo or app name */
  header?: React.ReactNode;
  /** Content at the bottom, e.g. a user menu */
  footer?: React.ReactNode;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Initial collapsed state when uncontrolled */
  defaultCollapsed?: boolean;
  /** Called when the user toggles the sidebar */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Show the collapse toggle button */
  collapsible?: boolean;
  /** Width when expanded (any CSS length) */
  width?: string | number;
  /** Width when collapsed (any CSS length) */
  collapsedWidth?: string | number;
  /** Accessible name for the navigation landmark */
  navLabel?: string;
}

const themes = {
  dark: {
    bg: "#1b1d22",
    fg: "#e8e9ec",
    muted: "#9096a2",
    border: "#2d3038",
    hover: "#262930",
    activeBg: "#323744",
    accent: "#7aa2ff",
  },
  light: {
    bg: "#f6f7f9",
    fg: "#1a1c20",
    muted: "#646b78",
    border: "#dcdfe4",
    hover: "#ebedf0",
    activeBg: "#dfe4ee",
    accent: "#2f5bd8",
  },
} as const;

const css = `
.myui-aside-item{display:flex;align-items:center;gap:12px;width:100%;box-sizing:border-box;
  padding:8px 10px;border:0;border-radius:6px;background:transparent;color:var(--aside-muted);
  font:inherit;font-size:14px;text-align:left;text-decoration:none;cursor:pointer;
  white-space:nowrap;overflow:hidden;position:relative}
.myui-aside-item:hover{background:var(--aside-hover);color:var(--aside-fg)}
.myui-aside-item[aria-current="page"]{background:var(--aside-active-bg);color:var(--aside-fg);font-weight:600}
.myui-aside-item[aria-current="page"]::before{content:"";position:absolute;left:0;top:6px;bottom:6px;
  width:3px;border-radius:2px;background:var(--aside-accent)}
.myui-aside-item:focus-visible,.myui-aside-toggle:focus-visible{outline:2px solid var(--aside-accent);outline-offset:2px}
.myui-aside-toggle{display:grid;place-items:center;width:32px;height:32px;border:0;border-radius:6px;
  background:transparent;color:var(--aside-muted);cursor:pointer;flex-shrink:0}
.myui-aside-toggle:hover{background:var(--aside-hover);color:var(--aside-fg)}
@media (prefers-reduced-motion:reduce){.myui-aside{transition:none!important}}
`;

const toCss = (v: string | number) => (typeof v === "number" ? `${v}px` : v);

export function AsideBar({
  mode = "dark",
  items = [],
  header,
  footer,
  collapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  collapsible = true,
  width = 240,
  collapsedWidth = 64,
  navLabel = "Main navigation",
  style,
  children,
  ...props
}: AsideProps) {
  const [internal, setInternal] = React.useState(defaultCollapsed);
  const isControlled = collapsed !== undefined;
  const isCollapsed = isControlled ? collapsed : internal;
  const t = themes[mode];

  const toggle = () => {
    const next = !isCollapsed;
    if (!isControlled) setInternal(next);
    onCollapsedChange?.(next);
  };

  const cssVars = {
    "--aside-bg": t.bg,
    "--aside-fg": t.fg,
    "--aside-muted": t.muted,
    "--aside-hover": t.hover,
    "--aside-active-bg": t.activeBg,
    "--aside-accent": t.accent,
  } as React.CSSProperties;

  return (
    <aside
      className="myui-aside"
      data-collapsed={isCollapsed}
      {...props}
      style={{
        ...cssVars,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        width: toCss(isCollapsed ? collapsedWidth : width),
        flexShrink: 0,
        height: "100dvh",
        position: "sticky",
        top: 0,
        padding: 12,
        gap: 12,
        backgroundColor: t.bg,
        color: t.fg,
        borderRight: `1px solid ${t.border}`,
        transition: "width 160ms ease",
        overflow: "hidden",
        ...style, // user styles win
      }}
    >
      <style>{css}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
          gap: 8,
          minHeight: 32,
        }}
      >
        {!isCollapsed && <div style={{ minWidth: 0, fontWeight: 600 }}>{header}</div>}
        {collapsible && (
          <button
            type="button"
            className="myui-aside-toggle"
            onClick={toggle}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!isCollapsed}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d={isCollapsed ? "M6 3l5 5-5 5" : "M10 3L5 8l5 5"}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      <nav
        aria-label={navLabel}
        style={{ flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}
      >
        {items.map((item) => {
          const content = (
            <>
              {item.icon && (
                <span style={{ display: "grid", placeItems: "center", width: 20, flexShrink: 0 }}>
                  {item.icon}
                </span>
              )}
              {!isCollapsed && <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>}
            </>
          );
          const common = {
            className: "myui-aside-item",
            title: isCollapsed ? item.label : undefined,
            "aria-label": isCollapsed ? item.label : undefined,
            "aria-current": item.active ? ("page" as const) : undefined,
            onClick: item.onClick,
          };
          return item.href ? (
            <a key={item.id} href={item.href} {...common}>
              {content}
            </a>
          ) : (
            <button key={item.id} type="button" {...common}>
              {content}
            </button>
          );
        })}
        {children}
      </nav>

      {footer && !isCollapsed && (
        <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: 12, fontSize: 14, color: t.muted }}>
          {footer}
        </div>
      )}
    </aside>
  );
}