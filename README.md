# SchoolBus School Microservice

This repository contains the School Microservice for the SchoolBus Management Platform, designed to manage school data in a secure and scalable way.

> **Architecture Note**: The frontend code has been moved to a dedicated repository at [schoolbus-frontend](https://github.com/stefantirlea/schoolbus-frontend). This repository now focuses exclusively on the backend API.

## Deployment Status & Progress Tracking

We're implementing the deployment following a phased approach. Below is our current progress:

### Phase 1: Prerequisites & Initial Setup
- [ ] 1.1. Install required tools (Terraform, Google Cloud SDK)
- [ ] 1.2. Configure Google Cloud project
- [ ] 1.3. Enable required GCP APIs
- [ ] 1.4. Set up Firebase project and authentication
- [ ] 1.5. Create GCP service account for deployment

### Phase 2: Infrastructure Deployment
- [ ] 2.1. Configure Terraform variables
- [ ] 2.2. Initialize Terraform
- [ ] 2.3. Run Terraform plan
- [ ] 2.4. Apply Terraform configuration
- [ ] 2.5. Verify infrastructure deployment

### Phase 3: Application Deployment
- [ ] 3.1. Build Docker image
- [ ] 3.2. Push image to Google Container Registry
- [ ] 3.3. Deploy application to GKE
- [ ] 3.4. Configure Firebase authentication for the application
- [ ] 3.5. Verify application deployment

### Phase 4: Testing & Validation
- [ ] 4.1. Test health endpoint
- [ ] 4.2. Test authentication
- [ ] 4.3. Test CRUD operations
- [ ] 4.4. Load testing (optional)

### Phase 5: CI/CD Setup
- [ ] 5.1. Configure GitHub Actions secrets
- [ ] 5.2. Test CI pipeline
- [ ] 5.3. Test CD pipeline
- [ ] 5.4. Verify automatic deployment

## Microservice Architecture

This microservice is part of the SchoolBus Management Platform and handles all school-related data and operations:

- School entity management (CRUD operations)
- School search and filtering
- Integration with other microservices via API
- Role-based access control

## Tech Stack

- **Language**: TypeScript/JavaScript
- **Framework**: NestJS
- **Database**: PostgreSQL (via TypeORM)
- **Authentication**: Firebase Auth
- **API Gateway**: Apigee
- **Deployment**: Google Kubernetes Engine (GKE)

## Local Development

### Prerequisites

- Node.js (v18+)
- npm or yarn
- PostgreSQL database
- Firebase project (for authentication)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/stefantirlea/schoolbus-school-microservice.git
   cd schoolbus-school-microservice
   ```

2. Install dependencies:
   ```bash
   cd src/backend
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your local configuration
   ```

4. Run the development server:
   ```bash
   npm run start:dev
   ```

### Database Setup

1. Create a PostgreSQL database named `schoolbus_schools`

2. The tables will be automatically created on application startup (in development mode)

### Firebase Authentication Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)

2. Enable Email/Password authentication

3. Generate a service account key:
   - Go to Project Settings → Service Accounts → Generate new private key
   - Save the key file as `firebase-key.json` in the root directory or set the path in your `.env` file

## API Endpoints

### Health Check
- `GET /api/health` - Check service health

### Schools API (Protected by Firebase Auth)
- `GET /api/schools` - Get all schools
- `GET /api/schools/:id` - Get a specific school
- `POST /api/schools` - Create a new school
- `PUT /api/schools/:id` - Update a school
- `DELETE /api/schools/:id` - Delete a school (soft delete)

## Running with Docker

Build and run the Docker container:

```bash
# From the repository root
docker build -t schoolbus-school-service .
docker run -p 3000:3000 --env-file ./src/backend/.env schoolbus-school-service
```

## Getting Started

For complete deployment instructions, please see the [DEPLOYMENT.md](./DEPLOYMENT.md) document.

## Next Steps

Our immediate next steps are:
1. Complete Phase 1 setup (Prerequisites & Initial Setup)
2. Configure basic Terraform files
3. Start with infrastructure deployment
