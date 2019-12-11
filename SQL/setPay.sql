update postings
set sortPay =  REPLACE(REGEXP_SUBSTR(pay, '[0-9]+\.[0-9]*'), ',', '') * 2000
where pay like '%an hour%'
and jobType like '%full-time%';

update postings
set sortPay = REPLACE(REGEXP_SUBSTR(pay, '[0-9]+\.[0-9]*'), ',', '')
where pay like '%a year%';