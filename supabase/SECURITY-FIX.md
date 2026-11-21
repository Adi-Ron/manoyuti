# Profile role protection

The own-profile update policy restricts rows but previously allowed changing the
`role` column. Both `schema.sql` (new installs) and `fix-rls.sql` (existing installs)
now revoke client table-level UPDATE and permit authenticated users to update
only `full_name` and `phone`. The service role retains trusted admin role updates.

For an existing Resilio project, run `fix-rls.sql` in that project's SQL editor.
Do not rerun `schema.sql` on an existing database. No remote SQL was executed as
part of this change; the matching live project and credentials were unavailable.

After applying, run these read-only checks in the SQL editor:

```sql
select
  has_column_privilege('authenticated', 'public.profiles', 'role', 'UPDATE') as can_change_role,
  has_column_privilege('authenticated', 'public.profiles', 'id', 'UPDATE') as can_change_id,
  has_column_privilege('authenticated', 'public.profiles', 'full_name', 'UPDATE') as can_change_name,
  has_column_privilege('authenticated', 'public.profiles', 'phone', 'UPDATE') as can_change_phone;
-- Expected: false, false, true, true.
```

Also confirm that a client can update its own contact details, cannot update
another client's details, and receives a permission error when changing `role`.
Review existing admin roles for unauthorized assignments before considering the
live incident resolved. The SQL changes prevent future client role changes;
they do not alter existing account roles.

Reference: [Supabase column privileges](https://supabase.com/docs/guides/database/postgres/column-level-security).
