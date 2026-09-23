-- S0.1: shared helpers and the city table (data shape §5.3, plan §12).

-- Keeps updated_at current on every table that uses it.
CREATE FUNCTION set_updated_at() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

-- True for names the server's time zone database knows, such as Europe/Lisbon.
CREATE FUNCTION is_iana_time_zone(tz text) RETURNS boolean
LANGUAGE sql STABLE AS $$
  SELECT tz LIKE '%/%' AND EXISTS (SELECT 1 FROM pg_timezone_names WHERE name = tz);
$$;

CREATE TYPE city_status AS ENUM ('open', 'waitlist');

CREATE TABLE city (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (length(btrim(name)) > 0),
  country_code char(2) NOT NULL CHECK (country_code ~ '^[A-Z]{2}$'),
  time_zone text NOT NULL CHECK (is_iana_time_zone(time_zone)),
  currency char(3) NOT NULL CHECK (currency ~ '^[A-Z]{3}$'),
  -- A city that isn't open answers with a waitlist (data shape §5.3).
  status city_status NOT NULL DEFAULT 'waitlist',
  -- Survey budget bands per category, in minor units of `currency`.
  price_bands jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(price_bands) = 'object'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (country_code, name)
);

CREATE TRIGGER city_set_updated_at BEFORE UPDATE ON city
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

COMMENT ON TABLE city IS 'scope:global - the list of cities; other city-scoped tables point here';
