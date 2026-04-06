export const PROJECTS = [
    {
        id: '01',
        slug: 'floatchat',
        category: 'AI · RAG SYSTEM',
        title: 'FloatChat',
        summary: 'Production-grade RAG platform for exploring ARGO oceanographic data with fast geospatial retrieval.',
        description:
            'FloatChat is an AI retrieval and reasoning system built for scientific oceanographic workloads. It combines vector search, metadata filtering, and retrieval orchestration so researchers can query complex marine datasets quickly and accurately.',
        problemStatement:
            'Oceanographic datasets are large, fragmented, and difficult to query in real time. Traditional search was too slow and not context-aware for research workflows.',
        solutionOverview:
            'Built a microservice RAG architecture with optimized indexing and retrieval pipelines, enabling low-latency domain-aware answers over massive ARGO data collections.',
        techStack: ['Go', 'Python', 'LangChain', 'AWS', 'Kafka', 'Docker', 'Kubernetes'],
        architecture: [
            'Query API gateway for chat and retrieval requests',
            'RAG orchestration service for retrieval + response generation',
            'Vector and metadata indexing pipeline for ARGO data',
            'Asynchronous ingestion jobs with queue-based processing',
            'Containerized deployment and autoscaling on Kubernetes',
        ],
        outcomes: [
            'Sub-50ms retrieval latency on indexed scientific slices',
            'Improved researcher query precision with contextual retrieval',
            'Scalable deployment for high-concurrency usage',
        ],
        github: '#',
        live: '#',
        image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=1200&q=80',
    },
    {
        id: '02',
        slug: 'astra-platform',
        category: 'BACKEND · DISTRIBUTED',
        title: 'Astra Platform',
        summary: 'Distributed AI platform with real-time chat, semantic search, and multi-agent orchestration.',
        description:
            'Astra is a full-stack AI backend designed for high-throughput and low-latency interactions. It handles real-time communication, agent execution pipelines, and semantic search capabilities across production services.',
        problemStatement:
            'Standalone AI features were fragmented across multiple services, creating reliability gaps, duplicated logic, and higher latency under load.',
        solutionOverview:
            'Unified platform services with event-driven orchestration, fast inter-service RPC, and resilient state handling to support real-time AI interactions at scale.',
        techStack: ['Go', 'gRPC', 'Redis', 'PostgreSQL', 'Docker', 'WebSocket'],
        architecture: [
            'Gateway layer for auth, routing, and request shaping',
            'gRPC service mesh for low-latency internal calls',
            'Redis-backed session and pub/sub event handling',
            'PostgreSQL persistence for core platform entities',
            'Worker pool for autonomous multi-agent tasks',
        ],
        outcomes: [
            'Sub-10ms service-to-service communication path',
            'Stable handling of thousands of concurrent connections',
            'Reduced operational overhead through service consolidation',
        ],
        github: '#',
        live: '#',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    },
    {
        id: '03',
        slug: 'ride-share-engine',
        category: 'MOBILE · FULL STACK',
        title: 'Ride Share Engine',
        summary: 'Production-ready dispatch engine with custom routing proxy and real-time ETA prediction.',
        description:
            'Ride Share Engine powers driver dispatch, live tracking, and routing decisions. It uses streaming telemetry and server-side prediction flows to keep matching and ETA updates accurate under city-scale traffic conditions.',
        problemStatement:
            'Generic routing and delayed location updates caused poor dispatch quality, inaccurate ETAs, and inconsistent rider experiences.',
        solutionOverview:
            'Implemented a custom OSRM proxy, streaming geolocation over WebSockets, and backend ETA models to improve assignment quality and trip predictability.',
        techStack: ['Go', 'WebSocket', 'OSRM', 'Android', 'PostgreSQL', 'Redis'],
        architecture: [
            'Driver telemetry ingestion via persistent socket channels',
            'Dispatch decision service with nearest-match optimization',
            'Custom OSRM routing proxy for tuned route profiles',
            'ETA computation service with live traffic features',
            'Mobile-facing APIs for rider and driver apps',
        ],
        outcomes: [
            'Lower dispatch delay and better rider-driver matching',
            'More accurate live ETA predictions',
            'Improved reliability during high-demand windows',
        ],
        github: '#',
        live: '#',
        image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=80',
    },
    {
        id: '04',
        slug: 'uber-demand-prediction',
        category: 'ML · MLOPS',
        title: 'Uber Demand Prediction',
        summary: 'End-to-end ML pipeline predicting ride demand from NYC taxi data using MLOps best practices.',
        description:
            'This project builds a complete machine learning workflow for demand forecasting. It includes ingestion, feature engineering, model training, experiment tracking, and reproducible deployment-focused workflows.',
        problemStatement:
            'Without accurate demand forecasting, fleets are poorly distributed, increasing rider wait times and reducing driver utilization.',
        solutionOverview:
            'Designed a reproducible ML pipeline that predicts zone-wise demand using temporal and spatial signals, with experiment tracking and versioned data workflows.',
        techStack: ['Python', 'Scikit-learn', 'MLflow', 'DVC', 'Docker', 'Pandas', 'NumPy'],
        architecture: [
            'Batch ingestion and cleaning of NYC taxi trip datasets',
            'Feature generation for time, location, and seasonality',
            'Model training and validation with tracked experiments',
            'Versioned datasets and pipelines via DVC',
            'Containerized runtime for reproducible execution',
        ],
        outcomes: [
            'Improved demand hotspot prediction accuracy',
            'Faster experiment comparison and reproducibility',
            'Production-ready structure for ML deployment',
        ],
        github: 'https://github.com/satya-18',
        live: '#',
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80',
    },
];

export const PROJECTS_BY_SLUG = PROJECTS.reduce((acc, project) => {
    acc[project.slug] = project;
    return acc;
}, {});
