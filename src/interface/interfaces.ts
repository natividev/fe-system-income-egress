import { IconProps } from "@chakra-ui/react";

interface NavItem {
  label: string;
  url?: string;
  href?: string;
}
export interface NavItems {
  label: string;
  url?: string;
  icon?: React.FC<IconProps>;
  children?: Array<NavItem>;
  href?: string;
}
