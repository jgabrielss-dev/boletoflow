# Synthesis Core: B2B Multi-Tenant Architecture

A robust, production-ready Multi-Tenant SaaS foundation engineered with **Next.js** and **Supabase**. Originally architected to serve as the central hub and API gateway for a financial document extraction engine (BoletoFlow), this repository demonstrates advanced database isolation, automated user provisioning, and strict route security for B2B applications.

## 🚀 Architectural Overview

Building a B2B SaaS requires strict data boundaries between corporate clients (tenants). This architecture solves the isolation problem at the database level using PostgreSQL Row Level Security (RLS) and schema separation, paired with a Next.js middleware for instant route protection.

## 🛠️ Tech Stack
- **Frontend & API Gateway:** Next.js (App Router)
- **Authentication & Database:** Supabase (Auth, PostgreSQL)
- **Styling:** Tailwind CSS (Brutalist/Corporate UI)
- **External Integration:** Ready to consume isolated Python microservices (e.g., Regex processing APIs)

---

## 🧠 Core Engineering Features

### 1. Absolute Tenant Isolation (Supabase Schema Design)
To prevent cross-tenant data leakage, the database architecture heavily separates authentication from business logic:
- Strict decoupling of Supabase's native `auth.users` schema from the custom `public.profiles` schema.
- Data access is governed by **Row Level Security (RLS)** policies, ensuring that authenticated users can only query and mutate records explicitly tied to their assigned `tenant_id`.

### 2. Automated Database Provisioning (PL/pgSQL Triggers)
Manual user creation is prone to errors. This system implements native PostgreSQL triggers (`PL/pgSQL`) that listen to the `auth.users` schema. 
- Upon successful registration, the trigger automatically fires a function to generate the corresponding structured profile in the `public` schema, initializing quotas and default tenant roles without requiring extra API calls from the Next.js backend.

### 3. Middleware-Level Route Security
Client-side protection is insufficient for B2B tools. This architecture utilizes Next.js Middleware to intercept incoming requests before they hit the rendering engine.
- Unauthenticated users attempting to access dashboard or processing routes are instantly caught and redirected to the login flow, avoiding unauthorized data fetching or flashes of protected UI.

### 4. Payload & Resource Throttling
Designed to integrate with heavy processing microservices (like PDF/Image OCR or Regex engines), the frontend and API layers implement hard payload limits (e.g., capping uploads at 5MB) to prevent resource exhaustion and protect downstream Python servers from heavy payload attacks.

---

## 📈 Engineering Mindset

This repository represents the core structural work required before a single business feature is built. It highlights a focus on **security, data integrity, and automated database workflows**, proving that the infrastructure is ready to scale gracefully as new features or microservices are plugged into the ecosystem.

---
*Developed by **João Gabriel** — Building scalable infrastructure for corporate environments.*
