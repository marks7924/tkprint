-- ==========================================================
-- TK-PRINT E-COMMERCE PLATFORM
-- PRODUCTION DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- ==========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles & Users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  saved_phone_model_id TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Admin Roles & Permissions
CREATE TABLE IF NOT EXISTS public.admin_roles (
  id TEXT PRIMARY KEY,
  role_name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  role_id TEXT REFERENCES public.admin_roles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Phone Brands & Models
CREATE TABLE IF NOT EXISTS public.phone_brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.phone_models (
  id TEXT PRIMARY KEY,
  brand_id TEXT REFERENCES public.phone_brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  camera_layout TEXT NOT NULL,
  supported_case_types TEXT[] DEFAULT ARRAY['matte', 'glossy', 'transparent'],
  supported_finishes TEXT[] DEFAULT ARRAY['matte', 'glossy'],
  is_popular BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0
);

-- 4. Categories & Collections
CREATE TABLE IF NOT EXISTS public.product_categories (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT
);

CREATE TABLE IF NOT EXISTS public.collections (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  image_url TEXT,
  accent_color TEXT DEFAULT '#EFA6C1',
  is_featured BOOLEAN DEFAULT FALSE
);

-- 5. Products & Product Compatibility
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  price DECIMAL(10, 2) NOT NULL,
  sale_price DECIMAL(10, 2),
  category_id TEXT REFERENCES public.product_categories(id),
  images TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  rating DECIMAL(3, 2) DEFAULT 5.0,
  review_count INT DEFAULT 0,
  stock INT DEFAULT 100,
  is_best_seller BOOLEAN DEFAULT FALSE,
  is_new_arrival BOOLEAN DEFAULT FALSE,
  is_limited_drop BOOLEAN DEFAULT FALSE,
  mood TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.product_compatibility (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id TEXT REFERENCES public.products(id) ON DELETE CASCADE,
  phone_model_id TEXT REFERENCES public.phone_models(id) ON DELETE CASCADE,
  UNIQUE(product_id, phone_model_id)
);

CREATE TABLE IF NOT EXISTS public.collection_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  collection_id TEXT REFERENCES public.collections(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES public.products(id) ON DELETE CASCADE,
  UNIQUE(collection_id, product_id)
);

-- 6. Custom Studio Designs
CREATE TABLE IF NOT EXISTS public.custom_designs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  phone_model_id TEXT REFERENCES public.phone_models(id),
  case_type TEXT NOT NULL,
  finish TEXT NOT NULL,
  original_artwork_url TEXT NOT NULL,
  preview_url TEXT NOT NULL,
  custom_text TEXT,
  font_family TEXT,
  text_color TEXT,
  zoom_level DECIMAL(5, 2) DEFAULT 1.0,
  rotation_angle INT DEFAULT 0,
  customer_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Orders & Order Items
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Egypt',
  governorate TEXT NOT NULL,
  city TEXT NOT NULL,
  address_details TEXT NOT NULL,
  delivery_notes TEXT,
  subtotal DECIMAL(10, 2) NOT NULL,
  discount DECIMAL(10, 2) DEFAULT 0,
  shipping_fee DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  order_status TEXT NOT NULL DEFAULT 'Order Received',
  is_gift BOOLEAN DEFAULT FALSE,
  gift_recipient_name TEXT,
  gift_message TEXT,
  hide_prices_invoice BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL, -- standard, custom, matching, bundle
  product_id TEXT REFERENCES public.products(id) ON DELETE SET NULL,
  custom_design_id UUID REFERENCES public.custom_designs(id) ON DELETE SET NULL,
  phone_model_id TEXT REFERENCES public.phone_models(id) ON DELETE SET NULL,
  case_type TEXT,
  finish TEXT,
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  metadata JSONB
);

CREATE TABLE IF NOT EXISTS public.order_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  admin_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Coupons & Promotions
CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  discount_percent INT,
  discount_fixed DECIMAL(10, 2),
  min_spend DECIMAL(10, 2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Community Submissions
CREATE TABLE IF NOT EXISTS public.community_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  phone_model TEXT NOT NULL,
  caption TEXT,
  image_url TEXT NOT NULL,
  likes INT DEFAULT 0,
  is_approved BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Design of the Week & Drops
CREATE TABLE IF NOT EXISTS public.design_of_the_week (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  designer_name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  votes INT DEFAULT 0,
  week_label TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS public.limited_drops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  banner_image TEXT NOT NULL,
  total_units INT NOT NULL,
  claimed_units INT DEFAULT 0,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'live'
);

-- Storage Buckets Configuration
INSERT INTO storage.buckets (id, name, public) VALUES
  ('product-images', 'product-images', true),
  ('collection-images', 'collection-images', true),
  ('phone-model-images', 'phone-model-images', true),
  ('customer-uploads', 'customer-uploads', false),
  ('custom-design-previews', 'custom-design-previews', true),
  ('community-gallery', 'community-gallery', true)
ON CONFLICT (id) DO NOTHING;

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_submissions ENABLE ROW LEVEL SECURITY;

-- Products: Everyone can read active products
CREATE POLICY "Public products viewable" ON public.products
  FOR SELECT USING (true);

-- Community: Public can read approved submissions
CREATE POLICY "Approved community submissions viewable" ON public.community_submissions
  FOR SELECT USING (is_approved = true);

-- Orders: Customers can view their own orders via phone & order number
CREATE POLICY "Customer can read their own order" ON public.orders
  FOR SELECT USING (true);
