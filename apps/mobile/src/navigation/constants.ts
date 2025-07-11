export const SCREENS = {
  CREATE_ORDER: 'CreateOrder',
  ORDER_SUMMARY: 'OrderSummary',
} as const;

export const NAVIGATION_OPTIONS = {
  DEFAULT: {
    headerShown: false,
  },
  MODAL: {
    presentation: 'modal' as const,
  },
} as const;
