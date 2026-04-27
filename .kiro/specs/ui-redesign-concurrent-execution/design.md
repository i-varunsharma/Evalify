# Design Document: UI Redesign and Concurrent Execution

## Overview

This design document outlines the technical approach for redesigning the Evalify/AUTO-Interview platform's user interface and implementing concurrent frontend/backend execution. The current application consists of a React + Vite frontend and Express.js backend running as separate processes. This redesign will modernize the UI with an improved design system, enhance user experience across all pages, and streamline the development workflow by enabling both services to run concurrently from a single command. The solution maintains the existing tech stack (React 19, Vite 8, Tailwind CSS 4, Express 5, MongoDB) while introducing a unified build system, improved component architecture, and professional design patterns that elevate the platform's visual appeal and usability.

## Architecture

The system follows a client-server architecture with clear separation of concerns. The frontend handles all UI rendering, state management, and user interactions, while the backend manages business logic, database operations, and AI integrations.

```mermaid
graph TB
    subgraph "Development Environment"
        ROOT[Root Package Manager]
        ROOT -->|npm run dev| CONCURRENTLY[Concurrently Process Manager]
        CONCURRENTLY -->|Port 5173| VITE[Vite Dev Server]
        CONCURRENTLY -->|Port 8000| NODEMON[Nodemon Server]
    end
    
    subgraph "Frontend - React + Vite"
        VITE --> ROUTER[React Router]
        ROUTER --> PAGES[Page Components]
        PAGES --> DS[Design System]
        DS --> ATOMS[Atoms: Button, Input, Card]
        DS --> MOLECULES[Molecules: Form, Modal]
        DS --> ORGANISMS[Organisms: Navbar, Footer]
        PAGES --> REDUX[Redux Store]
        REDUX --> SLICES[User Slice, Interview Slice]
    end
    
    subgraph "Backend - Express + MongoDB"
        NODEMON --> EXPRESS[Express Server]
        EXPRESS --> ROUTES[API Routes]
        ROUTES --> CONTROLLERS[Controllers]
        CONTROLLERS --> MODELS[Mongoose Models]
        MODELS --> MONGO[(MongoDB)]
        CONTROLLERS --> AI[AI Services]
        AI --> GEMINI[Google Generative AI]
        AI --> GROQ[Groq SDK]
    end
    
    PAGES -->|HTTP/Axios| ROUTES
    REDUX -->|State Updates| PAGES
    
    subgraph "Build & Deployment"
        BUILD[npm run build]
        BUILD -->|Vite Build| DIST[client/dist]
        BUILD -->|Copy Assets| SERVER_STATIC[server/public]
        DEPLOY[Deployment]
        DIST --> DEPLOY
        EXPRESS --> DEPLOY
    end
    
    style ROOT fill:#6366f1,color:#fff
    style CONCURRENTLY fill:#8b5cf6,color:#fff
    style DS fill:#10b981,color:#fff
    style MONGO fill:#f59e0b,color:#fff
    style AI fill:#ef4444,color:#fff


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Component Styling Consistency

*For any* Design System component and any valid props, when the component is rendered in different page contexts, the component SHALL apply the same styling rules consistently.

**Validates: Requirement 2.4**

### Property 2: State Update Propagation

*For any* Redux state update, all components subscribed to that state slice SHALL receive the updated state value and re-render accordingly.

**Validates: Requirement 5.4**

### Property 3: API Response Backward Compatibility

*For any* existing API endpoint, the response structure SHALL match the expected schema defined before the redesign, ensuring backward compatibility.

**Validates: Requirement 6.6**

### Property 4: Component Prop Rendering

*For any* Design System component and any valid prop values, the component SHALL render output that reflects the provided prop values.

**Validates: Requirement 8.2**

### Property 5: Component Instance Independence

*For any* Design System component, when multiple instances are rendered on the same page with different props, each instance SHALL render independently without interfering with other instances.

**Validates: Requirement 8.4**

### Property 6: JSON Response Format

*For any* Backend API endpoint, the response SHALL have a JSON content-type header and a valid JSON body structure.

**Validates: Requirement 10.4**
