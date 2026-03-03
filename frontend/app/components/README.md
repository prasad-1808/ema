# Component Structure

This project follows **Atomic Design** principles for maximum reusability and maintainability.

## Directory Structure

```
app/components/
├── ui/           # shadcn/ui components (installed via CLI)
├── atoms/        # Basic building blocks (Button, Input, Label, etc.)
├── molecules/    # Simple combinations of atoms (FormField, SearchBar, etc.)
├── organisms/    # Complex UI components (Header, Sidebar, EventCard, etc.)
└── templates/    # Page-level layouts (DashboardLayout, AuthLayout, etc.)
```

## Component Guidelines

### Atoms
- Single-purpose, minimal components
- No dependencies on other custom components
- Examples: Button, Input, Badge, Avatar
- Use shadcn/ui components from `ui/` folder

### Molecules
- Combinations of 2-3 atoms
- Single responsibility
- Examples: FormField (Label + Input + Error), SearchBar (Input + Icon)

### Organisms
- Complex, feature-rich components
- Can contain atoms and molecules
- Examples: EventCard, UserProfile, NavigationMenu

### Templates
- Page layouts without specific content
- Define structure and composition
- Examples: DashboardLayout, AuthLayout

## Best Practices

1. **Reusability**: Design components to be reusable across the app
2. **Props Interface**: Always define TypeScript interfaces for props
3. **Composition**: Prefer composition over inheritance
4. **Single Responsibility**: Each component should do one thing well
5. **Customization**: Use className prop for styling flexibility
6. **Accessibility**: Follow ARIA guidelines

## Example Component

\`\`\`tsx
// atoms/Button.tsx
import { cn } from "~/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md",
        variant === "primary" && "bg-blue-600 text-white",
        variant === "secondary" && "bg-gray-200 text-gray-900",
        className
      )}
      {...props}
    />
  )
}
\`\`\`

## Using shadcn/ui

Install components using:
\`\`\`bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
\`\`\`

Components will be added to `app/components/ui/`
