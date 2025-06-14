export type EventName =
  | "order_created"
  | "order_refunded"
  | "subscription_created"
  | "subscription_cancelled"
  | "subscription_resumed"
  | "subscription_expired"
  | "subscription_paused"
  | "subscription_unpaused"
  | "subscription_payment_failed"
  | "subscription_payment_success"
  | "subscription_payment_recovered";

export interface LemonsqueezySubscription {
  billing_anchor: number;
  cancelled: boolean;
  card_brand: string;
  card_last_four: string;
  created_at: string;
  customer_id: number;
  ends_at: string | null;
  id: string; // Custom data
  order_id: number;
  order_item_id: number;
  pause: string | null;
  product_id: number;
  product_name: string;
  renews_at: string;
  status: string;
  status_formatted: string;
  store_id: number;
  test_mode: boolean;
  trial_ends_at: string | null;
  updated_at: string;
  urls: {
    update_payment_method: string;
    customer_portal: string;
    customer_portal_update_subscription: string;
  };
  user_email: string;
  user_name: string;
  variant_id: number;
  variant_name: string;
}

export interface LemonsqueezyOrder {
  store_id: number;
  customer_id: number;
  identifier: string;
  order_number: number;
  user_name: string;
  user_email: string;
  currency: string;
  currency_rate: string;
  tax_name: string;
  tax_rate: number;
  tax_inclusive: boolean;
  status: "paid";
  status_formatted: string;
  refunded: boolean;
  refunded_at: string | null;
  subtotal: number;
  discount_total: number;
  tax: number;
  setup_fee: number;
  total: number;
  subtotal_usd: number;
  discount_total_usd: number;
  tax_usd: number;
  setup_fee_usd: number;
  total_usd: number;
  subtotal_formatted: string;
  discount_total_formatted: string;
  tax_formatted: string;
  setup_fee_formatted: string;
  total_formatted: string;
  first_order_item: {
    id: number;
    order_id: number;
    product_id: number;
    variant_id: number;
    price_id: number;
    product_name: string;
    variant_name: string;
    price: number;
    quantity: number;
    created_at: string;
    updated_at: string;
    test_mode: boolean;
  };
  urls: {
    receipt: string;
  };
  created_at: string;
  updated_at: string;
  test_mode: boolean;
}

export interface Payload {
  meta: {
    test_mode: boolean;
    event_name: EventName;
  };
  data: {
    attributes: LemonsqueezyOrder | LemonsqueezySubscription;
    id: string;
    relationships: unknown;
    type: string;
  };
}
