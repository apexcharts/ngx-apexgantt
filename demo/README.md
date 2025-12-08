# ngx-apexgantt Demo Application

This demo application showcases the **ngx-apexgantt** wrapper library.

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

## Development Workflow

1. Make changes to library (`../ngx-apexgantt/src/lib/`)
2. Rebuild library: `cd ../ngx-apexgantt && npm run build`
3. Restart demo: `cd ../ngx-apexgantt-demo-standalone && npm start`

The demo automatically uses the latest built version of the library.
