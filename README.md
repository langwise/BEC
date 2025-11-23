# BEC - Bangkok Education Center

Modern monorepo setup with Turborepo for the Bangkok Education Center website.

## Tech Stack

- **Turborepo** - Latest (v2.6.1) for monorepo management
- **Next.js** - v16.0.3 with App Router
- **TypeScript** - v5.9+
- **TailwindCSS** - v4.1+ (latest version)
- **shadcn/ui** - Ready to use with component library setup
- **pnpm** - v10.23.0 for package management

## Project Structure

```
.
├── apps/
│   └── web/          # Main Next.js application
├── package.json      # Root package.json with turborepo scripts
├── pnpm-workspace.yaml
└── turbo.json        # Turborepo configuration
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 10

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# The app will be available at http://localhost:3000
```

### Building

```bash
# Build all apps
pnpm build
```

### Other Commands

```bash
# Lint all apps
pnpm lint

# Start production server
pnpm start
```

## shadcn/ui Integration

The project is configured to use shadcn/ui components. The configuration is in `apps/web/components.json`.

**Note:** Due to network restrictions, components need to be added manually. The utility function is already set up at `apps/web/src/lib/utils.ts`.

### Theme Configuration

The project uses TailwindCSS v4 with custom theme variables defined in `apps/web/src/app/globals.css`. The theme includes:
- Light and dark mode support
- shadcn/ui color palette
- Custom radius values

## Learn More

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS v4 Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

---

https://www.becbgk.edu/
