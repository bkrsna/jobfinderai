export interface SampleResume {
  id: string;
  name: string;
  targetRole: string;
  experienceYears: number;
  snippet: string;
  fullText: string;
}

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: "senior-fullstack",
    name: "Alex Morgan",
    targetRole: "Senior Full-Stack Engineer",
    experienceYears: 6,
    snippet: "React, Next.js, TypeScript, Node.js, PostgreSQL, AWS, Docker",
    fullText: `ALEX MORGAN
alex.morgan.dev@gmail.com | (555) 392-1084 | San Francisco, CA | github.com/alexmorgan-dev

PROFESSIONAL SUMMARY
Senior Full-Stack Software Engineer with 6+ years of experience engineering high-scale web applications, microservices, and design systems. Track record of improving Core Web Vitals, architecting Next.js applications with React Server Components, and optimizing PostgreSQL database queries handling 10M+ daily events.

CORE COMPETENCIES & SKILLS
- Languages: TypeScript, JavaScript (ES6+), SQL, Python, HTML5, CSS3
- Frontend: React 19, Next.js (App Router), Tailwind CSS, State Management (Zustand, TanStack Query), Web Performance, Micro-frontends
- Backend: Node.js, Express, NestJS, REST APIs, GraphQL, gRPC, PostgreSQL, Redis, Prisma ORM
- Cloud & Infrastructure: AWS (S3, ECS, Lambda, CloudFront), Docker, CI/CD (GitHub Actions), Terraform basics
- Methodologies: Agile / Scrum, System Architecture, Test-Driven Development (Jest, Playwright)

WORK EXPERIENCE

Senior Full-Stack Engineer | NexusCloud Inc. | San Francisco, CA
2022 - Present
- Architected the customer portal migration from legacy SPA to Next.js App Router, resulting in a 42% reduction in Time to Interactive (TTI) and 35% improvement in Largest Contentful Paint (LCP).
- Designed and built scalable Node.js microservices integrated with PostgreSQL and Redis cache, maintaining sub-45ms p99 latency across 15M monthly active users.
- Implemented real-time dashboard updates using WebSockets and TanStack Query with optimistic UI mutations, reducing user perceived latency by 60%.
- Mentored 4 mid-level engineers, established code review standards, and led TypeScript type-safety initiatives achieving 98% strict coverage across 120,000 LOC.

Full-Stack Software Engineer | VectorWave Labs | Austin, TX
2019 - 2022
- Developed responsive user interfaces with React, TypeScript, and Tailwind CSS for enterprise data analytics dashboard.
- Built RESTful and GraphQL endpoints in Node.js connected to PostgreSQL and Elasticsearch, optimizing heavy aggregation queries.
- Spearheaded Docker containerization and built GitHub Actions deployment pipelines for continuous delivery across staging and production AWS environments.

EDUCATION
B.S. in Computer Science | University of Texas at Austin | Graduated 2019
`
  },
  {
    id: "lead-ai-ml",
    name: "Dr. Elena Rostova",
    targetRole: "Lead AI / ML Engineer",
    experienceYears: 8,
    snippet: "Python, PyTorch, LLMs, Vector DBs, RAG, vLLM, LangChain, Fine-tuning",
    fullText: `DR. ELENA ROSTOVA
elena.rostova@ailabs.org | (555) 721-9920 | Seattle, WA | github.com/erostova-ai

PROFESSIONAL SUMMARY
Lead AI & Machine Learning Engineer with 8+ years experience developing state-of-the-art Deep Learning models, Retrieval-Augmented Generation (RAG) architectures, and production LLM inference engines. Proven leadership in deploying distributed training pipelines, fine-tuning open-source foundation models, and vector database search optimization.

TECHNICAL SKILLS
- Deep Learning & ML: PyTorch, TensorFlow, Hugging Face Transformers, Scikit-learn, CUDA
- Generative AI & LLMs: Large Language Models (LLMs), RAG, Fine-tuning (LoRA / QLoRA), Vector Databases (Pinecone, Qdrant, Chroma, Milvus), LangChain, LlamaIndex, DSPy
- Model Serving & Systems: vLLM, TensorRT-LLM, Triton Inference Server, FastAPI, Docker, Kubernetes
- Programming & Data: Python, C++, SQL, Spark, Pandas, NumPy
- Cloud & MLOps: AWS (SageMaker, EC2 GPU clusters), GCP Vertex AI, MLflow, Weights & Biases

PROFESSIONAL EXPERIENCE

Lead AI Engineer | Synapse Intelligence Systems | Seattle, WA
2021 - Present
- Led team of 6 ML researchers and engineers building enterprise RAG platform with hybrid dense/sparse search (BM25 + BGE embeddings) and Cohere re-ranking, serving 2M queries daily.
- Optimized low-latency LLM inference using vLLM continuous batching and AWQ 4-bit quantization, decreasing GPU memory usage by 55% while maintaining 99.2% benchmark accuracy.
- Fine-tuned open-source foundation models (Llama 3, Mistral) on proprietary legal and finance corpuses using QLoRA, outperforming baseline zero-shot models by 28% on domain extraction benchmarks.
- Designed automated hallucination evaluation framework using RAGAS and custom LLM-as-a-judge pipelines.

Senior Machine Learning Engineer | DeepData Corp | San Jose, CA
2018 - 2021
- Developed production computer vision and NLP classification models using PyTorch deployed on Kubernetes GPU pods.
- Built automated feature engineering pipelines using Apache Spark and Python processing 5TB of unstructured text daily.
- Published research papers on contrastive learning and multi-modal representation.

EDUCATION
Ph.D. in Computer Science (Machine Learning) | University of Washington | 2018
`
  },
  {
    id: "senior-devops-sre",
    name: "Marcus Vance",
    targetRole: "Senior Platform & DevOps Engineer",
    experienceYears: 6,
    snippet: "Kubernetes, Terraform, AWS, Docker, CI/CD, Prometheus, Linux, Helm",
    fullText: `MARCUS VANCE
marcus.vance@syscloud.io | (555) 481-3092 | Denver, CO | github.com/marcusvance-ops

SUMMARY
Senior Platform / DevOps Engineer with 6 years of expertise in cloud infrastructure automation, Kubernetes orchestration, GitOps workflows, and enterprise site reliability. Designed multi-region AWS architectures with 99.99% uptime compliance.

CORE SKILLS
- Container Orchestration: Kubernetes (EKS, GKE), Helm, ArgoCD, Docker
- Infrastructure as Code: Terraform, Terragrunt, CloudFormation, Ansible
- Cloud Platforms: AWS (VPC, IAM, EKS, RDS, S3, Route53, KMS), GCP
- CI/CD & Automation: GitHub Actions, GitLab CI, Jenkins, Python, Bash, Go
- Observability & Reliability: Prometheus, Grafana, OpenTelemetry, Datadog, SLO / SLA, Incident Management
- Operating Systems: Linux (Ubuntu, Debian, RHEL), Kernel tuning, Networking (TCP/IP, DNS, TLS)

EXPERIENCE

Senior Platform Engineer | HyperScale Networks | Denver, CO
2022 - Present
- Architected and operated multi-cluster Kubernetes infrastructure running 400+ microservices across AWS us-east-1 and us-west-2 regions.
- Automated 100% of cloud provisioning via modular Terraform and Terragrunt with remote state locking and strict security compliance.
- Migrated legacy deployment system to GitOps with ArgoCD, dropping deployment failure rate from 8% to under 0.2% and achieving zero-downtime canary rollouts.
- Implemented company-wide Prometheus and Grafana alerting matrices based on Google SRE multi-window burn rate SLO standards.

DevOps Engineer | CloudGrid Systems | Boulder, CO
2019 - 2022
- Built automated CI/CD pipelines using GitHub Actions for container image builds, vulnerability scanning (Trivy), and automated unit/integration runs.
- Reduced monthly AWS cloud infrastructure spend by $34,000 through automated spot instance scheduling and Karpenter node autoscaling.
- Managed Linux production server environments, kernel socket tuning, and automated backups for high-throughput databases.

EDUCATION
B.S. in Information Systems & Network Engineering | Colorado State University | 2019
`
  }
];
