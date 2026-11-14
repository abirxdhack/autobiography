CREATE TABLE public.site_visits (
  id bigserial PRIMARY KEY,
  visited_at timestamptz NOT NULL DEFAULT now(),
  visitor_id uuid NOT NULL,
  path text NOT NULL,
  device text NOT NULL,
  is_new boolean NOT NULL DEFAULT false
);

GRANT ALL ON public.site_visits TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.site_visits_id_seq TO service_role;

ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

CREATE INDEX site_visits_visited_at_idx ON public.site_visits (visited_at);
CREATE INDEX site_visits_visitor_idx ON public.site_visits (visitor_id, visited_at);

CREATE OR REPLACE FUNCTION public.record_visit(p_visitor uuid, p_path text, p_device text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF p_visitor IS NULL
     OR p_path IS NULL
     OR NOT (
       p_path IN ('/', '/public-speaking', '/the-silence', '/battles-nobody-sees', '/stories')
       OR p_path ~ '^/stories/[a-z0-9-]{1,80}$'
     )
     OR p_device NOT IN ('mobile', 'tablet', 'desktop') THEN
    RETURN;
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.site_visits
    WHERE visitor_id = p_visitor AND path = p_path AND visited_at > now() - interval '30 minutes'
  ) THEN
    RETURN;
  END IF;

  IF (SELECT count(*) FROM public.site_visits WHERE visitor_id = p_visitor AND visited_at > now() - interval '1 hour') >= 40 THEN
    RETURN;
  END IF;

  INSERT INTO public.site_visits (visitor_id, path, device, is_new)
  VALUES (
    p_visitor, p_path, p_device,
    NOT EXISTS (SELECT 1 FROM public.site_visits WHERE visitor_id = p_visitor)
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_visit_stats()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  WITH v AS (
    SELECT visitor_id, path, device, is_new, (visited_at AT TIME ZONE 'Asia/Dhaka')::date AS day
    FROM public.site_visits
  ),
  today AS (SELECT (now() AT TIME ZONE 'Asia/Dhaka')::date AS d),
  days AS (
    SELECT generate_series((SELECT d FROM today) - 6, (SELECT d FROM today), interval '1 day')::date AS day
  )
  SELECT jsonb_build_object(
    'total', (SELECT count(*) FROM v),
    'unique_total', (SELECT count(DISTINCT visitor_id) FROM v),
    'today', (SELECT count(*) FROM v WHERE day = (SELECT d FROM today)),
    'yesterday', (SELECT count(*) FROM v WHERE day = (SELECT d FROM today) - 1),
    'unique_today', (SELECT count(DISTINCT visitor_id) FROM v WHERE day = (SELECT d FROM today)),
    'new_today', (SELECT count(*) FROM v WHERE day = (SELECT d FROM today) AND is_new),
    'this_week', (SELECT count(*) FROM v WHERE day > (SELECT d FROM today) - 7),
    'last_week', (SELECT count(*) FROM v WHERE day <= (SELECT d FROM today) - 7 AND day > (SELECT d FROM today) - 14),
    'returning_visitors', (SELECT count(*) FROM (SELECT visitor_id FROM v GROUP BY visitor_id HAVING count(DISTINCT day) > 1) r),
    'daily', (
      SELECT jsonb_agg(jsonb_build_object('day', d.day, 'visits', (SELECT count(*) FROM v WHERE v.day = d.day)) ORDER BY d.day)
      FROM days d
    ),
    'devices', jsonb_build_object(
      'mobile', (SELECT count(*) FROM v WHERE device = 'mobile'),
      'tablet', (SELECT count(*) FROM v WHERE device = 'tablet'),
      'desktop', (SELECT count(*) FROM v WHERE device = 'desktop')
    ),
    'pages', jsonb_build_object(
      'home', (SELECT count(*) FROM v WHERE path = '/'),
      'public_speaking', (SELECT count(*) FROM v WHERE path = '/public-speaking'),
      'the_silence', (SELECT count(*) FROM v WHERE path = '/the-silence'),
      'battles', (SELECT count(*) FROM v WHERE path = '/battles-nobody-sees'),
      'library', (SELECT count(*) FROM v WHERE path = '/stories' OR path LIKE '/stories/%')
    )
  );
$function$;

REVOKE ALL ON FUNCTION public.record_visit(uuid, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_visit_stats() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.record_visit(uuid, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_visit_stats() TO anon, authenticated;
