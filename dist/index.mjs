// src/components/Button.tsx
import { jsx } from "react/jsx-runtime";
function Button({ variant = "primary", style, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      style: {
        padding: "8px 16px",
        borderRadius: 6,
        border: "none",
        cursor: "pointer",
        background: variant === "primary" ? "#ff0000" : "#e5e7eb",
        color: variant === "primary" ? "#fff" : "#111",
        ...style
      },
      ...props
    }
  );
}

// src/components/Asidebar.tsx
import * as React from "react";
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var themes = {
  dark: {
    bg: "#1b1d22",
    fg: "#e8e9ec",
    muted: "#9096a2",
    border: "#2d3038",
    hover: "#262930",
    activeBg: "#323744",
    accent: "#7aa2ff"
  },
  light: {
    bg: "#f6f7f9",
    fg: "#1a1c20",
    muted: "#646b78",
    border: "#dcdfe4",
    hover: "#ebedf0",
    activeBg: "#dfe4ee",
    accent: "#2f5bd8"
  }
};
var css = `
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
var toCss = (v) => typeof v === "number" ? `${v}px` : v;
function AsideBar({
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
}) {
  const [internal, setInternal] = React.useState(defaultCollapsed);
  const isControlled = collapsed !== void 0;
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
    "--aside-accent": t.accent
  };
  return /* @__PURE__ */ jsxs(
    "aside",
    {
      className: "myui-aside",
      "data-collapsed": isCollapsed,
      ...props,
      style: {
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
        ...style
        // user styles win
      },
      children: [
        /* @__PURE__ */ jsx2("style", { children: css }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: isCollapsed ? "center" : "space-between",
              gap: 8,
              minHeight: 32
            },
            children: [
              !isCollapsed && /* @__PURE__ */ jsx2("div", { style: { minWidth: 0, fontWeight: 600 }, children: header }),
              collapsible && /* @__PURE__ */ jsx2(
                "button",
                {
                  type: "button",
                  className: "myui-aside-toggle",
                  onClick: toggle,
                  "aria-label": isCollapsed ? "Expand sidebar" : "Collapse sidebar",
                  "aria-expanded": !isCollapsed,
                  children: /* @__PURE__ */ jsx2("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx2(
                    "path",
                    {
                      d: isCollapsed ? "M6 3l5 5-5 5" : "M10 3L5 8l5 5",
                      stroke: "currentColor",
                      strokeWidth: "1.6",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }
                  ) })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "nav",
          {
            "aria-label": navLabel,
            style: { flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 },
            children: [
              items.map((item) => {
                const content = /* @__PURE__ */ jsxs(Fragment, { children: [
                  item.icon && /* @__PURE__ */ jsx2("span", { style: { display: "grid", placeItems: "center", width: 20, flexShrink: 0 }, children: item.icon }),
                  !isCollapsed && /* @__PURE__ */ jsx2("span", { style: { overflow: "hidden", textOverflow: "ellipsis" }, children: item.label })
                ] });
                const common = {
                  className: "myui-aside-item",
                  title: isCollapsed ? item.label : void 0,
                  "aria-label": isCollapsed ? item.label : void 0,
                  "aria-current": item.active ? "page" : void 0,
                  onClick: item.onClick
                };
                return item.href ? /* @__PURE__ */ jsx2("a", { href: item.href, ...common, children: content }, item.id) : /* @__PURE__ */ jsx2("button", { type: "button", ...common, children: content }, item.id);
              }),
              children
            ]
          }
        ),
        footer && !isCollapsed && /* @__PURE__ */ jsx2("div", { style: { borderTop: `1px solid ${t.border}`, paddingTop: 12, fontSize: 14, color: t.muted }, children: footer })
      ]
    }
  );
}
export {
  AsideBar,
  Button
};
