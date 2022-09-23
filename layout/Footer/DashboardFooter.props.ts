import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface DashboardFooterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
}
