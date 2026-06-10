export function errorHandler({ error, set }: { error: unknown; set: any }) {
  console.error('Error:', error);
  
  if (error instanceof Error) {
    const status = (error as any).status || 500;
    const code = (error as any).code || 'INTERNAL_ERROR';
    set.status = status;
    return { 
      error: code, 
      message: error.message,
      status 
    };
  }
  
  // Handle thrown objects with status property
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const err = error as { status: number; message: string; code?: string };
    set.status = err.status;
    return { 
      error: err.code || 'ERROR', 
      message: err.message,
      status: err.status 
    };
  }
  
  set.status = 500;
  return { 
    error: 'INTERNAL_ERROR', 
    message: 'An unexpected error occurred',
    status: 500 
  };
}