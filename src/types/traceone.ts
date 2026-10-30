/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type IndustryDomain = 'all' | 'machinery' | 'electronics' | 'aerospace';

export type ItemStatus = 'In Transit' | 'Delivered' | 'Pending' | 'Issues';

export type LifecycleStageKey =
  | 'manufacturing'
  | 'inspection'
  | 'certification'
  | 'distribution'
  | 'customer'
  | 'service'
  | 'recall';

export interface LifecycleEvent {
  stage: LifecycleStageKey;
  label: string;
  facility: string;
  timestamp: string;
  operator: string;
  txHash: string;
  ipfsCid: string;
  status: 'completed' | 'current' | 'pending' | 'flagged';
  details: {
    description: string;
    metrics?: Record<string, string | number>;
    notes?: string;
  };
}

export interface TraceItem {
  id: string;
  trackingId: string;
  serialNumber: string;
  name: string;
  category: string;
  industry: IndustryDomain;
  batchId: string;
  status: ItemStatus;
  lastKnownLocation: {
    facility: string;
    city: string;
    country: string;
    coordinates: string;
  };
  manufacturer: {
    name: string;
    facilityId: string;
    operatorId: string;
    standard: string;
    productionDate: string;
    edgeGateway: string;
  };
  inspection: {
    score: number; // 0 - 100
    defectCount: number;
    model: string;
    decision: 'PASSED' | 'REVIEW' | 'FAILED';
    aiConfidence: number;
    inspectionTimestamp: string;
    yoloVersion: string;
  };
  ipfs: {
    cid: string;
    fileSize: string;
    pinnedGateways: number;
    rawDocumentHash: string;
  };
  blockchain: {
    contractAddress: string;
    blockNumber: number;
    txHash: string;
    blockTimestamp: string;
    network: string;
    gasUsed: string;
  };
  digitalPassport: {
    passportId: string;
    qrPayload: string;
    issueDate: string;
    certificateHash: string;
    verified: boolean;
    sdgAlignment: string[];
  };
  timeline: LifecycleEvent[];
}

export interface DashboardKPIs {
  totalTracked: number;
  inTransit: number;
  delivered: number;
  pending: number;
  tamperVerified: number;
  aiInspectedRate: number;
}
