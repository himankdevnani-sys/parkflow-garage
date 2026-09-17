# ParkFlow Garage

An attendant-facing MERN application for checking vehicles in and out, calculating tiered parking fees, allocating compatible spots, and searching a large parking log.

## Requirements

- Node.js 18+ and npm
- MongoDB 6+ (local MongoDB or Atlas)

## Run

1. Copy `server/.env.example` to `server/.env`, set `MONGO_URI`, and set a long `JWT_SECRET`.
2. Install dependencies: `npm run install:all`
3. Seed one garage and its spots: `npm run seed --prefix server`
4. Start both apps: `npm run dev`
5. Visit `http://localhost:5173`.

To run the server only: `npm run dev --prefix server`. To run fee tests: `npm test --prefix server`.

## Billing rules

The first started hour costs `firstHourRate`; every later started hour costs `additionalHourRate`. Partial hours round up. The final charge is capped by `dailyCap`. Rates are stored per garage and can be changed in Settings.

## Important operational rules

- An active plate cannot check in twice.
- Spot reservation uses an atomic MongoDB update, preventing two attendants from taking the same available spot.
- EVs are allocated only to EV spots. Compact cars may use compact or standard; standard cars receive standard.
- A checkout frees the exact occupied spot only after the completed visit is written.

## REST API

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register an attendant (`name`, `email`, `password`) |
| POST | `/api/auth/login` | Sign in an attendant |
| POST | `/api/visits/check-in` | Create active visit and reserve compatible space |
| POST | `/api/visits/check-out` | Calculate bill, complete visit, release space |
| GET | `/api/visits/plate/:plateNumber` | Search current and past visits by plate |
| GET | `/api/visits?search=&page=&limit=&sortBy=&order=` | Filtered, sorted and paginated visit log |
| GET / POST | `/api/spots` | List/filter spaces or add a space |
| GET | `/api/spots/availability` | Live availability by type and EV availability boolean |
| GET / PUT | `/api/settings` | Retrieve or change garage name and rates |
| POST | `/api/settings/rate-card/import` | Clean/import per-type rate rows |
| POST | `/clock` | Auto-close and bill sessions open at least 24 hours |
| POST | `/api/visits/:id/transfer` | Transfer an active session to another plate |

## Example request

```json
POST /api/visits/check-in
{ "plateNumber": "MH12AB1234", "vehicleType": "ev" }
```

The server returns the allocated EV space and the visit. On checkout, it returns a receipt with billable hours and the capped fee.

## Assessment extensions

### Messy rate-card import

`POST /api/settings/rate-card/import` accepts `rateCard` (or `rows`) as an array. It accepts aliases such as `electric vehicle`, `regular`, `$ 100`, and `₹60`; invalid junk rows are reported as `rejected`. It requires one valid cleaned row each for compact, standard and EV before persisting it. Prices are then selected by the parked vehicle's type.

```json
{"rateCard":[
  {"spot type":"small","first hour":"₹80","additional hour":"50","daily cap":"400"},
  {"type":"regular","firstHourRate":"100 INR","extraHour":"60","cap":"500"},
  {"type":"electric vehicle","first":"200","additionalHour":"80","dailyCap":"700"},
  {"type":"???","first":"junk"}
]}
```

### Clock and valet transfer

`POST /clock` closes every active session that entered at least 24 hours before the clock time, bills it with its own spot-type rates, and frees the spot. For deterministic grading, send `{"now":"2026-09-18T12:00:00.000Z"}`.

`POST /api/visits/:id/transfer` with `{"newPlateNumber":"NEW123"}` changes only an open session's plate. The spot and original entry time remain unchanged. A duplicate active plate returns `409`.
