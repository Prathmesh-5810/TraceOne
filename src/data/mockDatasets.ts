/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TraceItem } from '../types/traceone';

export const INITIAL_TRACE_ITEMS: TraceItem[] = [
  // --- Industrial Machinery & Precision Components ---
  {
    id: 'trc-item-001',
    trackingId: 'TRC-9014-GEAR',
    serialNumber: 'SN-MACH-882910',
    name: 'Precision Planetary Gear Assembly (Stage 2)',
    category: 'Mechanical Powertrain',
    industry: 'machinery',
    batchId: 'BATCH-2026-081',
    status: 'In Transit',
    lastKnownLocation: {
      facility: 'Central Distribution Hub #4',
      city: 'Stuttgart',
      country: 'Germany',
      coordinates: '48.7758° N, 9.1829° E'
    },
    manufacturer: {
      name: 'Vanguard Industrial Dynamics AG',
      facilityId: 'FAC-GER-STU-04',
      operatorId: 'OP-4491-KLAUS',
      standard: 'ISO 9001:2015 / DIN 3960',
      productionDate: '2026-10-18T07:22:10Z',
      edgeGateway: 'EDGE-GWAY-GER-09'
    },
    inspection: {
      score: 99.4,
      defectCount: 0,
      model: 'YOLOv11-IndustrialDefect-v4',
      decision: 'PASSED',
      aiConfidence: 0.994,
      inspectionTimestamp: '2026-10-18T10:14:02Z',
      yoloVersion: 'YOLOv11-Enterprise'
    },
    ipfs: {
      cid: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
      fileSize: '14.8 MB',
      pinnedGateways: 12,
      rawDocumentHash: 'a7f3408b49e6d7821c9053da5f812d33458bfb921c4501a349d97034f19b22e1'
    },
    blockchain: {
      contractAddress: '0x328bF9eC40F00185cEb778B5F6e469b2d8B182Cc',
      blockNumber: 18942041,
      txHash: '0x8f2d59ca18a7b3127815cf1b047e09ef78479e3bc89fbb2efc33e887e148283a',
      blockTimestamp: '2026-10-18T10:15:30Z',
      network: 'Ethereum Sepolia Testnet (PoS)',
      gasUsed: '48,129 Gwei'
    },
    digitalPassport: {
      passportId: 'DPP-2026-MACH-9014',
      qrPayload: 'https://traceone.network/verify?tid=TRC-9014-GEAR&cid=QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
      issueDate: '2026-10-18',
      certificateHash: 'a7f3408b49e6d7821c9053da5f812d33458bfb921c4501a349d97034f19b22e1',
      verified: true,
      sdgAlignment: ['SDG 9: Industry & Innovation', 'SDG 12: Responsible Production', 'SDG 17: Partnerships']
    },
    timeline: [
      {
        stage: 'manufacturing',
        label: 'Edge Line Capture & CNC Milling',
        facility: 'Plant 4 Forge Bay, Stuttgart',
        timestamp: '2026-10-18 07:22 UTC',
        operator: 'Klaus M. (OP-4491)',
        txHash: '0x99281a9f029c782193b...',
        ipfsCid: 'QmLineDataRaw0918231',
        status: 'completed',
        details: {
          description: 'High-precision 5-axis gear tooth milling with tolerance within ±0.002mm.',
          metrics: { 'Tolerance (mm)': '±0.0018', 'Hardness HRC': 62.4, 'Cycle Time (min)': 18.5 }
        }
      },
      {
        stage: 'inspection',
        label: 'Automated AI Defect Vision Scan',
        facility: 'Quality Lab Chamber 2',
        timestamp: '2026-10-18 10:14 UTC',
        operator: 'System (YOLO-Industrial)',
        txHash: '0x8f2d59ca18a7b312781...',
        ipfsCid: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
        status: 'completed',
        details: {
          description: 'Zero surface micro-fractures, burrs, or pitting detected across 12 teeth surfaces.',
          metrics: { 'Defects Detected': 0, 'Confidence Score': '99.4%', 'Inspection Cameras': 4 }
        }
      },
      {
        stage: 'certification',
        label: 'Cryptographic Passport Minting',
        facility: 'TraceOne Verification Node',
        timestamp: '2026-10-18 10:15 UTC',
        operator: 'Smart Contract Executor',
        txHash: '0x17afc489230198cd...',
        ipfsCid: 'QmCertPassport0918',
        status: 'completed',
        details: {
          description: 'Document content hash anchored to on-chain smart contract. Digital Product Passport initialized.',
          notes: 'NIST Blockchain Overview compliance standard verified.'
        }
      },
      {
        stage: 'distribution',
        label: 'Dispatched to Western Distribution Depot',
        facility: 'Logistics Center Frankfurt',
        timestamp: '2026-10-22 14:30 UTC',
        operator: 'DHL Global Forwarding',
        txHash: '0x44fa7812903bb...',
        ipfsCid: 'QmWaybill441920',
        status: 'current',
        details: {
          description: 'Palletized under shock-monitored atmospheric crate. Waybill TR-8910-DE.',
          metrics: { 'Vibration Peak (G)': 0.12, 'Temp (°C)': 19.8, 'Humidity (%)': 42 }
        }
      },
      {
        stage: 'customer',
        label: 'Consignee Verification Handover',
        facility: 'Siemens Energy Turbine Plant',
        timestamp: 'Pending Dispatch Arrival',
        operator: 'Receiving Inspector',
        txHash: 'Pending',
        ipfsCid: 'Pending',
        status: 'pending',
        details: {
          description: 'Scheduled for digital acceptance via mobile QR verification scan.'
        }
      },
      {
        stage: 'service',
        label: 'Lifecycle Telemetry & Maintenance',
        facility: 'On-site Field Telemetry',
        timestamp: 'Scheduled 50,000h Service',
        operator: 'Field Services',
        txHash: 'Pending',
        ipfsCid: 'Pending',
        status: 'pending',
        details: {
          description: 'Oil analysis and acoustic vibration check planned for year 2.'
        }
      },
      {
        stage: 'recall',
        label: 'Batch Recall & Defect Guard',
        facility: 'Global Safety Network',
        timestamp: 'Continuous',
        operator: 'Automated Sentinel',
        txHash: '0x0000000000000...',
        ipfsCid: 'Safe',
        status: 'completed',
        details: {
          description: 'Batch 2026-081 active status: NO RECALL FLAGS. Integrity verified.'
        }
      }
    ]
  },
  {
    id: 'trc-item-002',
    trackingId: 'TRC-3381-VALVE',
    serialNumber: 'SN-MACH-771923',
    name: 'High-Pressure Hydraulic Proportional Valve',
    category: 'Fluid Mechanics',
    industry: 'machinery',
    batchId: 'BATCH-2026-081',
    status: 'Delivered',
    lastKnownLocation: {
      facility: 'Bosch Rexroth Assembly Line 3',
      city: 'Lohr am Main',
      country: 'Germany',
      coordinates: '49.9961° N, 9.5786° E'
    },
    manufacturer: {
      name: 'Vanguard Industrial Dynamics AG',
      facilityId: 'FAC-GER-STU-04',
      operatorId: 'OP-3108-MARKUS',
      standard: 'ISO 4401 / DIN 24340',
      productionDate: '2026-10-12T08:00:00Z',
      edgeGateway: 'EDGE-GWAY-GER-09'
    },
    inspection: {
      score: 98.8,
      defectCount: 0,
      model: 'YOLOv11-IndustrialDefect-v4',
      decision: 'PASSED',
      aiConfidence: 0.988,
      inspectionTimestamp: '2026-10-12T11:20:00Z',
      yoloVersion: 'YOLOv11-Enterprise'
    },
    ipfs: {
      cid: 'QmRAQB6YaCyidP37UdDnjFY5vQuiB26658128372618',
      fileSize: '8.4 MB',
      pinnedGateways: 8,
      rawDocumentHash: 'c4e91209b57492a8310d7efb432a9018c5e93217409bc92e1048f0293da829c7'
    },
    blockchain: {
      contractAddress: '0x328bF9eC40F00185cEb778B5F6e469b2d8B182Cc',
      blockNumber: 18939100,
      txHash: '0x3a4b9c1d0e123456789abcdef0123456789abcdef0123456789abcdef0123456',
      blockTimestamp: '2026-10-12T11:25:12Z',
      network: 'Ethereum Sepolia Testnet (PoS)',
      gasUsed: '45,820 Gwei'
    },
    digitalPassport: {
      passportId: 'DPP-2026-MACH-3381',
      qrPayload: 'https://traceone.network/verify?tid=TRC-3381-VALVE',
      issueDate: '2026-10-12',
      certificateHash: 'c4e91209b57492a8310d7efb432a9018c5e93217409bc92e1048f0293da829c7',
      verified: true,
      sdgAlignment: ['SDG 9: Industry & Innovation', 'SDG 12: Responsible Production']
    },
    timeline: [
      {
        stage: 'manufacturing',
        label: 'Spool Bore Honing & Spool Seating',
        facility: 'Plant 4 Hydraulics Center',
        timestamp: '2026-10-12 08:00 UTC',
        operator: 'Markus H. (OP-3108)',
        txHash: '0x550198fa10...',
        ipfsCid: 'QmValveHoneData991',
        status: 'completed',
        details: { description: 'Hydrostatic testing at 350 bar completed without seepage.' }
      },
      {
        stage: 'inspection',
        label: 'Pressure Decay & AI Inspection',
        facility: 'Test Bench Alpha',
        timestamp: '2026-10-12 11:20 UTC',
        operator: 'AI Vision QA System',
        txHash: '0x3a4b9c1d0e...',
        ipfsCid: 'QmRAQB6YaCyidP37UdDnjFY5vQuiB26658128372618',
        status: 'completed',
        details: { description: 'Leakage rate < 0.05 cc/min under 315 bar.' }
      },
      {
        stage: 'certification',
        label: 'Certificate of Conformance Stamped',
        facility: 'TÜV Rheinland Integrated Node',
        timestamp: '2026-10-12 11:25 UTC',
        operator: 'Auditor ID 942',
        txHash: '0x88912ba091...',
        ipfsCid: 'QmCertTuv901',
        status: 'completed',
        details: { description: 'TÜV certified according to EN ISO 4413.' }
      },
      {
        stage: 'distribution',
        label: 'Ground Freight Delivery',
        facility: 'Schenker Logistics Express',
        timestamp: '2026-10-15 09:30 UTC',
        operator: 'Courier ID 182',
        txHash: '0x7781bce91...',
        ipfsCid: 'QmLogisticsWaybill01',
        status: 'completed',
        details: { description: 'Delivered in sealed anti-static moisture barrier packing.' }
      },
      {
        stage: 'customer',
        label: 'Customer Acceptance Verified',
        facility: 'Bosch Rexroth Plant Lohr',
        timestamp: '2026-10-15 16:45 UTC',
        operator: 'Inbound QA Team',
        txHash: '0x66181bca09...',
        ipfsCid: 'QmAcceptanceRec01',
        status: 'completed',
        details: { description: 'QR scan authenticated against Sepolia smart contract.' }
      },
      {
        stage: 'service',
        label: 'Operational In-Service',
        facility: 'Active Machine Bay 4',
        timestamp: '2026-10-18 09:00 UTC',
        operator: 'Plant Ops',
        txHash: '0x11882200aa...',
        ipfsCid: 'QmOpsStatus99',
        status: 'completed',
        details: { description: 'Running nominal duty cycles at 280 bar.' }
      },
      {
        stage: 'recall',
        label: 'Safety Sentinel Active',
        facility: 'Central Registry',
        timestamp: 'Continuous',
        operator: 'Sentinel AI',
        txHash: '0x0000000000...',
        ipfsCid: 'Safe',
        status: 'completed',
        details: { description: 'Zero recall alerts across batch.' }
      }
    ]
  },

  // --- High-Tech Electronics & Semiconductor Assemblies ---
  {
    id: 'trc-item-003',
    trackingId: 'TRC-4102-SEMI',
    serialNumber: 'SN-ELEC-904128',
    name: 'Neural Accelerator Processing Module (NPU-X)',
    category: 'Semiconductor Hardware',
    industry: 'electronics',
    batchId: 'BATCH-2026-SEMI-04',
    status: 'In Transit',
    lastKnownLocation: {
      facility: 'Air Freight Cargo Terminal 3',
      city: 'Taipei',
      country: 'Taiwan',
      coordinates: '25.0797° N, 121.2342° E'
    },
    manufacturer: {
      name: 'Nexis Microelectronics Foundry',
      facilityId: 'FAB-TWN-HSIN-02',
      operatorId: 'OP-9812-CHEN',
      standard: 'JEDEC JESD22 / AEC-Q100',
      productionDate: '2026-10-24T03:15:00Z',
      edgeGateway: 'EDGE-SEMI-NODE-03'
    },
    inspection: {
      score: 97.2,
      defectCount: 0,
      model: 'YOLOv11-WaferDefect-v2',
      decision: 'PASSED',
      aiConfidence: 0.972,
      inspectionTimestamp: '2026-10-24T06:30:15Z',
      yoloVersion: 'YOLOv11-EdgeAI'
    },
    ipfs: {
      cid: 'QmPZ9gcCEpqKTo6aq61g2nXGUhM49wbduc32GvhaGhYPvm',
      fileSize: '32.1 MB',
      pinnedGateways: 16,
      rawDocumentHash: 'f5a287319c0b38418e77a28194dc62193e50672b10a29efb718917203498acbd'
    },
    blockchain: {
      contractAddress: '0x328bF9eC40F00185cEb778B5F6e469b2d8B182Cc',
      blockNumber: 18944512,
      txHash: '0x12a9bc746819b02847ef102948c08192a019481b092837482910fa89218bc190',
      blockTimestamp: '2026-10-24T06:32:00Z',
      network: 'Ethereum Sepolia Testnet (PoS)',
      gasUsed: '51,440 Gwei'
    },
    digitalPassport: {
      passportId: 'DPP-2026-SEMI-4102',
      qrPayload: 'https://traceone.network/verify?tid=TRC-4102-SEMI',
      issueDate: '2026-10-24',
      certificateHash: 'f5a287319c0b38418e77a28194dc62193e50672b10a29efb718917203498acbd',
      verified: true,
      sdgAlignment: ['SDG 9: Industry & Innovation', 'SDG 12: Responsible Production']
    },
    timeline: [
      {
        stage: 'manufacturing',
        label: 'Advanced 4nm Photolithography & Wire Bonding',
        facility: 'Cleanroom Class 100, Hsinchu',
        timestamp: '2026-10-24 03:15 UTC',
        operator: 'Chen L. (OP-9812)',
        txHash: '0x09182374619...',
        ipfsCid: 'QmWaferLogs99',
        status: 'completed',
        details: { description: 'Package substrate BGA solder ball coplanarity: 0.08mm.' }
      },
      {
        stage: 'inspection',
        label: 'Optical Automated X-Ray Inspection (AXI)',
        facility: 'Semiconductor QA Bay 3',
        timestamp: '2026-10-24 06:30 UTC',
        operator: 'Vision Inspection Sub-system',
        txHash: '0x12a9bc74681...',
        ipfsCid: 'QmPZ9gcCEpqKTo6aq61g2nXGUhM49wbduc32GvhaGhYPvm',
        status: 'completed',
        details: { description: '100% ball grid connectivity, zero void ratio above 3%.' }
      },
      {
        stage: 'certification',
        label: 'AEC-Q100 Reliability Signature',
        facility: 'Consortium Trust Authority',
        timestamp: '2026-10-24 06:32 UTC',
        operator: 'Smart Contract Service',
        txHash: '0x8817293a10...',
        ipfsCid: 'QmCertAecQ100',
        status: 'completed',
        details: { description: 'Cryptographic proof published to Ethereum ledger.' }
      },
      {
        stage: 'distribution',
        label: 'En Route to North America Cloud Facility',
        facility: 'EVA Air Cargo Flight BR-28',
        timestamp: '2026-10-28 18:20 UTC',
        operator: 'Global Trans Logistics',
        txHash: '0x339182bb19...',
        ipfsCid: 'QmFlightManifest918',
        status: 'current',
        details: { description: 'Cold chain dry-pack nitrogen nitrogen-sealed containers.' }
      },
      {
        stage: 'customer',
        label: 'Data Center Rack Integration',
        facility: 'Silicon Valley Supercomputer Center',
        timestamp: 'Expected 2026-11-02',
        operator: 'Datacenter Hardware Team',
        txHash: 'Pending',
        ipfsCid: 'Pending',
        status: 'pending',
        details: { description: 'Pending delivery to server blade integration suite.' }
      },
      {
        stage: 'service',
        label: 'Firmware & Telemetry Logging',
        facility: 'Fleet Monitoring Cloud',
        timestamp: 'Scheduled Post-Deployment',
        operator: 'Cloud Ops',
        txHash: 'Pending',
        ipfsCid: 'Pending',
        status: 'pending',
        details: { description: 'Automated thermal throttling & compute performance tracking.' }
      },
      {
        stage: 'recall',
        label: 'Zero Recall Status',
        facility: 'Global Safety Network',
        timestamp: 'Continuous',
        operator: 'Sentinel AI',
        txHash: '0x0000000000...',
        ipfsCid: 'Safe',
        status: 'completed',
        details: { description: 'Batch clean and verified.' }
      }
    ]
  },
  {
    id: 'trc-item-004',
    trackingId: 'TRC-7740-CHIP',
    serialNumber: 'SN-ELEC-410928',
    name: 'Gallium Nitride (GaN) Power Switching Converter',
    category: 'Power Semiconductors',
    industry: 'electronics',
    batchId: 'BATCH-2026-SEMI-07',
    status: 'Issues',
    lastKnownLocation: {
      facility: 'Inbound Verification Quarantine Gate',
      city: 'Austin',
      country: 'USA',
      coordinates: '30.2672° N, 97.7431° W'
    },
    manufacturer: {
      name: 'PowerVolt Microdevices LLC',
      facilityId: 'FAB-USA-TX-01',
      operatorId: 'OP-1284-SARAH',
      standard: 'IPC-A-610 Class 3',
      productionDate: '2026-10-15T14:10:00Z',
      edgeGateway: 'EDGE-GWAY-TX-02'
    },
    inspection: {
      score: 84.1,
      defectCount: 2,
      model: 'YOLOv11-PCBDefect-v3',
      decision: 'REVIEW',
      aiConfidence: 0.841,
      inspectionTimestamp: '2026-10-15T17:40:00Z',
      yoloVersion: 'YOLOv11-Enterprise'
    },
    ipfs: {
      cid: 'QmTyKzpXg78193kQweR18283918239812983192831',
      fileSize: '19.4 MB',
      pinnedGateways: 5,
      rawDocumentHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    },
    blockchain: {
      contractAddress: '0x328bF9eC40F00185cEb778B5F6e469b2d8B182Cc',
      blockNumber: 18940822,
      txHash: '0x7b1c2d3e4f5061728394a5b6c7d8e9f0123456789abcdef0123456789abcdef0',
      blockTimestamp: '2026-10-15T17:42:19Z',
      network: 'Ethereum Sepolia Testnet (PoS)',
      gasUsed: '47,120 Gwei'
    },
    digitalPassport: {
      passportId: 'DPP-2026-ELEC-7740',
      qrPayload: 'https://traceone.network/verify?tid=TRC-7740-CHIP',
      issueDate: '2026-10-15',
      certificateHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      verified: false,
      sdgAlignment: ['SDG 9: Industry & Innovation']
    },
    timeline: [
      {
        stage: 'manufacturing',
        label: 'SMT Pick and Place',
        facility: 'Austin Line 2',
        timestamp: '2026-10-15 14:10 UTC',
        operator: 'Sarah T. (OP-1284)',
        txHash: '0x8891238471...',
        ipfsCid: 'QmSmtLogLine02',
        status: 'completed',
        details: { description: 'Reflow profile calibrated to 260°C peak.' }
      },
      {
        stage: 'inspection',
        label: 'Automated AI Inspection Solder Anomaly',
        facility: 'Austin Inspection Cell 4',
        timestamp: '2026-10-15 17:40 UTC',
        operator: 'Vision Defect Classifier',
        txHash: '0x7b1c2d3e4f...',
        ipfsCid: 'QmTyKzpXg78193kQweR18283918239812983192831',
        status: 'flagged',
        details: {
          description: 'Solder bridge anomaly detected across pins 14-15 on IC-4. Solder bridging score 84.1%.',
          metrics: { 'Bridge Risk': 'Moderate', 'Defect Count': 2 }
        }
      },
      {
        stage: 'certification',
        label: 'Conditional Review Flag Recorded',
        facility: 'TraceOne Smart Node',
        timestamp: '2026-10-15 17:42 UTC',
        operator: 'QA Manager System',
        txHash: '0x99182374a0...',
        ipfsCid: 'QmReviewDoc7740',
        status: 'current',
        details: { description: 'Item flagged for destructive microscopic evaluation.' }
      },
      {
        stage: 'distribution',
        label: 'Held in Quarantine Bay',
        facility: 'Austin QA Holding Facility',
        timestamp: '2026-10-16 08:00 UTC',
        operator: 'Depot Security',
        txHash: '0x5518293ba1...',
        ipfsCid: 'QmHoldOrder81',
        status: 'current',
        details: { description: 'Shipment halted pending automated rework clearance.' }
      },
      {
        stage: 'customer',
        label: 'Customer Notification Dispatched',
        facility: 'Customer Portal Gateway',
        timestamp: '2026-10-16 09:30 UTC',
        operator: 'Automated TraceOne Dispatcher',
        txHash: '0x11883399aa...',
        ipfsCid: 'QmCustomerNotice',
        status: 'pending',
        details: { description: 'Customer proactively informed of inspection hold.' }
      },
      {
        stage: 'service',
        label: 'Rework and Re-solder Operation',
        facility: 'Precision Rework Lab',
        timestamp: 'Scheduled 2026-10-31',
        operator: 'Master Solder Tech',
        txHash: 'Pending',
        ipfsCid: 'Pending',
        status: 'pending',
        details: { description: 'Thermal desoldering and re-inspection queued.' }
      },
      {
        stage: 'recall',
        label: 'Batch Containment Active',
        facility: 'TraceOne Sentinel',
        timestamp: '2026-10-16 10:00 UTC',
        operator: 'Quality Sentinel',
        txHash: '0x44881199ee...',
        ipfsCid: 'QmContainmentNotice',
        status: 'flagged',
        details: { description: 'Surrounding 14 units in Batch 2026-SEMI-07 locked for inspection.' }
      }
    ]
  },

  // --- Aerospace & Automotive Assemblies ---
  {
    id: 'trc-item-005',
    trackingId: 'TRC-5520-AERO',
    serialNumber: 'SN-AERO-001928',
    name: 'Titanium Single-Crystal High-Pressure Turbine Blade',
    category: 'Aerospace Propulsion',
    industry: 'aerospace',
    batchId: 'BATCH-2026-AERO-11',
    status: 'Delivered',
    lastKnownLocation: {
      facility: 'Rolls-Royce Aerospace Engine Test Cell',
      city: 'Derby',
      country: 'United Kingdom',
      coordinates: '52.9225° N, 1.4746° W'
    },
    manufacturer: {
      name: 'AeroCasting Precision Metallurgy',
      facilityId: 'FAC-GBR-SHEFF-01',
      operatorId: 'OP-5102-ARTHUR',
      standard: 'AS9100D / FAA Part 21',
      productionDate: '2026-10-04T12:00:00Z',
      edgeGateway: 'EDGE-GWAY-SHEFF-08'
    },
    inspection: {
      score: 99.8,
      defectCount: 0,
      model: 'YOLOv11-AeroBlade-CT-v5',
      decision: 'PASSED',
      aiConfidence: 0.998,
      inspectionTimestamp: '2026-10-04T16:22:00Z',
      yoloVersion: 'YOLOv11-AeroCertification'
    },
    ipfs: {
      cid: 'QmVN34b9qKto8XqL1m927481928391823981298319a',
      fileSize: '48.6 MB',
      pinnedGateways: 24,
      rawDocumentHash: '8b912c408e7182910fa89218bc1903a4b9c1d0e123456789abcdef0123456789'
    },
    blockchain: {
      contractAddress: '0x328bF9eC40F00185cEb778B5F6e469b2d8B182Cc',
      blockNumber: 18931204,
      txHash: '0x5c4d3e2b1a0f9e8d7c6b5a413201847596827361524310928374651029384756',
      blockTimestamp: '2026-10-04T16:25:40Z',
      network: 'Ethereum Sepolia Testnet (PoS)',
      gasUsed: '56,120 Gwei'
    },
    digitalPassport: {
      passportId: 'DPP-2026-AERO-5520',
      qrPayload: 'https://traceone.network/verify?tid=TRC-5520-AERO',
      issueDate: '2026-10-04',
      certificateHash: '8b912c408e7182910fa89218bc1903a4b9c1d0e123456789abcdef0123456789',
      verified: true,
      sdgAlignment: ['SDG 9: Industry & Innovation', 'SDG 12: Responsible Production', 'SDG 17: Partnerships']
    },
    timeline: [
      {
        stage: 'manufacturing',
        label: 'Vacuum Induction Melting & Directional Solidification',
        facility: 'Sheffield Metallurgy Plant',
        timestamp: '2026-10-04 12:00 UTC',
        operator: 'Arthur P. (OP-5102)',
        txHash: '0x99182374bb...',
        ipfsCid: 'QmCastingTelemetry88',
        status: 'completed',
        details: { description: 'Single-crystal nickel-titanium superalloy blade casting.' }
      },
      {
        stage: 'inspection',
        label: '3D Computed Tomography Internal Porosity Scan',
        facility: 'Advanced CT Lab Sheffield',
        timestamp: '2026-10-04 16:22 UTC',
        operator: 'Industrial CT AI Model',
        txHash: '0x5c4d3e2b1a...',
        ipfsCid: 'QmVN34b9qKto8XqL1m927481928391823981298319a',
        status: 'completed',
        details: { description: 'Cooling channels fully patent with zero internal inclusions.' }
      },
      {
        stage: 'certification',
        label: 'CAA & EASA Conformity Certificate',
        facility: 'Civil Aviation Authority Node',
        timestamp: '2026-10-04 16:25 UTC',
        operator: 'Flight Safety Auditor',
        txHash: '0x7719283ba1...',
        ipfsCid: 'QmEasaCert5520',
        status: 'completed',
        details: { description: 'EASA Form 1 cryptographic airworthiness release.' }
      },
      {
        stage: 'distribution',
        label: 'Armored Secure Transport to Derby Facility',
        facility: 'Secure Air & Land Logistics',
        timestamp: '2026-10-08 11:00 UTC',
        operator: 'Security Detail #4',
        txHash: '0x22998811cc...',
        ipfsCid: 'QmDerbyTransit01',
        status: 'completed',
        details: { description: 'Sealed with tamper-evident cryptographic RFID seals.' }
      },
      {
        stage: 'customer',
        label: 'Rolls-Royce Inbound Receipt & Rotor Balancing',
        facility: 'Derby Test Cell 4',
        timestamp: '2026-10-10 14:15 UTC',
        operator: 'Turbine Integration Lead',
        txHash: '0x44772299aa...',
        ipfsCid: 'QmDerbyReceiptBlade',
        status: 'completed',
        details: { description: 'Integrated into Trent 1000 developmental core rotor disk.' }
      },
      {
        stage: 'service',
        label: 'Vibration & Thermal Barrier Coating Monitoring',
        facility: 'Live Flight Telemetry Hub',
        timestamp: 'Active Service',
        operator: 'Fleet Sensor Network',
        txHash: '0x88229911aa...',
        ipfsCid: 'QmBladeTelemetryLive',
        status: 'completed',
        details: { description: 'Running within nominal 1420°C gas turbine inlet temperature window.' }
      },
      {
        stage: 'recall',
        label: 'Airworthiness Sentinel',
        facility: 'Global Safety Network',
        timestamp: 'Continuous',
        operator: 'Sentinel AI',
        txHash: '0x0000000000...',
        ipfsCid: 'Safe',
        status: 'completed',
        details: { description: 'Zero recall alerts. Full fleet compliance.' }
      }
    ]
  },
  {
    id: 'trc-item-006',
    trackingId: 'TRC-1849-BRAKE',
    serialNumber: 'SN-AUTO-772910',
    name: 'Electro-Hydraulic Brake Actuator Module (Brembo-Spec)',
    category: 'Automotive Safety Systems',
    industry: 'aerospace',
    batchId: 'BATCH-2026-AUTO-94',
    status: 'Pending',
    lastKnownLocation: {
      facility: 'Packaging & RFID Tagging Station',
      city: 'Turin',
      country: 'Italy',
      coordinates: '45.0703° N, 7.6869° E'
    },
    manufacturer: {
      name: 'Torino Automotive Mechatronics SpA',
      facilityId: 'FAC-ITA-TUR-03',
      operatorId: 'OP-7721-LORENZO',
      standard: 'ISO 26262 ASIL-D',
      productionDate: '2026-10-29T10:00:00Z',
      edgeGateway: 'EDGE-GWAY-ITA-05'
    },
    inspection: {
      score: 96.5,
      defectCount: 0,
      model: 'YOLOv11-AutoVision-v3',
      decision: 'PASSED',
      aiConfidence: 0.965,
      inspectionTimestamp: '2026-10-29T11:45:00Z',
      yoloVersion: 'YOLOv11-Automotive'
    },
    ipfs: {
      cid: 'QmZL761928374910283749102837491028374910283',
      fileSize: '11.2 MB',
      pinnedGateways: 7,
      rawDocumentHash: '4a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef'
    },
    blockchain: {
      contractAddress: '0x328bF9eC40F00185cEb778B5F6e469b2d8B182Cc',
      blockNumber: 18947110,
      txHash: '0x9a8b7c6d5e4f3021102938475610293847561029384756102938475610293847',
      blockTimestamp: '2026-10-29T11:47:00Z',
      network: 'Ethereum Sepolia Testnet (PoS)',
      gasUsed: '46,900 Gwei'
    },
    digitalPassport: {
      passportId: 'DPP-2026-AUTO-1849',
      qrPayload: 'https://traceone.network/verify?tid=TRC-1849-BRAKE',
      issueDate: '2026-10-29',
      certificateHash: '4a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef',
      verified: true,
      sdgAlignment: ['SDG 9: Industry & Innovation', 'SDG 12: Responsible Production']
    },
    timeline: [
      {
        stage: 'manufacturing',
        label: 'Automated Line SMT & Hydraulic Stamping',
        facility: 'Turin Line 5',
        timestamp: '2026-10-29 10:00 UTC',
        operator: 'Lorenzo G. (OP-7721)',
        txHash: '0x33812903bb...',
        ipfsCid: 'QmLine5TurinTelemetry',
        status: 'completed',
        details: { description: 'ASIL-D redundancy controller dual microcontrollers mounted.' }
      },
      {
        stage: 'inspection',
        label: 'Pressure Response & High-Speed Solenoid Check',
        facility: 'QA Rig 2 Turin',
        timestamp: '2026-10-29 11:45 UTC',
        operator: 'Vision & Pressure Sensor Rig',
        txHash: '0x9a8b7c6d5e...',
        ipfsCid: 'QmZL761928374910283749102837491028374910283',
        status: 'completed',
        details: { description: 'Pressure rise time < 120ms to 100 bar. 100% compliance.' }
      },
      {
        stage: 'certification',
        label: 'ISO 26262 ASIL-D Hash Minting',
        facility: 'TraceOne Smart Ledger',
        timestamp: '2026-10-29 11:47 UTC',
        operator: 'Smart Contract',
        txHash: '0x1122334455...',
        ipfsCid: 'QmAsilDCert1849',
        status: 'completed',
        details: { description: 'Cryptographic hash anchored to Sepolia smart contract.' }
      },
      {
        stage: 'distribution',
        label: 'Awaiting Carrier Pickup at Loading Dock',
        facility: 'Turin Shipping Depot B',
        timestamp: '2026-10-30 08:30 UTC',
        operator: 'Logistics Supervisor',
        txHash: 'Pending',
        ipfsCid: 'Pending',
        status: 'current',
        details: { description: 'Packaged into barcoded, RFID-equipped shipping crates.' }
      },
      {
        stage: 'customer',
        label: 'Scheduled Delivery to Ferrari Assembly Line',
        facility: 'Maranello Assembly Bay 1',
        timestamp: 'Scheduled 2026-11-04',
        operator: 'Inbound Warehouse',
        txHash: 'Pending',
        ipfsCid: 'Pending',
        status: 'pending',
        details: { description: 'Will be scanned and paired with vehicle VIN.' }
      },
      {
        stage: 'service',
        label: 'Vehicle In-Service Diagnostic Log',
        facility: 'Ferrari Telemetry Cloud',
        timestamp: 'Pending Handover',
        operator: 'Dealership Network',
        txHash: 'Pending',
        ipfsCid: 'Pending',
        status: 'pending',
        details: { description: 'Diagnostic log will synchronize with TraceOne DPP.' }
      },
      {
        stage: 'recall',
        label: 'Batch Safety Verification',
        facility: 'Global Safety Network',
        timestamp: 'Continuous',
        operator: 'Sentinel AI',
        txHash: '0x0000000000...',
        ipfsCid: 'Safe',
        status: 'completed',
        details: { description: 'Zero defects reported.' }
      }
    ]
  }
];

export const SDG_REFERENCES = [
  {
    target: 'SDG 17: Partnerships for the Goals',
    code: 'Target 17.16 / 17.17',
    summary: 'Enables trusted information sharing and collaboration between manufacturers, suppliers, inspectors, regulators, distributors, and customers via a single verifiable source of product history.'
  },
  {
    target: 'SDG 9: Industry, Innovation and Infrastructure',
    code: 'Target 9.4 / 9.5',
    summary: 'Promotes digital innovation, high-tech manufacturing quality, and resilient industrial infrastructure through automated computer vision defect inspection and tamper-evident blockchain verification.'
  },
  {
    target: 'SDG 12: Responsible Consumption and Production',
    code: 'Target 12.6',
    summary: 'Enables sustainable manufacturing practices, verified product lifecycles, comprehensive quality assurance, extended durability, and efficient batch identification for targeted recalls.'
  }
];
