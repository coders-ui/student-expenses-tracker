# StudentSpend API integration contract

The frontend currently uses realistic demo transactions saved in browser local storage. No backend route is assumed or called. `src/services/api.js` reads `VITE_API_BASE_URL` and provides a generic JSON REST transport; wire agreed route paths into feature methods after the backend team confirms them.

## Routes the frontend needs

| Capability | Method | Request body / query | Expected response |
| --- | --- | --- | --- |
| Register student | POST | `{ "name": "Jamie Davis", "email": "jamie@example.edu", "password": "…", "school": "…", "program": "…", "year": "Second year" }` | `{ "user": StudentProfile, "accessToken": "…" }` |
| Sign in | POST | `{ "email": "jamie@example.edu", "password": "…" }` | `{ "user": StudentProfile, "accessToken": "…" }` |
| Read/update student profile | GET / PUT or PATCH | Profile fields for update; no body for read | `{ "user": StudentProfile }` |
| List transactions | GET | Optional `category`, `from`, `to`, `search` query parameters | `{ "transactions": Transaction[] }` |
| Create transaction | POST | `TransactionInput` JSON | `{ "transaction": Transaction }` |
| Update transaction | PUT or PATCH | `TransactionInput` JSON at the selected record | `{ "transaction": Transaction }` |
| Delete transaction | DELETE | Selected record identifier | `204 No Content` or `{ "success": true }` |
| Read monthly budget | GET | Month identifier, e.g. `month=2026-10` | `{ "month": "2026-10", "amount": 1200 }` |
| Set monthly budget | PUT | `{ "month": "2026-10", "amount": 1200 }` | `{ "month": "2026-10", "amount": 1200 }` |

These are capability requirements only; route paths, auth, identifier format, and whether filtering is server-side remain for the teammate to specify. The app does not send credentials or invent endpoint URLs. When agreed, add named functions in `src/services/api.js` using `apiRequest(path, options)` and replace demo/local-storage loading in `src/StudentSpend.jsx`.

For authenticated endpoints, the client will need the agreed bearer-token mechanism. The current demo flow does not send passwords to any server and does not store them.

## Data shapes

```json
{
  "id": "string",
  "title": "Campus cafe",
  "amount": 8.5,
  "category": "Food",
  "date": "2026-10-12",
  "method": "Card"
}
```

The student profile shape used by the UI is `{ "id": "string", "name": "Jamie Davis", "email": "jamie@example.edu", "school": "Northwood University", "program": "Business Administration", "year": "Second year" }`. Registration and sign-in responses should return a profile plus an access token; token expiry/refresh behavior must be agreed before wiring authentication.

`category` is one of `Food`, `Transport`, `Education`, `Shopping`, `Bills`, `Other`; `method` is `Card`, `Cash`, or `Online`. Create/update bodies contain `title`, positive numeric `amount`, `category`, ISO calendar `date` (`YYYY-MM-DD`), and `method`. All responses use JSON with an `application/json` content type, except the optional 204 delete response. The API should return useful non-2xx errors; the transport surfaces those as JavaScript errors.
