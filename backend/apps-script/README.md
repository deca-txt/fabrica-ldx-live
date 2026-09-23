# Apps Script scaffold (not deployed)

`doPost` recognizes only `lead` and `recommendation`, rejects other actions, and returns `NOT_CONFIGURED` for valid routes. It has no Sheet writes, Intergrall calls, credentials, properties, or deployment. Suggested future Script Properties are `SHEET_ID`, `INTERGRALL_URL`, `INTERGRALL_API_KEY` and `INTERGRALL_AGENT_ID`; no values are present. Configure only after the approved Sheet, consent copy, endpoint, auth and agent details exist. Keep secrets in Script Properties. Do not deploy as part of this queue.
