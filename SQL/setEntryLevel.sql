UPDATE postings
SET experienceLevel = 'Entry Level'
where html like '%entry level%' or html like '%entry-level%' or title like '%junior%' or title like '%entry level%';