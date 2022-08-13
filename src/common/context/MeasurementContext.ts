import { createContext } from 'react';

export interface IMeasurementContext {
  /** Mapping normalized measurement -> localized measurement messageId. */
  formatter: Record<string, string>;
  /** Mapping localized measurement -> normalized measurement. */
  parser: Record<string, string>;
}

const MeasurementContext = createContext<IMeasurementContext | null>(null);

export default MeasurementContext;
