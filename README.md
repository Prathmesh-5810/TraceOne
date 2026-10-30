# TraceOne — Blockchain-Based Manufacturing Quality & Traceability Platform

TraceOne is a high-precision, enterprise tracking and traceability management platform engineered to resolve the challenge of fragmented manufacturing records. Grounded in the TraceOne technical specification blueprint and reference architecture, this platform unifies physical products with tamper-evident digital quality passports.

---

## Strict Black and White Design System

The application strictly adheres to a pure monochromatic palette:
- **Pure Black** (`#000000`)
- **Pure White** (`#FFFFFF`)
- **Opacity variations** for borders, surfaces, shadows, and secondary text.
- **Zero color accents**: No blue, green, orange, red, or yellow hues. All semantic statuses (verified, in transit, delivered, review) are communicated through iconography, contrast, and typography.

---

## Key Functional Modules

1. **Global Tracking & Traceability Dashboard**:
   - Real-time global search across tracking IDs, products, batches, and locations.
   - High-density KPI summary cards with tabular numerals.
   - Featured Bookmark Cards showcasing digital product passports with hover glow dissolution.
   - Filterable, searchable, and sortable Recent Activity table with sliding pill controls.

2. **Individual Item Tracking & Shipments**:
   - Query by unique Tracking ID (e.g. `TRC-9014-GEAR`, `TRC-5520-AERO`).
   - 7-Stage Chronological Lifecycle Journey grounded in the TraceOne specification:
     `Manufacturing → Inspection → Certification → Distribution → Customer → Service/Repair → Recall`.
   - Comprehensive facility metadata, GPS coordinates, carrier details, and edge sensor readings.

3. **Traceability & Digital Quality Passports**:
   - Cryptographically verifiable Digital Product Passports (DPP).
   - Crisp SVG QR code linking physical items to on-chain references.
   - Off-chain IPFS storage references (CIDs) and on-chain Ethereum smart contract hashes.
   - **Interactive Tamper-Detection Simulator**: Real-time SHA-256 calculation demonstrating hash matching versus instant mismatch alerts when off-chain records are altered.

4. **Reports & Operational Analytics**:
   - Item-Flow stage-gate funnel visualization.
   - Batch status distribution summaries.
   - Multi-criteria filtering (time range, geographic location, product category).
   - Audit-ready PDF report generation and client-side print export.

5. **3D Procedural Shader Visualizer**:
   - Fullscreen Three.js WebGL canvas running custom black-and-white GLSL shaders.
   - Ergonomic collapsible bottom control dock with waveform speed and contour density sliders.
   - Performance optimizations: DPR capped at 2.0, visibilitychange auto-pausing, and accessible fallback.

6. **Interactive Background Layers**:
   - **Static Mesh Flow**: 2D Canvas interactive dot grid that bends around pointer coordinates using a single Gaussian influence function.
   - **Subscribe Shine Button**: Rotating monochromatic border highlight driven by the Web Animations API (WAAPI).
   - **Sliding Pill Navigation**: Dynamically calculating `offsetLeft` and `offsetWidth` with smooth cubic-bezier transitions.
   - **Theme Toggle**: Glass-style animated dark/light mode toggle with persistence in `localStorage`.

---

## Multi-Industry Domain Presets

Supports seamless toggling between three manufacturing domains:
- **Industrial Machinery & Precision Components** (Planetary gear assemblies, hydraulic proportional valves)
- **High-Tech Electronics & Semiconductors** (Neural accelerator NPUs, GaN power converters)
- **Aerospace & Automotive Assemblies** (Single-crystal turbine blades, electro-hydraulic brake actuators)

---

## Simulated Integrations & Technical Architecture

- **Blockchain Smart Contracts**: Simulated Ethereum Sepolia Testnet contract interactions with authentic transaction hashes and block numbers.
- **Decentralized Storage**: Simulated IPFS pinning cluster referencing authentic Content Identifiers (CIDs) and document digests.
- **Edge Computer Vision**: YOLOv11 defect classification models with realistic confidence scoring and decision gates.

---

## Getting Started

```bash
# Install dependencies
npm install

# Run Vite development server
npm run dev

# Run production build
npm run build
```
