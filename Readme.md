- Data import instructions

```SQL
CREATE TABLE jobs_import (
  title TEXT,
  work_policy TEXT,
  location TEXT,
  department TEXT,
  employment_type TEXT,
  experience_level TEXT,
  job_type TEXT,
  salary_range TEXT,
  job_slug TEXT,
  posted_days_ago text
);

-- import CSV in the above, then clean the data, 

UPDATE jobs_import
SET work_policy = 'onsite'
WHERE LOWER(work_policy) IN ('on-site');

UPDATE jobs_import
SET employment_type = REPLACE(LOWER(employment_type), ' ', '-');

UPDATE jobs_import
SET employment_type = 'full-time'
WHERE LOWER(employment_type) IN ('full time');

UPDATE jobs_import
SET employment_type = 'part-time'
WHERE LOWER(employment_type) IN ('part time');

UPDATE jobs_import
SET experience_level = 'mid'
WHERE LOWER(experience_level) IN ('mid-level');

UPDATE jobs_import
SET job_type = LOWER(job_type);

-- After this, copy the values into our jobs table by insert

INSERT INTO jobs (title, job_slug, posted_days_ago, job_type, department, experience_level, location, salary, employment_type, work_policy, company_id)
SELECT
  title,
  job_slug,
  posted_days_ago,
  job_type,
  department,
  experience_level,
  location,
  salary_range,
  employment_type,
  work_policy,
  '1beaf289-8e64-4404-a7c9-335e8c549576'
FROM jobs_import;

-- To verify, you can run
SELECT DISTINCT work_policy FROM jobs_import;
SELECT DISTINCT employment_type FROM jobs_import;
SELECT DISTINCT experience_level FROM jobs_import;
SELECT DISTINCT job_type FROM jobs_import;

-- Drop the temporary table (optional)
DROP TABLE jobs_import

```

