import { JobRole } from "@/types";

export const JOB_ROLES: JobRole[] = [
  {
    id: "sr-frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Frontend Engineering",
    level: "Senior",
    location: "Remote",
    type: "Full-time",
    experienceMinYears: 5,
    salaryRange: "$150k - $185k",
    requiredSkills: ["React", "TypeScript", "Next.js", "State Management", "Tailwind CSS", "Web Performance"],
    preferredSkills: ["GraphQL", "Testing Library", "CI/CD", "Web Vitals", "SSR/SSG"],
    shortDescription: "Architect resilient, high-speed user interfaces and design systems for enterprise scale.",
    baseQuestions: [
      {
        id: "fe-1",
        category: "Technical",
        question: "How do you systematically diagnose and fix layout shifts (CLS) and long main-thread blocking tasks in Next.js?",
        focusPoints: ["Core Web Vitals profiling", "Code-splitting & dynamic imports", "SSR hydration bottlenecks"],
        expectedConcepts: ["Performance API", "next/dynamic", "React 19 Server Components", "INP optimization"]
      },
      {
        id: "fe-2",
        category: "System Architecture",
        question: "Design a fault-tolerant client caching and state synchronization strategy for offline-first web apps.",
        focusPoints: ["Optimistic UI updates", "IndexedDB / TanStack Query persistence", "Conflict resolution"],
        expectedConcepts: ["Stale-while-revalidate", "BroadcastChannel API", "Idempotent mutations"]
      },
      {
        id: "fe-3",
        category: "Behavioral",
        question: "Describe a scenario where you convinced an engineering team to deprecate a legacy UI pattern or state store.",
        focusPoints: ["Technical justification", "Incremental migration roadmap", "Developer velocity impact"],
        expectedConcepts: ["Codemods", "Feature flags", "Micro-benchmarks"]
      }
    ]
  },
  {
    id: "staff-frontend-architect",
    title: "Staff Frontend Architect",
    department: "Frontend Engineering",
    level: "Staff",
    location: "Remote",
    type: "Full-time",
    experienceMinYears: 8,
    salaryRange: "$195k - $240k",
    requiredSkills: ["TypeScript", "React", "Micro-frontends", "Design Systems", "Web Performance", "Architecture"],
    preferredSkills: ["Monorepo Tooling (Turborepo)", "Compiler Tooling", "Rust/Wasm", "Module Federation"],
    shortDescription: "Drive technical direction, compile-time performance, and design system governance across multi-app ecosystems.",
    baseQuestions: [
      {
        id: "sfe-1",
        category: "System Architecture",
        question: "When would you choose Module Federation over an integrated monorepo package architecture, and what are the trade-offs?",
        focusPoints: ["Runtime vs compile-time dependency sharing", "Deployment cadence independence", "Version mismatch handling"],
        expectedConcepts: ["Shared scopes", "Tree-shaking constraints", "Fallback boundaries"]
      },
      {
        id: "sfe-2",
        category: "Technical",
        question: "Explain how React Server Components change the boundary of client bundle size and data serialization safety.",
        focusPoints: ["Server vs Client component tree separation", "JSON serialization overhead", "Security of server secrets"],
        expectedConcepts: ["Flight protocol", "Streaming SSR", "React compiler"]
      }
    ]
  },
  {
    id: "senior-backend-engineer",
    title: "Senior Backend Engineer (Go / Distributed)",
    department: "Backend & Systems",
    level: "Senior",
    location: "Remote",
    type: "Full-time",
    experienceMinYears: 5,
    salaryRange: "$160k - $200k",
    requiredSkills: ["Go", "Distributed Systems", "PostgreSQL", "Kafka", "gRPC", "Docker"],
    preferredSkills: ["Redis", "Kubernetes", "Observability (OpenTelemetry)", "Event Sourcing"],
    shortDescription: "Build low-latency streaming services, distributed consensus protocols, and resilient data pipelines.",
    baseQuestions: [
      {
        id: "be-1",
        category: "System Architecture",
        question: "Design an exactly-once event processing pipeline using Kafka and PostgreSQL under high consumer restarts.",
        focusPoints: ["Outbox pattern", "Idempotent consumers with deduplication keys", "Two-phase commits vs sagas"],
        expectedConcepts: ["Transactional outbox", "Consumer offsets", "Isolation levels"]
      },
      {
        id: "be-2",
        category: "Technical",
        question: "How do you diagnose memory leaks and goroutine leaks in production Go services under load?",
        focusPoints: ["pprof heap profiling", "Context cancellation propagation", "Unbuffered channel deadlocks"],
        expectedConcepts: ["Runtime trace", "GC pause times", "Goroutine dumps"]
      },
      {
        id: "be-3",
        category: "Technical",
        question: "Explain PostgreSQL index bloat and how you optimize write-heavy tables with high update frequency.",
        focusPoints: ["HOT updates", "Autovacuum tuning", "BRIN vs B-Tree indexing"],
        expectedConcepts: ["Fillfactor", "WAL write amplification", "Partial indexes"]
      }
    ]
  },
  {
    id: "senior-fullstack-engineer",
    title: "Senior Full-Stack Engineer",
    department: "Full-Stack",
    level: "Senior",
    location: "Hybrid",
    type: "Full-time",
    experienceMinYears: 5,
    salaryRange: "$155k - $190k",
    requiredSkills: ["TypeScript", "React", "Node.js", "PostgreSQL", "Next.js", "REST / GraphQL", "Tailwind CSS"],
    preferredSkills: ["Prisma / Drizzle", "Docker", "AWS", "Redis", "Jest / Vitest"],
    shortDescription: "Own complete product verticals from database schema design down to refined client interactions.",
    baseQuestions: [
      {
        id: "fs-1",
        category: "System Architecture",
        question: "Walk through end-to-end authentication in Next.js using session tokens, HTTP-only cookies, and edge middleware.",
        focusPoints: ["Token rotation & revocation", "Edge runtime restrictions", "CSRF protection"],
        expectedConcepts: ["Signed cookies", "Session invalidation cache", "OAuth 2.0 PKCE flow"]
      },
      {
        id: "fs-2",
        category: "Technical",
        question: "How do you prevent N+1 query cascades in relational ORMs (e.g. Prisma or Drizzle) under nested relational queries?",
        focusPoints: ["DataLoader pattern", "SQL JOINs vs subqueries", "Query inspection & EXPLAIN ANALYZE"],
        expectedConcepts: ["Batch loading", "Query batching", "Database connection pool limits"]
      },
      {
        id: "fs-3",
        category: "Behavioral",
        question: "How do you balance rapid delivery of customer-facing features against technical debt in high-growth startups?",
        focusPoints: ["Pragmatic engineering trade-offs", "Debt tracking", "Refactoring during feature additions"],
        expectedConcepts: ["Iterative rollout", "Automated contract testing", "Telemetry"]
      }
    ]
  },
  {
    id: "lead-ai-ml-engineer",
    title: "Lead AI / ML Engineer",
    department: "AI & Data Science",
    level: "Lead",
    location: "Remote",
    type: "Full-time",
    experienceMinYears: 7,
    salaryRange: "$190k - $250k",
    requiredSkills: ["Python", "PyTorch", "LLMs", "Vector Databases", "LangChain / LlamaIndex", "Fine-tuning", "RAG"],
    preferredSkills: ["vLLM / TensorRT", "Kubernetes", "MLflow", "Embedding Models", "DSPy"],
    shortDescription: "Lead architecture for enterprise RAG systems, model evaluation pipelines, and low-latency inference serving.",
    baseQuestions: [
      {
        id: "ai-1",
        category: "System Architecture",
        question: "Design a hybrid search RAG pipeline combining BM25 keyword search, dense embeddings, and cross-encoder re-ranking.",
        focusPoints: ["Reciprocal Rank Fusion (RRF)", "Chunking strategy trade-offs", "Latency budgets"],
        expectedConcepts: ["HNSW indexing", "ColBERT / Cross-encoders", "Query rewriting"]
      },
      {
        id: "ai-2",
        category: "Technical",
        question: "Explain quantization methods (e.g., AWQ vs GPTQ vs GGUF) and their impact on GPU VRAM allocation during vLLM serving.",
        focusPoints: ["Weight-only vs weight-activation quantization", "PagedAttention mechanism", "Perplexity degradation"],
        expectedConcepts: ["KV cache allocation", "Continuous batching", "FlashAttention"]
      },
      {
        id: "ai-3",
        category: "Technical",
        question: "How do you mathematically guard against hallucinations and validate deterministic outputs from LLMs in production?",
        focusPoints: ["Structured JSON schema decoding", "Self-consistency validation", "Automated eval frameworks"],
        expectedConcepts: ["Logit bias", "Outlines / Guidance grammar", "RAGAS metrics"]
      }
    ]
  },
  {
    id: "data-engineer",
    title: "Senior Data Platform Engineer",
    department: "AI & Data Science",
    level: "Senior",
    location: "Remote",
    type: "Full-time",
    experienceMinYears: 5,
    salaryRange: "$150k - $185k",
    requiredSkills: ["Python", "SQL", "Apache Spark", "Airflow", "Snowflake / BigQuery", "Data Modeling"],
    preferredSkills: ["dbt", "Kafka", "Delta Lake / Iceberg", "AWS / GCP", "Terraform"],
    shortDescription: "Build scalable lakehouse pipelines, transformational dbt models, and real-time analytical warehouses.",
    baseQuestions: [
      {
        id: "de-1",
        category: "Technical",
        question: "How do you detect and handle data skew in PySpark shuffle operations on multi-terabyte datasets?",
        focusPoints: ["Salting keys", "Broadcast joins vs hash joins", "Adaptive Query Execution (AQE)"],
        expectedConcepts: ["Shuffle partitions tuning", "Skewed partition splitting", "Spill to disk"]
      },
      {
        id: "de-2",
        category: "System Architecture",
        question: "Architect an Apache Iceberg table format strategy on object storage for high-frequency streaming ingestion.",
        focusPoints: ["Compaction routines", "Snapshot expiration", "ACID transactions"],
        expectedConcepts: ["Copy-on-write vs merge-on-read", "Manifest lists", "Partition evolution"]
      }
    ]
  },
  {
    id: "senior-devops-platform-engineer",
    title: "Senior DevOps / Platform Engineer",
    department: "Cloud & Infrastructure",
    level: "Senior",
    location: "Remote",
    type: "Full-time",
    experienceMinYears: 5,
    salaryRange: "$160k - $195k",
    requiredSkills: ["Kubernetes", "Terraform", "AWS", "CI/CD (GitHub Actions)", "Docker", "Linux"],
    preferredSkills: ["Helm / ArgoCD", "Prometheus / Grafana", "Golang", "Security & IAM", "Service Mesh (Istio)"],
    shortDescription: "Engineer scalable cloud foundations, GitOps deployment engines, and automated developer platforms.",
    baseQuestions: [
      {
        id: "ops-1",
        category: "System Architecture",
        question: "Design a zero-downtime multi-cluster Kubernetes failover strategy across two AWS regions.",
        focusPoints: ["Route53 health checks & latency routing", "Stateful data replication lag", "ExternalDNS & Cert-Manager"],
        expectedConcepts: ["GitOps with ArgoCD", "Cross-region VPC peering", "Split-brain mitigation"]
      },
      {
        id: "ops-2",
        category: "Technical",
        question: "How do you structure Terraform code to enable safe, decoupled state management across multiple environments?",
        focusPoints: ["Remote state locking with S3 & DynamoDB", "Terragrunt / Module abstraction", "Drift detection"],
        expectedConcepts: ["State migration", "Least-privilege IAM roles", "OIDC GitHub Actions auth"]
      },
      {
        id: "ops-3",
        category: "Technical",
        question: "Explain how Linux cgroups v2 and OOM-killer interact with Kubernetes container memory limits (`resources.limits`).",
        focusPoints: ["OOM score calculation", "Page cache vs RSS memory", "JVM heap sizing in containers"],
        expectedConcepts: ["cgroup memory.max", "Exit code 137", "Node autoscaling triggers"]
      }
    ]
  },
  {
    id: "site-reliability-engineer",
    title: "Site Reliability Engineer (SRE)",
    department: "Cloud & Infrastructure",
    level: "Senior",
    location: "Remote",
    type: "Full-time",
    experienceMinYears: 5,
    salaryRange: "$165k - $205k",
    requiredSkills: ["Linux", "Kubernetes", "Python / Go", "Observability (Prometheus/Grafana)", "SLO / SLA", "Incident Management"],
    preferredSkills: ["Chaos Engineering", "OpenTelemetry", "Distributed Tracing", "eBPF", "AWS / GCP"],
    shortDescription: "Defend service level objectives, automate incident remediation, and optimize distributed system resilience.",
    baseQuestions: [
      {
        id: "sre-1",
        category: "Technical",
        question: "How do you formulate an actionable multi-window, multi-burn-rate alerting strategy for 99.9% availability SLOs?",
        focusPoints: ["Error budget consumption rates", "Alert fatigue elimination", "Short-term vs long-term windows"],
        expectedConcepts: ["Google SRE workbook formula", "PromQL rate expressions", "Page vs ticket triggers"]
      },
      {
        id: "sre-2",
        category: "System Architecture",
        question: "Walk through an eBPF-based network latency debugging workflow for tracing microservice TCP retransmissions.",
        focusPoints: ["Kernel space probes", "Zero overhead telemetry", "Socket filtering"],
        expectedConcepts: ["BCC tools / Cilium", "Kernel ring buffers", "Drop reasons"]
      }
    ]
  },
  {
    id: "mid-fullstack-engineer",
    title: "Full-Stack Software Engineer",
    department: "Full-Stack",
    level: "Mid",
    location: "Hybrid",
    type: "Full-time",
    experienceMinYears: 2,
    salaryRange: "$115k - $145k",
    requiredSkills: ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "Git"],
    preferredSkills: ["Next.js", "Express / Fastify", "PostgreSQL", "Tailwind CSS", "Jest"],
    shortDescription: "Deliver intuitive user features, write clean REST APIs, and contribute to database schema expansions.",
    baseQuestions: [
      {
        id: "mfs-1",
        category: "Technical",
        question: "Explain the JavaScript Event Loop: Call Stack, Web APIs, Task Queue, and Microtask Queue priority.",
        focusPoints: ["Promise resolution timing", "setImmediate vs setTimeout vs process.nextTick", "UI render blocking"],
        expectedConcepts: ["Microtask queue drain", "Event loop ticks", "Async/await under the hood"]
      },
      {
        id: "mfs-2",
        category: "Technical",
        question: "How do React hooks ensure state persistence between component re-renders?",
        focusPoints: ["Fiber node architecture", "Hooks linked list order rule", "Closure capture pitfalls"],
        expectedConcepts: ["useCallback dependency arrays", "Stale closures", "Memoization"]
      }
    ]
  },
  {
    id: "mobile-engineer-react-native",
    title: "Senior Mobile Engineer (React Native / iOS)",
    department: "Mobile Engineering",
    level: "Senior",
    location: "Remote",
    type: "Full-time",
    experienceMinYears: 4,
    salaryRange: "$145k - $180k",
    requiredSkills: ["React Native", "TypeScript", "iOS / Swift", "Mobile Performance", "State Management", "App Store Deployment"],
    preferredSkills: ["Android / Kotlin", "JSI / TurboModules", "Offline Sync", "Deep Linking", "Fastlane"],
    shortDescription: "Craft responsive, 60fps cross-platform mobile apps with native bridge modules and offline persistence.",
    baseQuestions: [
      {
        id: "mob-1",
        category: "Technical",
        question: "How does the React Native New Architecture (Fabric + TurboModules + JSI) eliminate the legacy asynchronous bridge?",
        focusPoints: ["Direct C++ pointer execution", "Synchronous UI measurements", "Concurrent rendering on mobile"],
        expectedConcepts: ["Hermes JavaScript engine", "Codegen", "Host object interfaces"]
      },
      {
        id: "mob-2",
        category: "System Architecture",
        question: "Design a secure local storage and encryption layer for sensitive user credentials on iOS and Android.",
        focusPoints: ["iOS Keychain vs Android Keystore", "Biometric authentication hooks", "Key derivation"],
        expectedConcepts: ["Hardware security module (Secure Enclave)", "AES-GCM", "EncryptedSharedPreferences"]
      }
    ]
  },
  {
    id: "security-engineer",
    title: "Application Security Engineer",
    department: "Security & Compliance",
    level: "Senior",
    location: "Remote",
    type: "Full-time",
    experienceMinYears: 4,
    salaryRange: "$155k - $195k",
    requiredSkills: ["Application Security", "OWASP Top 10", "Threat Modeling", "Penetration Testing", "Python / Go", "Cryptography"],
    preferredSkills: ["SAST / DAST", "Cloud Security (AWS IAM)", "OAuth2 / OIDC", "Container Security", "SOC2"],
    shortDescription: "Secure software development lifecycles, conduct vulnerability assessments, and design defense-in-depth controls.",
    baseQuestions: [
      {
        id: "sec-1",
        category: "Technical",
        question: "Explain the exploitation and remediation mechanics of Server-Side Request Forgery (SSRF) in cloud-hosted apps.",
        focusPoints: ["IMDSv2 vs IMDSv1 token requirements", "DNS rebinding attacks", "Egress network filtering"],
        expectedConcepts: ["169.254.169.254 metadata service", "IPv6 loopback bypasses", "Allowlisted proxy forwarding"]
      },
      {
        id: "sec-2",
        category: "System Architecture",
        question: "How do you design a zero-trust API authorization architecture supporting role-based and attribute-based access control?",
        focusPoints: ["Policy enforcement points (PEP)", "Cryptographic token verification", "Fine-grained permissions"],
        expectedConcepts: ["Open Policy Agent (OPA) / Rego", "JWT claims validation", "Revocation strategies"]
      }
    ]
  },
  {
    id: "qa-automation-sdet",
    title: "Staff SDET / Test Automation Architect",
    department: "Quality & Testing",
    level: "Staff",
    location: "Remote",
    type: "Full-time",
    experienceMinYears: 6,
    salaryRange: "$145k - $180k",
    requiredSkills: ["TypeScript", "Playwright / Cypress", "Test Automation Frameworks", "CI/CD Integration", "API Testing", "Load Testing (k6)"],
    preferredSkills: ["Docker", "Python", "Contract Testing (Pact)", "Allure Reporting", "Chaos Testing"],
    shortDescription: "Build distributed test automation harnesses, cross-browser validation suites, and high-concurrency load testing.",
    baseQuestions: [
      {
        id: "qa-1",
        category: "Technical",
        question: "How do you architect a parallel Playwright test suite running 500+ end-to-end specs in under 4 minutes on CI?",
        focusPoints: ["Dynamic test sharding across runners", "Storage state re-use for auth", "Flaky test auto-quarantine"],
        expectedConcepts: ["Matrix builds", "Browser context isolation", "Trace viewer artifacts"]
      },
      {
        id: "qa-2",
        category: "System Architecture",
        question: "Compare consumer-driven contract testing (Pact) versus end-to-end integration environments in microservices.",
        focusPoints: ["Decoupled release verification", "Breaking schema detection", "CI execution speed"],
        expectedConcepts: ["Pact broker", "Provider verification", "Mock servers"]
      }
    ]
  },
  {
    id: "junior-software-engineer",
    title: "Junior Software Engineer",
    department: "Frontend Engineering",
    level: "Junior",
    location: "Hybrid",
    type: "Full-time",
    experienceMinYears: 0,
    salaryRange: "$80k - $105k",
    requiredSkills: ["JavaScript", "HTML / CSS", "React", "Git", "Problem Solving"],
    preferredSkills: ["TypeScript", "Node.js", "Tailwind CSS", "REST APIs"],
    shortDescription: "Build modular web components, write clean unit tests, and learn engineering best practices in a supportive team.",
    baseQuestions: [
      {
        id: "jr-1",
        category: "Technical",
        question: "Explain the difference between `==` and `===` in JavaScript with concrete coercion examples.",
        focusPoints: ["Type coercion rules", "Strict equality", "Truthy and falsy values"],
        expectedConcepts: ["ToPrimitive conversion", "NaN comparisons", "Object reference equality"]
      },
      {
        id: "jr-2",
        category: "Behavioral",
        question: "Tell me about a challenging bug you encountered in a project, and how you tracked down the root cause.",
        focusPoints: ["Debugging methodology", "Using DevTools & console", "Asking for team help constructively"],
        expectedConcepts: ["Breakpoints", "Network inspection", "Hypothesis testing"]
      }
    ]
  },
  {
    id: "technical-product-manager",
    title: "Technical Product Manager (Developer Platform)",
    department: "Product Management",
    level: "Senior",
    location: "Remote",
    type: "Full-time",
    experienceMinYears: 5,
    salaryRange: "$160k - $205k",
    requiredSkills: ["Product Strategy", "API Design", "Developer Experience (DX)", "Data Analysis (SQL)", "Agile / Scrum"],
    preferredSkills: ["Technical Background (CS/Engineering)", "System Architecture", "Telemetry", "SDK Management"],
    shortDescription: "Define product roadmap and developer experience metrics for high-throughput public APIs and SDKs.",
    baseQuestions: [
      {
        id: "pm-1",
        category: "System Architecture",
        question: "How do you manage breaking API changes and deprecation schedules across thousands of enterprise client integrations?",
        focusPoints: ["SemVer discipline", "API versioning headers vs paths", "Telemetry on deprecated field usage"],
        expectedConcepts: ["Sunset HTTP header", "Backwards compatibility guarantees", "Migration guides"]
      },
      {
        id: "pm-2",
        category: "Behavioral",
        question: "How do you evaluate and prioritize internal developer tool requests when competing against customer revenue features?",
        focusPoints: ["Cost of delay calculations", "Developer velocity multipliers", "Executive alignment"],
        expectedConcepts: ["RICE framework", "Developer sentiment surveys", "Cycle time reduction"]
      }
    ]
  }
];
