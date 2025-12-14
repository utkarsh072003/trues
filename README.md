# TruEstate – Retail Sales Management System

## 1. Overview
A full-stack Retail Sales Management System developed for the TruEstate SDE Intern assignment. The application supports efficient search, filtering, sorting, and pagination on structured retail sales data, following clean architecture and production-grade engineering practices.

## 2. Tech Stack
- **Frontend:** React (Vite), JavaScript, CSS  
- **Backend:** Node.js, Express.js  
- **Data Handling:** CSV parsing with in-memory caching  
- **Deployment:** Render (Backend)

## 3. Search Implementation Summary
Case-insensitive full-text search is implemented on **Customer Name** and **Phone Number**. The search logic is executed at the backend service layer and works seamlessly alongside active filters, sorting, and pagination.

## 4. Filter Implementation Summary
Multi-select and range-based filters are implemented for:
- Customer Region  
- Gender  
- Age Range  
- Product Category  
- Tags  
- Payment Method  
- Date Range  

Filters can be applied independently or in combination, and their state is preserved across sorting and pagination.

## 5. Sorting Implementation Summary
Sorting is supported for:
- Date (Newest First)  
- Quantity  
- Customer Name (A–Z)  

Sorting is handled at the backend service layer and always respects the active search and filter state.

## 6. Pagination Implementation Summary
Pagination is implemented with a fixed page size of **10 records per page**. It supports Next and Previous navigation, safely handles invalid page values, and maintains active search, filter, and sorting states.


