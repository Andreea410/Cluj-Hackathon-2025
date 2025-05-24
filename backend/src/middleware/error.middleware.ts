import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    body: req.body,
    params: req.params,
    query: req.query
  });

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      details: err.message,
      fields: err.errors
    });
  }

  if (err.name === 'DatabaseError') {
    return res.status(500).json({
      message: 'Database Error',
      details: err.message
    });
  }

  // Default error
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
}; 