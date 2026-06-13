export interface BlogData {
  id: string;
  title: string;
  date: string;
  topic: string;
  summary: string;
  content: string;
}

export const blogs: BlogData[] = [
  {
    id: 'hpc-kernels',
    title: 'Writing Custom HPC Kernels',
    date: 'FEB 2026',
    topic: 'Performance Engineering',
    summary: 'Exploring the complexities of hardware-aware software and the limits of parallel architectures.',
    content: `
      In systems programming, we often treat the hardware as an abstract entity. However, at extreme scales, the physical reality of the machine—its cache hierarchy, PCIe lanes, and memory controllers—dictates the software architecture.

      ## The Memory Bottleneck
      When working with high-throughput inference engines, the primary enemy is latency. Shared memory on GPUs is a powerful tool, but misuse can lead to bank conflicts that throttle performance. Understanding how to align memory access patterns with hardware architecture is critical.

      ## Kernel Optimization
      Custom CUDA kernels allow for fine-grained control over execution. By implementing lock-free data structures and minimizing host-to-device transfers, we can achieve significant performance gains.
    `
  },
  {
    id: 'cuda-perf',
    title: 'CUDA Memory Hierarchy Optimization',
    date: 'JAN 2026',
    topic: 'GPU Architecture',
    summary: 'Deep dive into shared memory banking and throughput optimization in massive parallel architectures.',
    content: `
      Understanding how data flows through the GPU is essential for writing efficient code. This article covers the hierarchy from global memory down to registers, and how to utilize each layer effectively.

      ## Shared Memory Banking
      Shared memory is divided into banks. Simultaneous access to the same bank results in a conflict, which serializes the requests. We explore techniques like padding to avoid these bottlenecks.
    `
  }
];
