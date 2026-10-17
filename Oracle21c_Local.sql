ALTER USER smartmove QUOTA UNLIMITED ON USERS;
SELECT username, tablespace_name, max_bytes FROM dba_ts_quotas WHERE username = 'SMARTMOVE';