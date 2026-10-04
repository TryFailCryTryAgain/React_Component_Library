import type { Meta, StoryObj } from "@storybook/react-vite";
import  { AsideBar as Asidebar } from "./Asidebar";

const Dot = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="8" r="5" fill="currentColor" />
  </svg>
);
 
const meta: Meta<typeof Asidebar> = {
  title: "Components/AsideBar",
  component: Asidebar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    header: "My App",
    footer: "Signed in as you",
    items: [
      { id: "home", label: "Home", icon: <Dot />, href: "#home", active: true },
      { id: "projects", label: "Projects", icon: <Dot />, href: "#projects" },
      { id: "settings", label: "Settings", icon: <Dot />, href: "#settings" },
    ],
  },
};
export default meta;
 
type Story = StoryObj<typeof Asidebar>;
 
export const Dark: Story = { args: { mode: "dark" } };
export const Light: Story = { args: { mode: "light" } };
export const StartsCollapsed: Story = { args: { defaultCollapsed: true } };