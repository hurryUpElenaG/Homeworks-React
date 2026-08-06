# Homework 6 · Global State Management with Zustand

This document describes all of the changes made to migrate the **Saveur Restaurant Reservation** application from React local state (`useState`, `useEffect`) to **Zustand**.

---

# 1. Install Zustand

```bash
npm install zustand
```

---

# 2. Update API

## File

```
src/lib/api.ts
```

Updated the API to expose all CRUD operations used by the store.

### Included methods

- fetchReservations()
- fetchAllReservations()
- fetchReservation()
- createReservation()
- updateReservation()
- deleteReservation()

---

# 3. Create the Zustand Store

## File

```
src/store/reservationStore.ts
```

This is the heart of the application.

Contains:

- Global state
- CRUD actions
- Search
- Filters
- Sorting
- Pagination
- Loading state
- Error state
- Selected reservation
- Dashboard reservations
- Refresh helper
- Optimistic delete
- Zustand Devtools
- Persist middleware

---

# 4. Create Selectors

## File

```
src/store/reservationSelectors.ts
```

Contains reusable selectors.

### Basic selectors

- selectReservations
- selectAllReservations
- selectSelectedReservation
- selectIsLoading
- selectError

### Search / Filter

- selectSearch
- selectStatusFilter

### Pagination

- selectPage
- selectTotalPages

### Sorting

- selectSortBy
- selectSortOrder

### Filtered list

- selectFilteredReservations

### Dashboard selectors

- selectPendingCount
- selectConfirmedCount
- selectCancelledCount
- selectTotalReservations
- selectTotalConfirmedGuests

---

# 5. Simplify App.tsx

## File

```
src/App.tsx
```

Removed:

- useState
- useEffect
- CRUD handlers
- API calls

App.tsx now only contains routes.

---

# 6. ReservationsPage

## File

```
src/pages/ReservationsPage.tsx
```

Responsibilities:

- Reads state from Zustand
- Calls

```
fetchReservations()
fetchAllReservations()
```

- Shows loading state
- Shows error state
- Renders ReservationList

---

# 7. ReservationList

## File

```
src/components/ReservationList.tsx
```

Removed props:

- search
- filter
- sorting
- pagination

Everything now comes from Zustand.

Uses selectors for:

- Search
- Filter
- Page
- Total pages
- Counts

---

# 8. ReservationCard

## File

```
src/components/ReservationCard.tsx
```

Removed props:

```
confirmReservation
deleteReservation
```

The component now calls Zustand actions directly.

---

# 9. Dashboard

## File

```
src/components/Dashboard.tsx
```

Removed all inline

```
filter()
reduce()
```

Uses selectors instead.

---

# 10. DashboardPage

## File

```
src/pages/DashboardPage.tsx
```

Simplified to:

```tsx
<Dashboard />
```

No props.

---

# 11. NewReservationForm

## File

```
src/components/NewReservationForm.tsx
```

Removed props:

- reservations
- createReservation
- updateReservation

Uses Zustand instead.

Reads:

- allReservations

Calls:

- addReservation()
- updateReservation()

---

# 12. NewReservationPage

## File

```
src/pages/NewReservationPage.tsx
```

Simplified to:

```tsx
<NewReservationForm />
```

No CRUD props.

---

# 13. EditReservationPage

## File

```
src/pages/EditReservationPage.tsx
```

Removed:

```
useReservation()
```

Uses:

- selectedReservation
- fetchReservation()

from Zustand.

---

# 14. ReservationDetailsPage

## File

```
src/pages/ReservationDetailsPage.tsx
```

Also migrated from

```
useReservation()
```

to Zustand.

Uses:

- selectedReservation
- fetchReservation()

---

# 15. Remove Custom Hook

Deleted

```
src/hooks/useReservation.ts
```

No longer needed.

---

# 16. main.tsx

No changes required.

Still contains:

- BrowserRouter
- NotificationProvider
- App

---

# 17. Final Cleanup

Search for

```
fetchReservations(
```

Only

```
reservationStore.ts
```

should use it.

---

Search for

```
fetchAllReservations(
```

Only

```
reservationStore.ts
```

should use it.

---

Search for

```
fetchReservation(
```

Only

```
reservationStore.ts
```

should use it.

---

Search for

```
createReservation(
```

Only

```
reservationStore.ts
```

should use it.

---

Search for

```
updateReservation(
```

Only

```
reservationStore.ts
```

should use it.

---

Search for

```
deleteReservation(
```

Only

```
reservationStore.ts
```

should use it.

---

Search for

```
useState<Reservation
```

Should return **0 results**.

---

Search for

```
const [reservations
```

Should return **0 results**.

---

Search for

```
useReservation(
```

Should return **0 results** after deleting the hook.

---

# Final Folder Structure

```
src
│
├── components
│   ├── Dashboard.tsx
│   ├── NewReservationForm.tsx
│   ├── ReservationCard.tsx
│   └── ReservationList.tsx
│
├── pages
│   ├── DashboardPage.tsx
│   ├── EditReservationPage.tsx
│   ├── NewReservationPage.tsx
│   ├── ReservationDetailsPage.tsx
│   └── ReservationsPage.tsx
│
├── store
│   ├── reservationStore.ts
│   └── reservationSelectors.ts
│
├── lib
│   └── api.ts
│
├── App.tsx
└── main.tsx
```

---

# Homework 6 Checklist

- ✅ Zustand installed
- ✅ Global reservation store
- ✅ CRUD actions moved to the store
- ✅ Search stored globally
- ✅ Status filter stored globally
- ✅ Pagination stored globally
- ✅ Sorting stored globally
- ✅ Loading state stored globally
- ✅ Error state stored globally
- ✅ Dashboard uses selectors
- ✅ ReservationList uses selectors
- ✅ ReservationCard uses store actions
- ✅ ReservationDetails uses store
- ✅ EditReservationPage uses store
- ✅ NewReservationForm uses store
- ✅ App.tsx simplified
- ✅ Optimistic delete implemented
- ✅ Zustand Devtools enabled
- ✅ Persist middleware enabled
- ✅ No reservation data stored in React local state
- ✅ Store is the single source of truth