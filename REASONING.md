# Reasoning and validation

## Design choices

The server owns fee calculation and allocation so a browser cannot alter a bill or allocate a duplicate space. `findOneAndUpdate` reserves only a spot whose status is still `available`; this is atomic in MongoDB and safely handles simultaneous attendant requests. A partial unique index permits visit history while rejecting a second active visit for the same plate.

Vehicle compatibility is intentionally conservative: EV → EV only; standard → standard; compact → compact or standard. This preserves charging spaces for EVs. Billing rounds elapsed time up to started hours, charges first-hour then additional-hour rate, then caps at the configured daily maximum.

## Tests performed

- Fee test: 20 minutes charged as one hour.
- Fee test: 61 minutes charged as two hours.
- Fee test: a 12-hour stay is capped.
- Manual API test plan: repeat the same plate check-in (409); fill EV spaces then check in an EV (409); check out and confirm the same spot is available.

## Trade-off

Authentication is included for the mandatory account workflow. For a production deployment, replace the simple SHA-256 password storage with `bcrypt`, protect operational routes with JWT middleware, and use MongoDB transactions on a replica set for full cross-document recovery guarantees.
