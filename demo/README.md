# ngx-apexgantt Demo Application

This demo application showcases the **ngx-apexgantt** wrapper library with 4 comprehensive examples.

## Prerequisites

You need to have the **ngx-apexgantt library built** first.

## Setup

### 1. Build the Library (in the wrapper folder)

First, navigate to your `ngx-apexgantt` library folder and build it:

```bash
cd ../ngx-apexgantt
npm install
npm run build
```

This creates `dist/ngx-apexgantt/` with the compiled library.

### 2. Install Demo Dependencies

Return to this demo folder and install:

```bash
cd ../ngx-apexgantt-demo-standalone
npm install
```

The `package.json` references the built library using:
```json
"ngx-apexgantt": "file:../ngx-apexgantt/dist/ngx-apexgantt"
```

### 3. Run the Demo

```bash
npm start
```

Open browser to `http://localhost:4200`

## What's Included

### 4 Demo Components:

1. **Basic Demo** - Simple gantt with linear dependencies
2. **Interactivity + Styling** - Drag, drop, resize with custom colors
3. **Events Demo** - Real-time event logging
4. **Dark Theme Demo** - Dark mode support

## Folder Structure

```
├── src/
│   └── app/
│       ├── demos/
│       │   ├── basic-demo.component.*
│       │   ├── interactive-demo.component.*
│       │   ├── events-demo.component.*
│       │   └── dark-theme-demo.component.*
│       ├── app.component.* 
│       └── ...
└── package.json
```

## Using Published Package

Once the library is published to npm, update `package.json`:

```json
{
  "dependencies": {
    "ngx-apexgantt": "^1.0.0"  // use published version
  }
}
```

Then run `npm install` again.

## Development Workflow

1. Make changes to library (`../ngx-apexgantt/src/lib/`)
2. Rebuild library: `cd ../ngx-apexgantt && npm run build`
3. Restart demo: `cd ../ngx-apexgantt-demo-standalone && npm start`

The demo automatically uses the latest built version of the library.
