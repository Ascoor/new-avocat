# Controller Relationship & Query Audit

## Controller: LegCaseController
### ✔ Existing Valid Relations
- Uses `courts`, `clients`, `caseType`, `caseSubType`, `lawyers`, `createdBy`, `updatedBy`, and `procedures` in `index` and `show`; all relations are defined on `LegCase`.
- `getCaseTypesWithCaseSubTypes` eagerly loads `caseSubTypes` from `CaseType`, which exists.
- Client attachment/removal uses `clients()` pivot that matches `LegCase::clients()`.

### ❌ Invalid / Missing Relations
- `destroy` calls `$legCase->sessions()->detach()` even though `LegCase::sessions()` is a `hasMany` relation, so `detach` is undefined. It should delete child sessions or convert relation to `belongsToMany` if pivoted.
- Search query builds `where` + multiple `orWhere*/orWhereHas` without grouping, so the initial `slug` filter is ignored once any other OR clause matches.

### ✔ Correct Queries
- Eager loading in `index`/`show` covers all referenced relations to avoid N+1 for those endpoints.

### ❌ Fix Required (with code)
- **Detach on hasMany**
  - **Problem:** Calling `detach` on a `hasMany` relation throws an error or silently fails.
  - **Location:** `LegCaseController@destroy` lines ~263-269 with `LegCase::sessions()` defined as `hasMany` in `LegCase`.
  - **Correction (controller):**
    ```php
    // Delete associated sessions if they exist
    if ($legCase->sessions()->exists()) {
        $legCase->sessions()->delete();
    }
    ```
- **Ungrouped OR search**
  - **Problem:** `where` + chained `orWhere`/`orWhereHas` without parentheses returns cases that match any OR condition, ignoring the initial filter.
  - **Location:** `LegCaseController@getLegCaseSearch` lines ~221-244.
  - **Correction (controller):**
    ```php
    $filteredLegCases = LegCase::with([...])
        ->where(function ($query) use ($searchQuery) {
            $query->where('slug', 'like', "%{$searchQuery}%")
                  ->orWhere('title', 'like', "%{$searchQuery}%")
                  ->orWhereHas('caseSubType', fn($q) => $q->where('name', 'like', "%{$searchQuery}%"))
                  ->orWhereHas('clients', fn($q) => $q->where('name', 'like', "%{$searchQuery}%"))
                  ->orWhereHas('courts', fn($q) => $q->where('name', 'like', "%{$searchQuery}%"));
        })
        ->paginate($perPage);
    ```
- **Pagination**
  - `index` and `getLegCaseSearch` pull all rows with `get()`. Consider `paginate`/`limit` to avoid large payloads.

---

## Controller: ClientController
### ✔ Existing Valid Relations
- `index` eager loads `legCases.caseType`, `legCases.caseSubType`, `legCases.courts`, `services`, and `services.serviceType`; all relations exist on `Client`/`Service`.

### ❌ Invalid / Missing Relations
- None found.

### ✔ Correct Queries
- Uses eager loading to avoid N+1 when listing clients with related cases and services.

### ❌ Fix Required (with code)
- **Pagination**: `index` returns all clients without limits; consider `paginate()` to control payload size.

---

## Controller: LegalSessionController
### ✔ Existing Valid Relations
- `index` eager loads `legCase`, `lawyer`, `court`, `legalSessionType`, and `createdBy`; all are defined in `LegalSession`.
- `getSessionsByLegCaseId` loads `sessions` with nested relations that exist on `LegalSession`.

### ❌ Invalid / Missing Relations
- None in relationship names, but `show`/`store`/`update` return raw models without eager loading, which can trigger N+1 if serialized with related data.

### ✔ Correct Queries
- `index` covers necessary relations.

### ❌ Fix Required (with code)
- Add eager loading to `show` when returning a single session to avoid lazy loading bursts:
  ```php
  $legalSession = LegalSession::with(['legCase','lawyer','court','legalSessionType','createdBy'])
      ->findOrFail($id);
  ```
- Consider wrapping creation logic in a transaction if events/notifications must stay consistent with the session record.

---

## Controller: ProcedureController
### ✔ Existing Valid Relations
- `index` and `getByLegCaseId` reference `procedureType`, `legCase`, `procedurePlaceType`, `lawyer`, and `createdBy`; all are defined on `Procedure`.

### ❌ Invalid / Missing Relations
- `index` eager loads `event` and `updatedBy`, but `Procedure` lacks these relations. Requests will error when resolving eager loads.

### ✔ Correct Queries
- Filtering by `procedure_type_id` and `leg_case_id` is straightforward; eager loading reduces N+1 risk.

### ❌ Fix Required (with code)
- **Add missing relations to Procedure model**
  ```php
  public function event()
  {
      return $this->belongsTo(Event::class, 'event_id');
  }

  public function updatedBy()
  {
      return $this->belongsTo(User::class, 'updated_by');
  }
  ```
- **Pagination**: `index` and `getByLegCaseId` return all records; apply `paginate()` when large datasets are expected.

---

## Controller: PaymentController
### ✔ Existing Valid Relations
- No relations are currently loaded or referenced.

### ❌ Invalid / Missing Relations
- None detected (controller is stubbed), but `Payment` model correctly defines `invoice()`.

### ✔ Correct Queries
- None implemented.

### ❌ Fix Required (with code)
- Implement listing/search with eager loading of `invoice` when building out the controller to avoid N+1.

---

## Controller: InvoiceController
### ✔ Existing Valid Relations
- No relations are currently loaded or referenced.

### ❌ Invalid / Missing Relations
- None detected (controller is stubbed), but `Invoice` model defines `legCase()` and `payments()`.

### ✔ Correct Queries
- None implemented.

### ❌ Fix Required (with code)
- When implementing endpoints, eager load `payments` and optionally `legCase` to avoid N+1.

---

## Other Controllers
- No additional controllers with relationship usage were audited for this report.

